const { Router } = require('express');
const authRouter = require('./auth');
const thingsRouter = require('./things');

const router = Router();

router.use('/auth', authRouter);
router.use('/things', thingsRouter);

module.exports = router;
