/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    email: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    first_name: {
      type: 'string'
    },

    last_name: {
      type: 'string'
    },

    avatar: {
      type: 'string',
      defaultsTo: '/avatars/default.png'
    },

    premissions: {
      type: 'string',
      isIn: ['read', 'read-write', 'admin'],
      defaultsTo: 'read-write'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    }

  },

  beforeCreate: function (user, callback) {
    User.findOne({ email: user.email }).exec((err, exists) => {
      if (err || exists) {
        sails.log.debug('User exists');
        return callback('email already taken');
      } else {
        require('machinepack-passwords').encryptPassword({
          password: user.password,
          difficulty: 10,
        }).exec({
          error: (err) => {
            sails.log.error('Error encrypting data: ' + err);
            return callback('Unexpected error occured while encrypting password');
          },
          success: (hash) => {
            user.password = hash;
            return callback();
          },
        });
      }
    });
  },

};