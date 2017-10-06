import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import { url, headers } from '../constants';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		}
	}

	onInputChange = (val, e) => {
		const value = e.currentTarget.value;

		this.setState({
			[val]: value
		});
	}

	registerUser = () => {
		const data = this.state;
		console.log(data);

		fetch(url + 'user/register/', {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include', 
		  body: JSON.stringify(data),
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(info => console.log(info)
			);
	}

	logIn = () => {
		const data = this.state;
		console.log(data);

		fetch(url + 'user/login/', {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include', 
		  body: JSON.stringify(data),
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(info => console.log(info)
			);
	}

	render() {
		return (
			<div>
				<TextField
					value={this.state.username}
					onChange={this.onInputChange.bind(this, 'username')}
		      hintText="Hint Text"
		      floatingLabelText="Username"
		    /><br />
		    <TextField
		    	value={this.state.password}
					onChange={this.onInputChange.bind(this, 'password')}
		      hintText="Password Field"
		      floatingLabelText="Password"
		      type="password"
		    /><br />
		    <Link to={'/rooms/'}><FlatButton label="Register" onClick={this.registerUser} /></Link>
		    <Link to={'/rooms/'}><FlatButton label="Login" onClick={this.logIn} /></Link>
		    
			</div>
		)
	}
}

export default Login;