
import WebSocket from 'ws';
import { IncomingMessage } from 'http';

const PORT = 1234;

const wss = new WebSocket. ({ port: PORT });

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  ws.on('message', (message: string) => {
    wss.clients.forEach((client:any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

wss.on('error', (error: any) => {
  console.error('WebSocket server error:', error);
});

console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
console.log('Ready for collaborative editing...');