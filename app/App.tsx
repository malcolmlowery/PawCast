import React from 'react';
import Navigation from './screens/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
};
