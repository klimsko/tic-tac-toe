import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import FlatButton from 'material-ui/FlatButton';
import Players from './players';
import Board from './board';
import Modal from './modal';
import { url, headers } from '../constants';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			game: [],
			finished: false
		}

		this.id = this.props.match.params.gameId;
	}

	componentDidMount() {
		this.interval = setInterval(() => this.update(), 3000);
	}

	componentWillUnmount() {
    clearInterval(this.interval);
  }

	update() {
		fetch(url + 'games/' + this.id, {
			method: 'GET', 
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
			.then(game => this.setState({ game, finished: game.finished ? true : false }),
				this.gameOver()
			);
	}

	surrenderGame = () => {
		fetch(url + `games/${this.id}/surrender/`, {
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
			.then((game) => this.setState({ game, finished: game.finished ? true : false })
			);
	}

	gameOver = () => {
		this.state.finished ? clearInterval(this.interval) : null;
	}

	onCellClick = (x, y) => {
		fetch(url + `games/${this.id}/moves/`, {
			method: 'POST', 
		  mode: 'cors', 
		  credentials: 'include',
		  body: JSON.stringify({x: x, y: y}),
		  headers: headers,
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(game => this.setState({ game: game.game })
			);
	}

	render() {
		const game = this.state.game;

		return (
			<div>
				{this.state.finished ? <Modal /> : null}
				{game.players !== undefined ? <Players players={game.players} /> : null}
				{game.board !== undefined ? <Board board={game.board} onCellClick={this.onCellClick} /> : null}
		   
		    It is a game
		    
		    <FlatButton label="Surrender" 
	    		onClick={this.surrenderGame}
	    	/>
			</div>
		)
	}
}

export default Game;