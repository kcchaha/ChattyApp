import React, {Component} from 'react';

class Message extends Component {
  render() {
      const {chat} = this.props
    return (
        <div>
        <div className="message">
        <span className="message-username">{chat.username}</span>
        <span className="message-content">{chat.content}</span>
      </div>
      <div className="message system">
        {/* Anonymous1 changed their name to nomnom. */}
      </div>
      </div>
    )
  }
}

export default Message