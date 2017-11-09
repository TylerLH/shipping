import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import map from 'lodash/map';
import pluralize from 'pluralize';

import {
  fetchVessels,
  createVesselPlan,
  toggleVesselPlanDialog,
  toggleVesselSelection
} from '../actions';
import { getNumSelectedContainers } from '../selectors';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  selectedVessel: {
    backgroundColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700]
    }
  }
});

class VesselPlanDialog extends Component {
  static propTypes = {
    toggleVesselPlanDialog: PropTypes.func.isRequired,
    fetchVessels: PropTypes.func.isRequired,
    createVesselPlan: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    vessels: PropTypes.object.isRequired,
    selectedVessel: PropTypes.object.isRequired,
    numSelectedContainers: PropTypes.number.isRequired,
    selectedContainers: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchVessels();
  }

  onToggleClick = () => {
    this.props.toggleVesselPlanDialog();
  };

  onSubmit = () => {
    const { selectedContainers, selectedVessel } = this.props;
    this.props.createVesselPlan(
      selectedVessel.id,
      Object.keys(selectedContainers)
    );
  };

  onToggleSelection = selection => {
    this.props.toggleVesselSelection(selection);
  };

  renderOptions() {
    const { vessels, classes, selectedVessel } = this.props;
    return map(vessels, v => {
      const isSelected = selectedVessel === v;
      const itemClasses = classnames({
        [classes.selectedVessel]: isSelected
      });
      return (
        <ListItem
          button
          divider
          key={v.id}
          onClick={this.onToggleSelection.bind(this, v)}
          selected={isSelected}
          className={itemClasses}
        >
          <ListItemText primary={v.name} />
        </ListItem>
      );
    });
  }

  render() {
    const {
      isOpen,
      isSaving,
      numSelectedContainers,
      selectedVessel
    } = this.props;

    const toggleBtnLabel = 'Add to Vessel Plan';
    const saveBtnLabel = isSaving ? 'Saving...' : 'Save';
    const cancelBtnLabel = 'Cancel';
    const dialogLabel = 'Select a vessel.';
    const dialogTitleLabel = 'Add to Vessel Plan';
    const numAddedLabel = `${pluralize(
      'container',
      numSelectedContainers,
      true
    )} will be added.`;

    return (
      <div>
        <Button
          raised
          disabled={numSelectedContainers === 0}
          onClick={this.onToggleClick}
        >
          {toggleBtnLabel}
        </Button>
        <Dialog open={isOpen}>
          <DialogTitle>{dialogTitleLabel}</DialogTitle>
          <DialogContent>
            <Typography>{dialogLabel}</Typography>
            <List>{this.renderOptions()}</List>
            <Typography type="caption" align="center">
              {numAddedLabel}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onToggleClick}>{cancelBtnLabel}</Button>
            <Button
              color="primary"
              disabled={!selectedVessel || isSaving}
              onClick={this.onSubmit}
            >
              {saveBtnLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isOpen: state.containers.isAddingToVesselPlan,
    selectedContainers: state.containers.selectedItems,
    numSelectedContainers: getNumSelectedContainers(state),
    vessels: state.vessels.items,
    selectedVessel: state.vessels.selectedItem,
    isSaving: state.vesselPlans.isSaving
  };
};

export default connect(mapState, {
  fetchVessels,
  createVesselPlan,
  toggleVesselSelection,
  toggleVesselPlanDialog
})(withStyles(styles)(VesselPlanDialog));
