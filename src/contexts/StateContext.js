import React, { useReducer, createContext } from "react";
import id from "uuid/v4";

export const StateContext = createContext();

const STATE_ADD = "STATE_ADD";
const STATE_REMOVE = "STATE_REMOVE";
const STATE_UNDO = "STATE_UNDO";
const STATE_REDO = "STATE_REDO";

const initialState = [
  { id: id(), name: "test1", age: 20, email: "hej@hej1.dk" },
  { id: id(), name: "test2", age: 21, email: "hej@hej2.dk" },
  { id: id(), name: "test3", age: 22, email: "hej@hej3.dk" }
];

const defaultState = {
  past: [],
  present: initialState,
  future: []
};

const reducer = (state = defaultState, action) => {
  if (action.type === STATE_ADD) {
    const newPresent = [
      {
        id: id(),
        ...action.payload
      },
      ...state.present
    ];
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  }

  if (action.type === STATE_REMOVE) {
    const newPresent = state.present.filter(
      obj => obj.id !== action.payload.id
    );
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  }

  if (action.type === STATE_UNDO) {
    const [newPresent, ...newPast] = state.past;
    return {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future]
    };
  }

  if (action.type === STATE_REDO) {
    const [newPresent, ...newFuture] = state.future;
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [...newFuture]
    };
  }
  return state;
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const stateObjects = state.present;
  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

  const addState = stateObject => {
    dispatch({
      type: STATE_ADD,
      payload: {
        ...stateObject
      }
    });
  };

  const RemoveState = id => {
    dispatch({
      type: STATE_REMOVE,
      payload: {
        id
      }
    });
  };

  const undoState = () => {
    dispatch({
      type: STATE_UNDO
    });
  };

  const redoState = () => {
    dispatch({
      type: STATE_REDO
    });
  };

  const value = {
    stateObjects,
    addState,
    RemoveState,
    undoState,
    redoState,
    isPast,
    isFuture
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
