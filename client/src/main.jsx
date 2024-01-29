import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/contextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ContextProvider>
            <CssBaseline />
            <App />
        </ContextProvider>
    </>
)
