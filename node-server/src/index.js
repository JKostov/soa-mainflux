const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('services/logger');
const apiRouter = require('./routes');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3006);

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.url}`);
    next();
  });
}

app.use('/api', apiRouter);

app.get('/api/things/:id/messages/:channel', async(req, res) => {
  try {
    const { id, channel  } = req.params;

    const response = await axios.get(`http://172.25.0.8:8904/channels/${channel}/messages`, { headers: { Authorization: id } });

    const ws = new WebSocket(`wss://172.25.0.9/ws/channels/${channel}/messages?authorization=${id}`);
    ws.on('message', (data) => {

      const messages = JSON.parse(data).map(m => ({ channel, name: m.bn, protocol: 'http', publisher: '56441bd5-805b-4289-8941-fedd350eb137', time: m.bt, unit: m.u, value: m.v }));
      io.of(`/device/${id}`).emit('message', messages);
    });

    return res.send({
      success: true,
      messages: response.data.messages,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: 'error',
    });
  }
});

/**
 * Exports express
 * @public
 */
module.exports = app;
