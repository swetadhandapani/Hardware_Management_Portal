import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import rootReducer from './reducers'; 
import App from './App';
import { UserProvider } from './context/UserContext'; 
import { EmployeeProvider } from './context/EmployeeContext'; 

// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Create root for rendering the app
const container = document.getElementById('root');
const root = createRoot(container);

// Render the App wrapped with Provider, Router, UserProvider, and EmployeeProvider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UserProvider>
          <EmployeeProvider>
            <App />
          </EmployeeProvider>
        </UserProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
