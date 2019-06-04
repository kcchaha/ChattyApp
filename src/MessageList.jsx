import React, {Component} from 'react';
import Message from '../src/Message.jsx';

class MessageList extends Component {
  render() {
    return (
        <main className="messages">
          <Message />
        </main>
    )
  }
}

export default MessageList