require('dotenv').config();

const {
  PORT,
  APP_DOMAIN,
  FRONTEND_DOMAIN,
  MAINFLUX_URL,
} = process.env;

const port = PORT || 3000;

module.exports = {
  port,
  mainfluxUrl: MAINFLUX_URL,
  domains: {
    frontend: FRONTEND_DOMAIN,
    api: APP_DOMAIN,
  },
};
