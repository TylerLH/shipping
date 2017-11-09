import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { clearNotification, toggleNavigation } from '../../actions';

import Notifications from '../../components/Notifications';
import Navigation from '../../components/Navigation';
import Containers from '../Containers';
import Vessels from '../Vessels';
import VesselPlans from '../VesselPlans';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class App extends Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isNavigationOpen: PropTypes.bool.isRequired,
    clearNotification: PropTypes.func.isRequired,
    toggleNavigation: PropTypes.func.isRequired
  };

  render() {
    const { notifications, classes, isNavigationOpen } = this.props;
    return (
      <Router>
        <div className="App">
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton
                onClick={e => this.props.toggleNavigation()}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                Shipping.ai
              </Typography>
            </Toolbar>
          </AppBar>
          <Navigation
            isOpen={isNavigationOpen}
            onRequestClose={e => this.props.toggleNavigation()}
          />
          <Route exact path="/" component={Containers} />
          <Route path="/containers" component={Containers} />
          <Route path="/vessels" component={Vessels} />
          <Route path="/vessel_plans" component={VesselPlans} />
          <Notifications
            message={notifications.message}
            isOpen={notifications.isOpen}
            onRequestClose={this.props.clearNotification}
          />
        </div>
      </Router>
    );
  }
}

const mapState = state => {
  return {
    notifications: state.notifications,
    isNavigationOpen: state.app.isNavigationOpen
  };
};

export default connect(mapState, { clearNotification, toggleNavigation })(
  withStyles(styles)(App)
);
