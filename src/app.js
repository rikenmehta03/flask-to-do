import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MyApp from './components/MyApp';
import configureStore from './store/configureStore';
import { fetchInterceptor } from './utils/fetchInterceptor';

const interceptor = fetchInterceptor();
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <MyApp />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));