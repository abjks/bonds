import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {App} from './App';
import {bondReducer} from './reducer';

// Мок для api
import "./__apiMock__/apiMock";

const store = createStore(bondReducer, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <App isin="US67021BAE92" />
    </Provider>
), document.getElementById('root'));
