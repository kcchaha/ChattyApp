import React, {Component} from 'react';
import Message from '../src/Message.jsx';

class MessageList extends Component {

  listMessages() {
    return (
      this.props.listChats.map((chat) => {
        return <Message key={chat.id} chat={chat}/>
      })
    )
  }

  render() {
    return (
        <main className="messages">
          {this.listMessages()}
        </main>
    )
  }
}

export default MessageList