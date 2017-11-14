import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Components
import Root from './components/Root';

import { history, store } from './storeHistory';

ReactDOM.render(<Root history={ history } store={ store } />, document.getElementById('root'));
registerServiceWorker();
