// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  header: {
    text: '',
    color: '#000000',
  },
  paragraph: { text: '', color: '#000000' },
  button: {
    text: '',
    color: '#000000',
    buttonColor: '#000000',
  },
  backgroundImage: '',
  backgroundColor: '',
  position: 'top',
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
        return { ...state, backgroundImage: payload };
      case 'UPDATE_IMAGE_POSITION':
        return { ...state, position: payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
