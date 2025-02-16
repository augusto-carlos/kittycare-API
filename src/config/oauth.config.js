const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );


module.exports = { oAuth2Client };