import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

export default class Modal extends Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({open: false});

  };

  render() {
    const actions = [
      <Link to={'/rooms/'}>
        <FlatButton
          label="Back to rooms"
          primary={true}
          onClick={this.handleClose}
        />
      </Link>
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}