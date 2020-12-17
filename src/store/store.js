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
        return { ...state, ...payload };
      case 'UPDATE_COLOR':
        return { ...state, backgroundColor: payload };
      case 'UPDATE_IMAGE':
        console.log(payload);
        return { ...state, backgroundImage: payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
