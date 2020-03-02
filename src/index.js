import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store,persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'core-js';
import {createMuiTheme} from '@material-ui/core/styles';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#50394c',
        },
        secondary: {
            main: '#ffef96',
        },
    },
});
ReactDOM.render(  
     <PersistGate loading={null} persistor={persistor}> 
        <Provider store={store}>
        <MuiThemeProvider theme={theme}>
           <App />
        </MuiThemeProvider>   
        </Provider> 
        
    </PersistGate>    
    ,document.getElementById('root')
    );

