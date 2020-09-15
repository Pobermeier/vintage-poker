// Game Actions
const FOLD = 'FOLD';
const CHECK = 'CHECK';
const CALL = 'CALL';
const RAISE = 'RAISE';
const WINNER = 'WINNER';
const FETCH_LOBBY_INFO = 'FETCH_LOBBY_INFO';
const RECEIVE_LOBBY_INFO = 'RECEIVE_LOBBY_INFO';
const PLAYERS_UPDATED = 'PLAYERS_UPDATED';
const JOIN_TABLE = 'JOIN_TABLE';
const TABLE_JOINED = 'TABLE_JOINED';
const LEAVE_TABLE = 'LEAVE_TABLE';
const TABLE_LEFT = 'TABLE_LEFT';
const TABLES_UPDATED = 'TABLES_UPDATED';
const TABLE_UPDATED = 'TABLE_UPDATED';
const TABLE_MESSAGE = 'TABLE_MESSAGE';
const REBUY = 'REBUY';
const SIT_DOWN = 'SIT_DOWN';
const STAND_UP = 'STAND_UP';
const SITTING_OUT = 'SITTING_OUT';
const SITTING_IN = 'SITTING_IN';
const DISCONNECT = 'DISCONNECT';

// Init client-side socket.io
const socket = io({ transports: ['websocket'], upgrade: false });

// Generate random user
const user = {
  id: generateUUID(),
  username: 'testuser_' + Date.now(),
  bankroll: 30000,
};

// Register clean-up
window.onclose = cleanUp;
window.onunload = cleanUp;

// Render root-app component into DOM
ReactDOM.render(<App />, document.getElementById('root'));

// Main App-component
function App() {
  const [connected, setConnected] = React.useState(true);
  return (
    <div>
      <Navbar />
      {!connected && (
        <div className="container mt-5">
          <button onClick={() => socket.open()} className="btn btn-primary">
            Connect
          </button>
        </div>
      )}
      {connected && <Game setConnected={setConnected} />}
    </div>
  );
}

// Navbar component
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          Vintage Poker
        </a>
      </div>
    </nav>
  );
}

