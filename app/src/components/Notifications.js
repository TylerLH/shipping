import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class Notifications extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    const { isOpen, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={isOpen}
        autoHideDuration={6000}
        onRequestClose={this.handleRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default Notifications;
