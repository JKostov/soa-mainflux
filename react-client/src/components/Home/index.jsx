
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getThings } from '../../api/things';
import Table from '../elements/Table';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      things: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getThings().then((response) => {
      this.setState({ things: response.data.things });
    });
  }

  handleClick(id) {
    const { push } = this.props;
    push(`/things/${id}/messages`);
  }

  render() {
    const { things } = this.state;
    return (
      <div>
        <Table
          columns={{ id: 'id', name: 'name', key: 'key' }}
          data={things}
          onClick={this.handleClick}
          selectable={true}
        />
      </div>
    );
  }
}

Home.propTypes = {
  push: PropTypes.func.isRequired,
};

export default Home;
