import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Room = (props) => {
	return (
		<Paper style={style} zDepth={1} rounded={false} >
			{props.players.map((pl, index) => {
				return (
					<div style={{fontWeight: 'bold'}} key={pl.id}>
						Player {index+1}: {pl.name}
					</div>
				)
			})}
			<FlatButton label="Leave room" onClick={props.leaveRoom.bind(this, props.id)}/>
			<FlatButton label="Join room" onClick={props.joinRoom.bind(this, props.id)}/>
			<Link to={'/game/' + props.id}>
				<FlatButton label="Start game" onClick={props.startGame.bind(this, props.id)}/>
			</Link>
		</Paper>
	)
}

export default Room;