const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const loginRequest = require('requests/auth/login');
const validate = require('middleware/validate');
const axios = require('services/axios');
const router = Router();

const loginSuccessful = 'Login successfull.';

router.post('/login', validate(loginRequest), async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post('/tokens', { email, password });

    return res.send({
      success: true,
      message: loginSuccessful,
      token: response.data.token,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/things', async(req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.get('/things', { headers: { Authorization: token } });

    return res.send({
      success: true,
      things: response.data.things,
    });
  } catch (ex) {
    logger.error(ex);
    return res.status(500).send({
      message: responses(500),
    });
  }
});


module.exports = router;
