import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import FlatButton from 'material-ui/FlatButton';
import Room from './room';
import { url, headers } from '../constants';

class Rooms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: [],
			game: []
		}
	}
	
	componentDidMount() {
		this.interval = setInterval(() => this.getRoomList(), 3000);
	}

	componentWillUnmount() {
    clearInterval(this.interval);
  }

	getRoomList = (method) => {
		if (!method) method = 'GET';

		fetch(`${url}games/?status=waiting`, {
			method: method, 
		  mode: 'cors',
		  credentials: 'include',
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(rooms => this.setState({ rooms })
			);
	}

	newGame = () => {
		fetch(url + 'games/', {
			method: 'POST', 
		  mode: 'cors',
		  body: {},
		  credentials: 'include',
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(() => this.getRoomList('GET')
			);
	}

	leaveRoom = (id) => {
		fetch(url + `games/${id}/leave/`, {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include',
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(() => this.getRoomList('GET')
			);
	}

	joinRoom = (id) => {
		fetch(url + `games/${id}/join/`, {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include',
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(() => this.getRoomList('GET')
			);

	}

	startGame = (id) => {
		fetch(url + `games/${id}/start/`, {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include',
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then((game) => this.setState({ game })
			);
	}

	render() {
		const rooms = this.state.rooms;
		return (
			<div>
	    	<FlatButton label="Add new room" 
	    		onClick={this.newGame}
	    		backgroundColor={'#9CC842'}
	    		hoverColor={'#6cf875'}
	    	/>
	    	<div className="row">
			    {rooms.length > 0 ? rooms.map(room => 
			     	<Room 
			     		key={room.id} 
			     		id={room.id} 
			     		players={room.players} 
			     		leaveRoom={this.leaveRoom}
			     		joinRoom={this.joinRoom}
			     		startGame={this.startGame}
			     	/>) : null}
		    </div>
			</div>
		)
	}
}

export default Rooms;