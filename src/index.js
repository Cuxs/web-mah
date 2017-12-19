import React from 'react';
import './index.css';
import { render } from 'react-snapshot';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
