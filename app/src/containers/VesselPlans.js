import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import { fetchVesselPlans, togglePlanSelection } from '../actions';
import { getPopulatedVesselPlans } from '../selectors';

import LoadingIndicator from '../components/LoadingIndicator';
import VesselPlansTable from '../components/VesselPlansTable';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  toolbarRight: {
    textAlign: 'right'
  }
});

class VesselPlans extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    vesselPlans: PropTypes.array.isRequired,
    activeVesselPlan: PropTypes.object,
    fetchVesselPlans: PropTypes.func.isRequired,
    togglePlanSelection: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchVesselPlans();
  }

  render() {
    const { classes, vesselPlans, isLoading } = this.props;

    let content = <LoadingIndicator message="Loading Vessel Plans" />;

    if (!isLoading) {
      content = (
        <VesselPlansTable
          vesselPlans={vesselPlans}
          onPlanSelection={this.props.togglePlanSelection}
        />
      );
    }

    return (
      <div className={classes.root}>
        <Paper>
          <Toolbar>
            <Typography type="title">Vessel Plans</Typography>
          </Toolbar>
          {content}
        </Paper>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoading: state.vesselPlans.isLoading,
    vesselPlans: getPopulatedVesselPlans(state),
    activeVesselPlan: state.vesselPlans.activeItem
  };
};

export default connect(mapState, { fetchVesselPlans, togglePlanSelection })(
  withStyles(styles)(VesselPlans)
);
