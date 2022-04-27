import log from 'loglevel';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './scss/common.scss';

log.setLevel('trace'); // TODO set to error for productions

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
