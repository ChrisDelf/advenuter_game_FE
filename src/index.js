import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers/index.js';
// Import redux persist
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
//PersistGate wrapped around root component
import {PersistGate} from 'redux-persist/integration/react';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

console.log(process.env.AUTH_CLIENT)
console.log(process.env.REACT_APP_CLIENT)
//Persist combined reducers
const persistedReducer = persistReducer(persistConfig, combineReducers)
//Store now has access to persisted reducers
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    rootElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
