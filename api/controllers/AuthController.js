/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  signin: function(req, res) {
    if (req.session.authenticated) {
      return res.redirect('/dashboard');
    } else {
      return res.view('pages/signin'); 
    }
  },

  signup: function(req, res) {
    if (req.session.authenticated) {
      return res.redirect('/dashboard');
    } else {
      return res.view('pages/signup'); 
    }
  },

  session: function(req, res) {
    User.findOne({
      email: req.param('email')
    }).populate('account').exec((err, user) => {
      if (err) return res.serverError(err);
      if (!user) return res.badRequest('Incorrect email / password combination');
      if (!user.active) return res.forbidden();
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: (err) => {
          return res.serverError(err);
        },
        incorrect: () => {
          return res.badRequest('Incorrect email / password combination');
        },
        success: () => {
          req.session.authenticated = true;
          req.session.user = user;
          return res.ok();
        }
      });
    });
  },

  signout: function(req, res) {
    req.session.authenticated = false;
    req.session.destroy(function(err) {
      return res.redirect('/');
    });
  }

};
