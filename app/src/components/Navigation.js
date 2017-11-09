import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  navHead: {
    padding: theme.spacing.unit * 2
  },
  nav: {
    width: 250
  },
  activeLink: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  }
});

class Navigation extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  render() {
    const { classes, isOpen, onRequestClose } = this.props;
    return (
      <Drawer open={isOpen} onRequestClose={onRequestClose}>
        <div className={classes.nav}>
          <div className={classes.navHead}>
            <Typography type="title">Shipping.ai</Typography>
          </div>
          <Divider />
          <div
            tabIndex={0}
            role="button"
            onClick={onRequestClose}
            onKeyDown={onRequestClose}
          >
            <ListItem
              activeClassName={classes.activeLink}
              button
              component={NavLink}
              to="/containers"
            >
              <ListItemText primary="Containers" />
            </ListItem>
            <ListItem
              activeClassName={classes.activeLink}
              button
              component={NavLink}
              to="/vessels"
            >
              <ListItemText primary="Vessels" />
            </ListItem>
            <ListItem
              activeClassName={classes.activeLink}
              button
              component={NavLink}
              to="/vessel_plans"
            >
              <ListItemText primary="Vessel Plans" />
            </ListItem>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Navigation);
