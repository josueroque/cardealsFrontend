import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store,persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'core-js';
ReactDOM.render(  
     <PersistGate loading={null} persistor={persistor}> 
        <Provider store={store}>
            <App />
        </Provider> 
    </PersistGate>    
    ,document.getElementById('root')
    );

