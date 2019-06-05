import React, {Component} from 'react';
import MessageList from '../src/MessageList.jsx';
import ChatBar from '../src/ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Chenchen"}, 
      messages: [
    {
      username: "Chenchen",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Chenchen. You lost them for good.",
      id: 2
    }
  ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // });

    this.webSocket = new WebSocket("ws://localhost:3001")
  }


  incomingMessage(msg) {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: msg
    }
    console.log(newMessage);
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
      incomingMessage={this.incomingMessage.bind(this)}/>
      </div>
    )
  }
}
export default App;
