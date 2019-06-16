const WebSocket = require('ws');

// do not verify self-signed certificates if you are using one
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const ws = new WebSocket('wss://localhost/ws/channels/d3995c05-5c52-47b4-84e4-cc4fd4a33cb1/messages?authorization=9af574d5-4d11-4348-90b8-9c7bf27f9a2e')

ws.on('open', () => {
    ws.send('something')
})

ws.on('message', (data) => {
    console.log(data)
})
ws.on('error', (e) => {
    console.log(e)
})