// Game-component that holds all game-related state & logic
function Game({ setConnected }) {
  const [players, setPlayers] = React.useState(null);
  const [tables, setTables] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [currentTable, setCurrentTable] = React.useState(null);
  const [socketId, setSocketId] = React.useState(null);
  const [userId] = React.useState(user.id);
  const [userName] = React.useState(user.username);
  const [isPlayerSeated, setIsPlayerSeated] = React.useState(false);
  const [bankroll, setBankroll] = React.useState(user.bankroll);

  const currentTableRef = React.useRef(currentTable);
  const socketIdRef = React.useRef(socketId);

  React.useEffect(() => {
    currentTableRef.current = currentTable;
    socketIdRef.current = socketId;
  }, [currentTable, socketId]);

  React.useEffect(() => {
    if (
      currentTable &&
      currentTable.winMessage &&
      currentTable.winMessage.length > 0
    ) {
      currentTable.winMessage.forEach((message) => addMessage(message));
    }
  }, [currentTable]);

  React.useEffect(() => {
    socket.on(RECEIVE_LOBBY_INFO, ({ tables, players, socketId }) => {
      // console.log(RECEIVE_LOBBY_INFO, tables, players, socketId);
      setTables(tables);
      setPlayers(players);
      setSocketId(socketId);
    });

    socket.on(PLAYERS_UPDATED, (players) => {
      // console.log(PLAYERS_UPDATED, players);
      setPlayers(players);
      players[socketIdRef.current] &&
        setBankroll(players[socketIdRef.current].bankroll);
    });

    socket.on(TABLES_UPDATED, (tables) => {
      // console.log(TABLES_UPDATED, tables);
      setTables(tables);
      // currentTableRef.current &&
      //   setCurrentTable(tables[currentTableRef.current.id]);
    });

    socket.on(TABLE_UPDATED, ({ table, message, from }) => {
      setCurrentTable(table);
      message && addMessage(message);
    });

    socket.on(TABLE_JOINED, ({ tables, tableId }) => {
      // console.log(TABLE_JOINED, tables, tableId);
      setCurrentTable(tables[tableId]);
    });

    socket.on(TABLE_LEFT, ({ tables, tableId }) => {
      // console.log(TABLE_LEFT, tables, tableId);
      setCurrentTable(null);
    });

    socket.emit(FETCH_LOBBY_INFO, user);

    socket.emit(JOIN_TABLE, 1);

    return () => {
      cleanUp();
    };
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sitDown = (tableId, seatId, amount) => {
    socket.emit(SIT_DOWN, { tableId, seatId, amount });
    setIsPlayerSeated(true);
  };

  const standUp = () => {
    socket.emit(STAND_UP, currentTable.id);
    setIsPlayerSeated(false);
  };

  const leaveTable = () => {
    isPlayerSeated && standUp();
    socket.emit(LEAVE_TABLE, currentTable.id);
    setCurrentTable(null);
  };

  const joinTable = () => {
    socket.emit(JOIN_TABLE, 1);
  };

  const fold = () => {
    socket.emit(FOLD, currentTable.id);
  };

  const check = () => {
    socket.emit(CHECK, currentTable.id);
  };

  const call = () => {
    socket.emit(CALL, currentTable.id);
  };

  const raise = (amount) => {
    socket.emit(RAISE, { tableId: currentTable.id, amount });
  };

  return (
    <div className="mt-5 container">
      <div className="mt-3 row">
        <div className="col-4">
          <button
            onClick={() => {
              if (currentTable) {
                leaveTable();
              } else {
                joinTable();
              }
            }}
            className="btn btn-primary"
          >
            {currentTable ? 'Leave table' : 'Join table'}
          </button>{' '}
          <button
            onClick={() => {
              setConnected(false);
              cleanUp();
            }}
            className="btn btn-danger"
          >
            Disconnect
          </button>
          <br />
          <strong>Username:</strong> {userName}
          <br />
          <strong>UserId:</strong> {userId}
          <br />
          <strong>Bankroll:</strong> {bankroll}
        </div>
        <div className="col-4">
          <strong>All active players:</strong>
          <br />
          <ul>
            {players &&
              Object.values(players).map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
          </ul>
        </div>
        <div className="col-4">
          <strong>All open tables:</strong>
          <br />
          <ul>
            {tables &&
              Object.values(tables).map((table) => (
                <li key={table.id}>{table.name}</li>
              ))}
          </ul>
        </div>
      </div>
      <br />
      <div className="row">
        <h5>Messages</h5>
        <br />
        <ul>
          {messages.length > 0 &&
            messages.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
      </div>
      <div className="row">
        {currentTable ? (
          <Table
            currentTable={currentTable}
            isPlayerSeated={isPlayerSeated}
            standUp={standUp}
            sitDown={sitDown}
            socketId={socketId}
            fold={fold}
            check={check}
            call={call}
            raise={raise}
          />
        ) : (
          <h1 className="text-center">Join a table to play</h1>
        )}
      </div>
    </div>
  );
}

function Table({
  currentTable,
  isPlayerSeated,
  socketId,
  standUp,
  sitDown,
  fold,
  check,
  call,
  raise,
}) {
  console.log(currentTable);
  return (
    <div className="container">
      <h1 className="text-center">Table {currentTable.id}</h1>
      <div className="row">
        <div className="col-4">
          <strong>Table Information:</strong>
          <br />
          <ul>
            <li>
              <strong>ID: </strong>
              {currentTable.id}
            </li>
            <li>
              <strong>Name: </strong>
              {currentTable.name}
            </li>
            <li>
              <strong>Max Players: </strong>
              {currentTable.maxPlayers}
            </li>
            <li>
              <strong>Limit: </strong>
              {currentTable.limit}
            </li>
            <li>
              <strong>minBet: </strong>
              {currentTable.minBet}
            </li>
            <li>
              <strong>minRaise: </strong>
              {currentTable.minRaise}
            </li>
          </ul>
        </div>
        <div className="col-4">
          <strong>Players on this table:</strong>
          <br />
          <ul>
            {currentTable.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <strong>This round:</strong>
          <br />
          <ul>
            <li>
              <strong>mainPot: </strong>
              {currentTable.mainPot}
            </li>
            <li>
              <strong>Turn: </strong>
              {currentTable.board.length === 0 && 'Pre-Flop'}
              {currentTable.board.length === 3 && 'Flop'}
              {currentTable.board.length === 4 && 'Turn'}
              {currentTable.board.length === 5 && 'River'}
              {currentTable.wentToShowdown && 'Showdown'}
            </li>
            {currentTable.board && currentTable.board.length > 0 && (
              <li>
                {currentTable.board.map((card) => `${card.suit}${card.rank} `)}
              </li>
            )}
            {currentTable.winMessages && currentTable.winMessages.length > 0 && (
              <li>
                {currentTable.winMessages.map((winMessage) => {
                  return `${winMessage} `;
                })}
              </li>
            )}
            <li>
              <strong>Turn: </strong>
              {currentTable.turn}
            </li>
            <li>
              <strong>Dealer: </strong>
              {currentTable.button}
            </li>
            <li>
              <strong>Small Blind: </strong>
              {currentTable.smallBlind}
            </li>
            <li>
              <strong>Big Blind: </strong>
              {currentTable.bigBlind}
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        {Object.values(currentTable.seats).map((seat, index) => {
          if (!seat) {
            return (
              <div key={index} className="col-3 text-center m-4">
                {!isPlayerSeated ? (
                  <button
                    onClick={() => {
                      const amount = prompt(
                        'With what amount do you want to buy-in?',
                      );
                      sitDown(currentTable.id, index + 1, parseInt(amount));
                    }}
                    className="btn btn-primary"
                  >
                    Sit down
                  </button>
                ) : (
                  <h5>Empty Seat</h5>
                )}
              </div>
            );
          } else {
            return (
              <Seat
                key={index}
                seat={seat}
                socketId={socketId}
                standUp={standUp}
                fold={fold}
                check={check}
                call={call}
                raise={raise}
                currentTable={currentTable}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

// A single seat
function Seat({
  seat,
  socketId,
  standUp,
  fold,
  check,
  call,
  raise,
  currentTable,
}) {
  console.log(seat);
  return (
    <div className="col-3 text-center m-4">
      <h5>{seat.player.name}</h5>
      <ul>
        <li>
          <strong>Hand:</strong>{' '}
          {seat.hand && seat.hand !== [] && seat.hand[0] && seat.hand[0].suit}
          {seat.hand &&
            seat.hand !== [] &&
            seat.hand[0] &&
            seat.hand[0].rank}{' '}
          {seat.hand && seat.hand !== [] && seat.hand[1] && seat.hand[1].suit}
          {seat.hand && seat.hand !== [] && seat.hand[1] && seat.hand[1].rank}
        </li>
        <li>
          <strong>Bet:</strong> {seat.bet}
        </li>
        <li>
          <strong>Stack:</strong> {seat.stack}
        </li>
        <li>
          <strong>Turn:</strong> {seat.turn.toString()}
        </li>
        <li>
          <strong>Checked:</strong> {seat.checked.toString()}
        </li>
        <li>
          <strong>Folded:</strong> {seat.folded.toString()}
        </li>
        <li>
          <strong>Sitting Out:</strong> {seat.sittingOut.toString()}
        </li>
      </ul>
      {seat.player.socketId === socketId && (
        <React.Fragment>
          {seat.turn && (
            <React.Fragment>
              {!seat.folded && (
                <button
                  onClick={() => {
                    const amount = prompt('Enter raise amount:');
                    raise(parseInt(amount));
                  }}
                  className="btn btn-primary"
                >
                  Bet
                </button>
              )}
              {!seat.folded && currentTable.callAmount > seat.bet && (
                <button onClick={() => call()} className="btn btn-primary">
                  Call
                </button>
              )}
              {!seat.folded &&
                (!currentTable.callAmount ||
                  currentTable.callAmount === seat.bet ||
                  currentTable.turn <= 1) && (
                  <button onClick={() => check()} className="btn btn-primary">
                    Check
                  </button>
                )}
              {!seat.folded && (
                <button onClick={() => fold()} className="btn btn-danger">
                  Fold
                </button>
              )}
              <br />
            </React.Fragment>
          )}
          <button onClick={() => standUp()} className="btn btn-primary">
            Stand Up
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

// Helper function to generade UUIDs
function generateUUID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function cleanUp() {
  socket.emit(DISCONNECT);
  socket.close();
}
