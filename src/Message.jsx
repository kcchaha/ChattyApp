import React, {Component} from 'react';

class Message extends Component {
  render() {
    {console.log('coooooooooooooo',this.props)}

      const {chat} = this.props

      if (this.props.isNotification === true) {
        return (
          <div>
            <div className="message system">
              {chat.text}
            </div>
          </div>
        )
      }

    return (
        <div>
          <div className="message">
            <span style={{color: this.props.color}} className="message-username">{chat.username}</span>
            <span className="message-content">{chat.content}</span>
          </div>
        </div>
    )
  }
}

export default Message