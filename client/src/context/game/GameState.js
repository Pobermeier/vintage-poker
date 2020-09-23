import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  CALL,
  CHECK,
  FOLD,
  JOIN_TABLE,
  LEAVE_TABLE,
  RAISE,
  REBUY,
  SIT_DOWN,
  STAND_UP,
  TABLE_JOINED,
  TABLE_LEFT,
  TABLE_UPDATED,
} from '../../pokergame/actions';
import socketContext from '../websocket/socketContext';
import GameContext from './gameContext';

const GameState = ({ history, children }) => {
  const { socket } = useContext(socketContext);

  const [messages, setMessages] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [isPlayerSeated, setIsPlayerSeated] = useState(false);
  const [seatId, setSeatId] = useState(null);

  const currentTableRef = React.useRef(currentTable);

  React.useEffect(() => {
    currentTableRef.current = currentTable;
  }, [currentTable]);

  useEffect(() => {
    if (socket) {
      window.onunload = leaveTable;
      window.onunload = leaveTable;

      socket.on(TABLE_UPDATED, ({ table, message, from }) => {
        console.log(TABLE_UPDATED, table, message, from);
        setCurrentTable(table);
        message && addMessage(message);
      });

      socket.on(TABLE_JOINED, ({ tables, tableId }) => {
        console.log(TABLE_JOINED, tables, tableId);
        setCurrentTable(tables[tableId]);
      });

      socket.on(TABLE_LEFT, ({ tables, tableId }) => {
        console.log(TABLE_LEFT, tables, tableId);
        setCurrentTable(null);
        setMessages([]);
      });
    }
    return () => socket && leaveTable;
    // eslint-disable-next-line
  }, [socket]);

  const joinTable = (tableId) => {
    console.log(JOIN_TABLE, tableId);
    socket.emit(JOIN_TABLE, tableId);
  };

  const leaveTable = () => {
    currentTableRef &&
      currentTableRef.current &&
      currentTableRef.current.id &&
      socket.emit(LEAVE_TABLE, currentTableRef.current.id);
    isPlayerSeated && standUp();
    history.push('/');
  };

  const sitDown = (tableId, seatId, amount) => {
    socket.emit(SIT_DOWN, { tableId, seatId, amount });
    setIsPlayerSeated(true);
    setSeatId(seatId);
  };

  const rebuy = (tableId, seatId, amount) => {
    socket.emit(REBUY, { tableId, seatId, amount });
  };

  const standUp = () => {
    socket.emit(STAND_UP, currentTableRef.current.id);
    setIsPlayerSeated(false);
    setSeatId(null);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log(message);
  };

  const fold = () => {
    socket.emit(FOLD, currentTableRef.current.id);
  };

  const check = () => {
    socket.emit(CHECK, currentTableRef.current.id);
  };

  const call = () => {
    socket.emit(CALL, currentTableRef.current.id);
  };

  const raise = (amount) => {
    socket.emit(RAISE, { tableId: currentTableRef.current.id, amount });
  };

  return (
    <GameContext.Provider
      value={{
        messages,
        currentTable,
        isPlayerSeated,
        seatId,
        joinTable,
        leaveTable,
        sitDown,
        standUp,
        addMessage,
        fold,
        check,
        call,
        raise,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default withRouter(GameState);
