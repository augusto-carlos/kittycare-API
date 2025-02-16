const { JWT_SECRET } = require("../config/config");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const MESSAGES = require("../config/messages");
const { oAuth2Client } = require('../config/oauth.config');
const logger = require('../utils/logger.utils');

const oauthController = {
    logout: async (_, res) => {
            res.clearCookie('token');
            res.json({ message: MESSAGES.LOGGED_OUT_SUCCESS });
    },
    signin: async (req, res) => {
        try {
            const { token } = req.body;

            const googleResponse = await oAuth2Client.verifyIdToken({
                idToken: token
            });

            const { name: full_name, email, picture: photo } = googleResponse.getPayload();
            const userToken = jwt.sign({ full_name, email, photo }, JWT_SECRET, { expiresIn: '24h' });

            res.cookie('token', userToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })

            res.json({  message: MESSAGES.LOGGED_IN_SUCCESS, user: { full_name, email, photo } });
        } catch (error) {
            res.status(401).json({ error: MESSAGES.INVALID_TOKEN });
        }
}}

module.exports = oauthController