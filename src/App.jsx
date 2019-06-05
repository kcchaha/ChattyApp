import React, {Component} from 'react';
import MessageList from '../src/MessageList.jsx';
import ChatBar from '../src/ChatBar.jsx';
import uuid from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name}, 
      messages: []
    }
    this.incomingMessage = this.incomingMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    const webSocket = new WebSocket("ws://localhost:3001")
    this.webSocket = webSocket;
    
    webSocket.onmessage = event => {
      let msg = JSON.parse(event.data);
      console.log('got message from server:', msg)
    }
  }


  incomingMessage = msg => {
    const newMessage = {
      id: uuid.v4(),
      username: this.state.currentUser.name,
      content: msg
    }
    console.log('incoming new msg',newMessage);
    console.log('state',this.state.messages)
    const message = this.state.messages;
    const oldMessages = message;
    const newMessages = [...oldMessages, newMessage];
    this.setState({
      messages: newMessages
    })
    
    this.webSocket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList listChats={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} 
      incomingMessage={this.incomingMessage}/>
      </div>
    )
  }
}
export default App;
