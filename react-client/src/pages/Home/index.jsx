
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import HomeComponent from '../../components/Home';
import Header from '../../components/elements/Header';

const Home = ({ history: { push } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Devices" />
      <HomeComponent push={push} />
    </Grid.Column>
  </Grid>
);

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};


export default withRouter(Home);
