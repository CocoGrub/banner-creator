// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  header: '',
  paragraph: '',
  button: '',
  backgroundImage: '',
  backgroundColor: '',
};
const store = createContext(initialState);
const { Provider } = store;

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case 'UPDATE_TEXT':
        const newState = { ...state, ...payload };
        return newState;
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
