import WebSocket from 'ws'
import StreamController from 'streamController'

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', (ws, req) => {
	StreamController.handleConnection(ws, req)
})