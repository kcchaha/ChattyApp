import React, {Component} from 'react';

class Message extends Component {
 
  render() {
      const {chat} = this.props;
      const {isNotification} = this.props;

      // check the message input is a valid url of image
      const checkImgUrl = url => { 
        const regexp =  /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
          if (regexp.test(url)) {
            return true;
          } else {
            return false;
          }
      }

      if (isNotification === true) {
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
            <span className="message-content">{checkImgUrl(chat.content)? <img className="chat-img" src={chat.content} /> : chat.content}</span>
          </div>
        </div>
    )
  }
}

export default Message;