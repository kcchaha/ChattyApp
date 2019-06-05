import React, {Component} from 'react';

class ChatBar extends Component {
  
  handleKeyUp = event => {
    // console.log(event.target.value)
    let input = event.target.value;
    if (!input) {
      throw Error;
    } else {
      if (event.keyCode === 13) {
      this.props.incomingMessage(input);
      event.target.value = '';
      }
    }
  }
  
  render() {
    return (
      <form className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyUp}/>
      </form>
    )
  }
}

export default ChatBar