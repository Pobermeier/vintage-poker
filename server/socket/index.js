const User = require('../models/User');
const Table = require('../pokergame/Table');
const Player = require('../pokergame/Player');
const {
  FETCH_LOBBY_INFO,
  RECEIVE_LOBBY_INFO,
  PLAYERS_UPDATED,
  JOIN_TABLE,
  TABLE_JOINED,
  TABLES_UPDATED,
  LEAVE_TABLE,
  TABLE_LEFT,
  FOLD,
  CHECK,
  CALL,
  RAISE,
  TABLE_MESSAGE,
  SIT_DOWN,
  REBUY,
  STAND_UP,
  SITTING_OUT,
  SITTING_IN,
  DISCONNECT,
  TABLE_UPDATED,
  WINNER,
} = require('../pokergame/actions');

const tables = {
  1: new Table(1, 'Table 1', 10000),
};
const players = {};

const init = (socket, io) => {
  socket.on(FETCH_LOBBY_INFO, (user) => {
    players[socket.id] = new Player(
      socket.id,
      user.id,
      user.username,
      user.bankroll,
    );

    socket.emit(RECEIVE_LOBBY_INFO, { tables, players, socketId: socket.id });
    socket.broadcast.emit(PLAYERS_UPDATED, players);
  });

  socket.on(JOIN_TABLE, (tableId) => {
    tables[tableId].addPlayer(players[socket.id]);

    socket.emit(TABLE_JOINED, { tables, tableId });
    socket.broadcast.emit(TABLES_UPDATED, tables);
  });

  socket.on(LEAVE_TABLE, (tableId) => {
    const table = tables[tableId];
    const player = players[socket.id];
    const seat = Object.values(table.seats).find(
      (seat) => seat && seat.player.socketId === socket.id,
    );

    if (seat) {
      updatePlayerBankroll(player, seat.stack);
    }

    table.removePlayer(socket.id);

    socket.broadcast.emit(TABLES_UPDATED, tables);
    socket.emit(TABLE_LEFT, { tables, tableId });

    if (table.activePlayers().length === 1) {
      clearForOnePlayer(table);
    }
  });

  socket.on(FOLD, (tableId) => {
    let table = tables[tableId];
    let { seatId, message } = table.handleFold(socket.id);
    broadcastToTable(table, message);
    changeTurnAndBroadcast(table, seatId);
  });

  socket.on(CHECK, (tableId) => {
    let table = tables[tableId];
    let { seatId, message } = table.handleCheck(socket.id);
    broadcastToTable(table, message);
    changeTurnAndBroadcast(table, seatId);
  });

  socket.on(CALL, (tableId) => {
    let table = tables[tableId];
    let { seatId, message } = table.handleCall(socket.id);
    broadcastToTable(table, message);
    changeTurnAndBroadcast(table, seatId);
  });

  socket.on(RAISE, ({ tableId, amount }) => {
    let table = tables[tableId];
    let { seatId, message } = table.handleRaise(socket.id, amount);
    broadcastToTable(table, message);
    changeTurnAndBroadcast(table, seatId);
  });

  socket.on(TABLE_MESSAGE, ({ message, from, tableId }) => {
    let table = tables[tableId];
    broadcastToTable(table, message, from);
  });

  socket.on(SIT_DOWN, ({ tableId, seatId, amount }) => {
    const table = tables[tableId];
    const player = players[socket.id];

    table.sitPlayer(player, seatId, amount);
    let message = `${player.name} sat down in Seat ${seatId}`;

    updatePlayerBankroll(player, -amount);

    broadcastToTable(table, message);
    if (table.activePlayers().length === 2) {
      initNewHand(table);
    }
  });

  socket.on(REBUY, ({ tableId, seatId, amount }) => {
    const table = tables[tableId];
    const player = players[socket.id];

    table.rebuyPlayer(seatId, amount);
    updatePlayerBankroll(player, -amount);

    broadcastToTable(table);
  });

  socket.on(STAND_UP, (tableId) => {
    const table = tables[tableId];
    const player = players[socket.id];
    const seat = Object.values(table.seats).find(
      (seat) => seat && seat.player.socketId === socket.id,
    );

    let message = '';
    if (seat) {
      updatePlayerBankroll(player, seat.stack);
      message = `${player.name} left the table`;
    }

    table.standPlayer(socket.id);

    broadcastToTable(table, message);
    if (table.activePlayers().length === 1) {
      clearForOnePlayer(table);
    }
  });

  socket.on(SITTING_OUT, ({ tableId, seatId }) => {
    const table = tables[tableId];
    const seat = table.seats[seatId];
    seat.sittingOut = true;

    broadcastToTable(table);
  });

  socket.on(SITTING_IN, ({ tableId, seatId }) => {
    const table = tables[tableId];
    const seat = table.seats[seatId];
    seat.sittingOut = false;

    broadcastToTable(table);
    if (table.handOver && table.activePlayers().length === 2) {
      initNewHand(table);
    }
  });

  socket.on(DISCONNECT, () => {
    const seat = findSeatBySocketId(socket.id);
    if (seat) {
      updatePlayerBankroll(seat.player, seat.stack);
    }

    delete players[socket.id];
    removeFromTables(socket.id);

    socket.broadcast.emit(TABLES_UPDATED, tables);
    socket.broadcast.emit(PLAYERS_UPDATED, players);
  });

  async function updatePlayerBankroll(player, amount) {
    // const user = await db.User.findById(player.id);
    // await db.User.update(
    //   { bankroll: user.bankroll + amount },
    //   { where: { id: player.id } },
    // );
    // players[socket.id].bankroll = user.bankroll + amount;
    players[socket.id].bankroll += amount;
    io.to(socket.id).emit(PLAYERS_UPDATED, players);
  }

  // async function saveHandHistory(table) {
  //   const seats = Object.keys(table.seats).map((seatId) => table.seats[seatId]);
  //   const players = seats
  //     .filter((seat) => seat != null)
  //     .map((seat) => seat.player);

  //   const hand = await db.Hand.create({
  //     history: JSON.stringify(table.history),
  //   });
  //   await db.UserHand.bulkCreate(
  //     players.map((player) => ({
  //       user_id: player.id,
  //       hand_id: hand.id,
  //     })),
  //   );
  // }

  function findSeatBySocketId(socketId) {
    let foundSeat = null;
    Object.values(tables).forEach((table) => {
      Object.values(table.seats).forEach((seat) => {
        if (seat && seat.player.socketId === socketId) {
          foundSeat = seat;
        }
      });
    });
    return foundSeat;
  }

  function removeFromTables(socketId) {
    for (let i = 0; i < Object.keys(tables).length; i++) {
      tables[Object.keys(tables)[i]].removePlayer(socketId);
    }
  }

  function broadcastToTable(table, message = null, from = null) {
    for (let i = 0; i < table.players.length; i++) {
      let socketId = table.players[i].socketId;
      let tableCopy = hideOpponentCards(table, socketId);
      io.to(socketId).emit(TABLE_UPDATED, {
        table: tableCopy,
        message,
        from,
      });
    }
  }

  function changeTurnAndBroadcast(table, seatId) {
    setTimeout(() => {
      table.changeTurn(seatId);
      broadcastToTable(table);

      if (table.handOver) {
        // saveHandHistory(table);
        initNewHand(table);
      }
    }, 1000);
  }

  function initNewHand(table) {
    table.clearWinMessages();
    if (table.activePlayers().length > 1) {
      broadcastToTable(table, '---New hand starting in 5 seconds---');
    }
    setTimeout(() => {
      table.startHand();
      broadcastToTable(table);
    }, 5000);
  }

  function clearForOnePlayer(table) {
    // saveHandHistory(table);

    table.clearWinMessages();
    setTimeout(() => {
      table.clearSeatHands();
      table.resetBoardAndPot();
      broadcastToTable(table, 'Waiting for more players');
    }, 5000);
  }

  function hideOpponentCards(table, socketId) {
    let tableCopy = JSON.parse(JSON.stringify(table));
    let hiddenCard = { suit: 'hidden', rank: 'hidden' };
    let hiddenHand = [hiddenCard, hiddenCard];

    for (let i = 1; i <= tableCopy.maxPlayers; i++) {
      let seat = tableCopy.seats[i];
      if (
        seat &&
        seat.hand.length > 0 &&
        seat.player.socketId !== socketId &&
        !(seat.lastAction === WINNER && tableCopy.wentToShowdown)
      ) {
        seat.hand = hiddenHand;
      }
    }
    return tableCopy;
  }
};

module.exports = { init };
