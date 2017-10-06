import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
  	height: 450,
	  width: 450,
	  margin: 20,
	  textAlign: 'center',
	  display: 'inline-block'
  },
  table: {
  	width: 30,
  	height: 30,
  	textAlign: 'center',
  	border: '1px solid black'
  }
};

const Board = (props) => {
	const table = props.board;
	return (
		<Paper style={style} zDepth={1} rounded={false} >
			<div className="row">
				{table.map((cell, x) => {
					return (
						<div key={x} style={{ display: 'inline-block' }}>
							{cell.map((value, y) => <div key={y} style={style.table} onClick={props.onCellClick.bind(this, x, y)}>{value}</div>)}
						</div>
					)
				})}
			</div>
		</Paper>
	)
}

export default Board;