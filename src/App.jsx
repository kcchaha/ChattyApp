import React, {Component} from 'react';
import MessageList from '../src/MessageList.jsx';
import ChatBar from '../src/ChatBar.jsx';
import uuid from 'uuid';

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

  componentDidMount() {
    console.log("componentDidMount <App />");

    const webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket = webSocket;
    
    webSocket.onmessage = event => {
      let msg = JSON.parse(event.data);
      console.log('got message from server:', msg)
      console.log('event:', event)
      if (msg.type === 'userCount') {
        this.setState({userCount: msg.number})
      } 
      if (msg.type === 'nameColor') {
        this.setState({nameColor: msg.color})
      } else {
        this.setState({messages: [...this.state.messages, msg]})
      }
    }
  }  

  updateUsername = username => {
    const notification = {
      type: 'postNotification',
      text: `User ${this.state.currentUser.name.length !== 0? this.state.currentUser.name : "Anonymous"} changed their name to ${username}`
    }

    this.setState({
      currentUser: {name: username} 
    })
    this.webSocket.send(JSON.stringify(notification));
  }

  incomingMessage = msg => {
    const newMessage = {
      id: uuid.v4(),
      username: this.state.currentUser.name.length !== 0? this.state.currentUser.name : "Anonymous",
      content: msg,
      color: this.state.nameColor
    }
    const message = this.state.messages;
    const oldMessages = message;
    const newMessages = [...oldMessages, newMessage];
    // this.setState({
    //   messages: newMessages
    // })
    
    this.webSocket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount">{this.state.userCount} users online</span>
      </nav>
      <MessageList listChats={this.state.messages}
      nameColor={this.state.nameColor}/>
      <ChatBar currentUser={this.state.currentUser} 
      incomingMessage={this.incomingMessage}
      updateUsername={this.updateUsername}/>
      </div>
    )
  }
}
export default App;
