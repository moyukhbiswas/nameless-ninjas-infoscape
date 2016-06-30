import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

// Render the main component into the dom
let infoscapeapp = ReactDOM.render(<App />, document.getElementById('app'));

window.showAddDialog = infoscapeapp.showAddDialog;
