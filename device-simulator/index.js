const axios = require('axios');

function repeat() {
  setTimeout(() => {
    axios.post('http://172.25.0.9/http/channels/d3995c05-5c52-47b4-84e4-cc4fd4a33cb1/messages', [{
      bn: 'Test',
      bt: Date.now(),
      bu: 'A',
      bver: 1,
      n: 'voltage',
      u: 'V',
      v: Math.random() * 10,
    }], {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/senml+json',
        Authorization: '9af574d5-4d11-4348-90b8-9c7bf27f9a2e',
      },
    });
    repeat();
  }, 3000)
}

repeat();
