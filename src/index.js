import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';

import App from './components/app';

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);