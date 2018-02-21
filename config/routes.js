/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  '/': {
    view: 'pages/homepage',
  },

  '/dashboard': {
    view: 'pages/dashboard',
    policy: 'isLoggedIn'
  },

  '/signin': {
    controller: 'auth',
    action: 'signin'
  },

  '/signup': {
    controller: 'auth',
    action: 'signup'
  },

  '/signout': {
    controller: 'auth',
    action: 'signout',
    policy: 'isLoggedIn'
  },

  'POST /api/auth/session': {
		controller: 'auth',
		action: 'session'
  },


};
