const { Router } = require('express');
const logger = require('services/logger');
const responses = require('services/responses');
const axios = require('services/axios');
const router = Router();

router.get('/', async(req, res) => {
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
