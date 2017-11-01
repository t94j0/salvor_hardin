import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root/components/Root';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(<Root store={ store } />, document.getElementById('root'));
registerServiceWorker();
