import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Main = () => {
	return (
		<MuiThemeProvider>
	    <App />
	  </MuiThemeProvider>
	)
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
