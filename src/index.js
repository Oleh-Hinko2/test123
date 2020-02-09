import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
// import ErrorBoundary from './components/error-boundary';

import 'antd/dist/antd.css'

import configureStore from './redux/configureStore';

export const store = configureStore();

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

