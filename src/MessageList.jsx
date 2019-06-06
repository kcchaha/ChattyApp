import React, {Component} from 'react';
import Message from '../src/Message.jsx';

class MessageList extends Component {

  listMessages = () => {
    return (
      this.props.listChats.map((chat) => {
        if (chat.type === 'postNotification') {
          return <Message key={chat.id} chat={chat} isNotification={true}/>
        } 
        return <Message key={chat.id} chat={chat} color={chat.color}/>
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