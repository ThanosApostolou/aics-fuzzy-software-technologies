import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'katex/dist/katex.min.css';
import 'katex';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalState } from './modules/core/global-state';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthService } from './modules/auth/AuthService';
import 'chart.js/auto';

async function main() {
    GlobalState.initializeDefault();
    await AuthService.init();

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
}

main()