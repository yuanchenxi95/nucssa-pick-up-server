'use strict';

/*
 *  Generic require login routing middleware
 */
const requiresLogin = async function(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    try {
        // req.decodedToken = await usersModule.getMe(token);
        return next();
    } catch (error) {
        return res.status(401).send({ auth: false, message: error.message });
    }
};
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://nucssa.auth0.com/.well-known/jwks.json',
  }),
  // Validate the audience and the issuer.
  audience: 'https://nucssa.pickup.com/api/',
  issuer: 'https://nucssa.auth0.com/',
  algorithms: ['RS256'],
});
module.exports = {
  requiresLogin,
  checkJwt,
};

// module.exports.requiresLogin = function (req, res, next) {
//     let token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(401).send({ auth: false, message: 'No token provided.' });
//     }
//
//     jwt.verify(token, 'Spring is coming', function(err, decoded) {
//         if (err){
//             return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//         }
//
//         return next(decoded)
//     });
// };

// /*
//  *  User authorization routing middleware
//  */
//
// module.exports.user = {
//     hasAuthorization: function (req, res, next) {
//         if (req.profile.id !== req.user.id) {
//             req.flash('info', 'You are not authorized');
//             return res.redirect('/users/' + req.profile.id);
//         }
//         next();
//     },
// };

//
// /*
//  *  Article authorization routing middleware
//  */
//
// module.exports.article = {
//     hasAuthorization: function (req, res, next) {
//         if (req.article.user.id !== req.user.id) {
//             req.flash('info', 'You are not authorized');
//             return res.redirect('/articles/' + req.article.id);
//         }
//         next();
//     },
// };
//
// /**
//  * Comment authorization routing middleware
//  */
//
// module.exports.comment = {
//     hasAuthorization: function (req, res, next) {
//         // if the current user is comment owner or article owner
//         // give them authority to delete
//         if (req.user.id === req.comment.user.id || req.user.id === req.article.user.id) {
//             next();
//         } else {
//             req.flash('info', 'You are not authorized');
//             res.redirect('/articles/' + req.article.id);
//         }
//     },
// };
