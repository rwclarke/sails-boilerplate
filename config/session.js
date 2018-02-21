/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  secret: '04a6e0806ebe1014f75c80225112d07d',

  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },

  adapter: 'connect-redis',

  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: 0,
  pass: process.env.REDIS_PASS,

};
