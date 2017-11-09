import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  content: {
    margin: '0 auto'
  }
});

const LoadingIndicator = ({ classes, message }) => {
  let messageEl = null;
  if (message) {
    messageEl = (
      <Typography type="subheading" align="center">
        {message}
      </Typography>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <CircularProgress color="accent" />
        {messageEl}
      </div>
    </div>
  );
};

LoadingIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string
};

export default withStyles(styles)(LoadingIndicator);
