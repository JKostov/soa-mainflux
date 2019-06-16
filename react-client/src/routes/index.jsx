
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';
import AppLayout from '../components/AppLayout';

const dynamicImport = loader => Loadable({
  loader,
  loading: () => <Loader active inline="centered" />,
});

const LoggedInList = () => (
  <Switch>
    <Route exact path="/" component={dynamicImport(() => import('../pages/Home'))} />
    <Route path="/things/:id/messages" component={dynamicImport(() => import('../pages/Messages'))} />
    <Route path="/logout" component={dynamicImport(() => import('../components/Logout'))} />
    <Redirect to="/" />
  </Switch>
);

const LoggedOutList = () => (
  <Switch>
    <Route exact path="/login" component={dynamicImport(() => import('../pages/Login'))} />
    <Redirect to="/login" />
  </Switch>
);

const Routes = ({ isLoggedIn }) => (
  <AppLayout isLoggedIn={isLoggedIn}>
    {isLoggedIn ? <LoggedInList /> : <LoggedOutList />}
  </AppLayout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: null,
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: !!auth.get('token'),
});

export default withRouter(connect(mapStateToProps)(Routes));
