import React, {Component} from 'react';

class ChatBar extends Component {
  
  handleKeyDown(event) {
    // console.log(event.target.value)
    let input = event.target.value;
    if (!input) {
      alert(`We can't send empty message`);
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
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyDown.bind(this)}/>
      </form>
    )
  }
}

export default ChatBar