import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Players = (props) => {
	console.log('players', props.players);
	return (
		<Paper style={style} zDepth={1} rounded={false}>
			{props.players.map((pl) => 
				<h4 key={pl.id}>{pl.name}</h4>
			)}
		</Paper>
	)
}

export default Players;