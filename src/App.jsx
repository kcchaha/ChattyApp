import React, {Component} from 'react';
import MessageList from '../src/MessageList.jsx';
import ChatBar from '../src/ChatBar.jsx';
import uuid from 'uuid';

// Set states for parent App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      userCount: 0,
      nameColor: ''
    }
  }

  // States change when receiving data from web socket server
  componentDidMount() {
    const webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket = webSocket;
    
    webSocket.onmessage = event => {
      let msg = JSON.parse(event.data);
    
      if (msg.type === 'userCount') {
        this.setState({userCount: msg.number})
      } else if (msg.type === 'nameColor') {
        this.setState({nameColor: msg.color});
      } else {
        this.setState({messages: [...this.state.messages, msg]});
      }
    }
  }  

  // Send notification to web socket server when a users change their name
  updateUsername = username => {
    const {name} = this.state.currentUser
    const notification = {
      type: 'postNotification',
      text: `User ${name.length !== 0? name : "Anonymous"} changed their name to ${username}`
    }

    this.setState({
      currentUser: {name: username}
    })
    this.webSocket.send(JSON.stringify(notification));
  }

  // Create/edit new messages and send to the web socket server
  createMessage = msg => {
    const {name} = this.state.currentUser
    const newMessage = {
      id: uuid.v4(),
      username: name.length !== 0? name : "Anonymous",
      content: msg,
      color: this.state.nameColor
    }
    
    this.webSocket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount">{this.state.userCount} user(s) online</span>
      </nav>
      <MessageList listChats={this.state.messages}
      nameColor={this.state.nameColor}/>
      <ChatBar currentUser={this.state.currentUser} 
      createMessage={this.createMessage}
      updateUsername={this.updateUsername}/>
      </div>
    )
  }
}
export default App;
