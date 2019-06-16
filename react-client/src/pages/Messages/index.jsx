
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import MessagesComponent from '../../components/Messages';
import Header from '../../components/elements/Header';

const Messages = ({ match }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Messages" />
      <MessagesComponent match={match} />
    </Grid.Column>
  </Grid>
);

Messages.propTypes = {
  match: PropTypes.shape({}).isRequired,
};


export default withRouter(Messages);
