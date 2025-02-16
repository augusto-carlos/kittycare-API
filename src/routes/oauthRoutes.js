const express = require('express');
const router = express.Router();
const { validateOauthSignin } = require('../middlewares/validationMiddleware');
const oauthController = require('../controllers/oauthController');

router.post('/signin', validateOauthSignin, oauthController.signin);
router.post('/logout', oauthController.logout);

module.exports = router;