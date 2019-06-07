import React, {Component} from 'react';

class ChatBar extends Component {
  
  handleMessage = event => {
    let input = event.target.value;
    if (!input) {
      throw Error;
    } else {
      if (event.keyCode === 13) {
        this.props.createMessage(input);
        event.target.value = '';
      }
    }
  }

  handleUsername = event => {
    let input = event.target.value;
    const {name} = this.props.currentUser;
    
    if (event.keyCode === 13 || event.type === 'blur') {
      if (input.length > 0 && name !== input) {
        this.props.updateUsername(input);
      }
      if (input.length === 0 && name !== 'Anonymous') {
        this.props.updateUsername('Anonymous');
      }
    }
  }
  
  render() {
    return (
      <form className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name > 0? this.props.currentUser.name : 'Anonymous'} onKeyUp={this.handleUsername} onBlur={this.handleUsername} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessage}/>
      </form>
    )
  }
}

export default ChatBar;