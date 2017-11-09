import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchContainers,
  toggleContainerSelection,
  toggleContainersSelectAll,
  clearContainerSelections
} from '../actions';

import {
  getContainers,
  getSelectedContainers,
  getNumContainers,
  getNumSelectedContainers
} from '../selectors';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import LoadingIndicator from '../components/LoadingIndicator';
import ContainersTable from '../components/ContainersTable';
import VesselPlanDialog from './VesselPlanDialog';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  toolbarRight: {
    textAlign: 'right'
  }
});

class ContainersList extends Component {
  state = {
    isDialogOpen: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    numContainers: PropTypes.number.isRequired,
    numSelectedContainers: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    containers: PropTypes.object.isRequired,
    selectedContainers: PropTypes.object.isRequired,
    isAllSelected: PropTypes.bool.isRequired,
    fetchContainers: PropTypes.func.isRequired,
    toggleContainerSelection: PropTypes.func.isRequired,
    toggleContainersSelectAll: PropTypes.func.isRequired,
    clearContainerSelections: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.clearContainerSelections();
  }

  componentDidMount() {
    this.props.fetchContainers();
  }

  // Handlers

  onRowSelectionChange = container => {
    this.props.toggleContainerSelection(container);
  };

  // Rendering

  render() {
    const {
      classes,
      isLoading,
      containers,
      selectedContainers,
      isAllSelected,
      numContainers,
      numSelectedContainers
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>
              <Toolbar>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography type="title">Containers</Typography>
                    <Typography type="caption">
                      {numSelectedContainers} selected
                    </Typography>
                  </Grid>
                  <Grid className={classes.toolbarRight} item xs={8}>
                    {isLoading ? null : <VesselPlanDialog />}
                  </Grid>
                </Grid>
              </Toolbar>
              {isLoading ? (
                <LoadingIndicator message="Loading Containers" />
              ) : (
                <ContainersTable
                  containers={containers}
                  selectedContainers={selectedContainers}
                  isAllSelected={isAllSelected}
                  onRowToggle={this.props.toggleContainerSelection}
                  onSelectAllClick={this.props.toggleContainersSelectAll}
                  numSelected={numSelectedContainers}
                  numRows={numContainers}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoading: state.containers.isLoading,
    containers: getContainers(state),
    selectedContainers: getSelectedContainers(state),
    isAllSelected: state.containers.isAllSelected,
    isAddingToVesselPlan: state.containers.isAddingToVesselPlan,
    numContainers: getNumContainers(state),
    numSelectedContainers: getNumSelectedContainers(state)
  };
};

const actions = {
  fetchContainers,
  toggleContainersSelectAll,
  toggleContainerSelection,
  clearContainerSelections
};

export default connect(mapState, actions)(withStyles(styles)(ContainersList));
