const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Assign one of the selected distinct colors for each user
let colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#000000'
];

wss.on('connection', (ws) => {
  console.log('Number of users online: ', wss.clients.size)
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  // Send how many users online to the frontend
  const userCount = {
    type: 'userCount',
    number: wss.clients.size
  }
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userCount));
    }
  });

  // Send the color of the name of each user to the frontend
  const nameColor = {
    type: 'nameColor',
    color: randomColor
  }
  ws.send(JSON.stringify(nameColor));

  // Broadcast to everyone when a user sends a message
  ws.on('message', function incoming(message) {
    let msg = JSON.parse(message);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected, ', 'Number of users online: ', wss.clients.size)
    wss.clients.forEach(function each(client) {
      const userCount = {
        type: 'userCount',
        number: wss.clients.size
      }
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(userCount));
      }
    });
  });
});