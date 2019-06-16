
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../elements/Table';
import { getMessages, getThings } from '../../api/things';
import io from 'socket.io-client';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getThings().then((response) => {
      const thing = response.data.things.find(t => t.id === id);
      getMessages(thing.key, 'd3995c05-5c52-47b4-84e4-cc4fd4a33cb1')
        .then((res) => {
          this.setState({ messages: res.data.messages });
          this.socket = io(`http://172.25.0.12:3006/device/${thing.key}`);
          this.socket.removeAllListeners();
          this.socket.on('message', this.handleMessage);
        }).catch(e => console.log(e));
    });
  }

  componentWillUnmount() {
    this.socket.off('message', this.handleMessage);
    this.socket.removeAllListeners();
  }

  handleMessage(data) {
    console.log('asd');
    this.setState({
      messages: [
        ...this.state.messages,
        ...data,
      ],
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <Table
          columns={{ channel: 'channel', name: 'name', protocol: 'protocol', publisher: 'publisher', time: 'time', unit: 'unit', value: 'value' }}
          data={messages}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Messages;
