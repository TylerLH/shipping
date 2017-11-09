import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import { fetchVessels } from '../actions';
import { getVessels } from '../selectors';

import LoadingIndicator from '../components/LoadingIndicator';
import VesselsTable from '../components/VesselsTable';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  toolbarRight: {
    textAlign: 'right'
  },
  loading: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  }
});

class Vessels extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    vessels: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchVessels: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchVessels();
  }

  render() {
    const { classes, vessels, isLoading } = this.props;

    let content = <LoadingIndicator message="Loading Vessels" />;

    if (!isLoading) {
      content = <VesselsTable vessels={vessels} />;
    }

    return (
      <div className={classes.root}>
        <Paper>
          <Toolbar>
            <Typography type="title">Vessels</Typography>
          </Toolbar>
          {content}
        </Paper>
      </div>
    );
  }
}

const mapState = state => {
  return {
    vessels: getVessels(state),
    isLoading: state.vessels.isLoading
  };
};

export default connect(mapState, { fetchVessels })(withStyles(styles)(Vessels));
