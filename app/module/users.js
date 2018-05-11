'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config');


/**
 * private helper method for verifying token
 * @param token
 * @returns {Promise}
 */
async function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                reject(err);
            }

            resolve(decoded);
        });
    });
}


function generateJwtTokenForUser({_id, email}) {
    return jwt.sign({ id: _id, email: email }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
    });
}

async function verifyMe({ _id }, token) {
    try {
        const decodedToken = await decodeToken(token);
        if (_id === decodedToken.id) {
            return {
                auth: true,
            };
        } else {
            return {
                auth: false,
                message: 'User Id does not match the token User Id',
            }
        }
    } catch(error) {
        return {
            auth: false,
            message: error,
        }
    }
}

async function getMe(token) {
    return await decodeToken(token);
}

module.exports = {
    generateJwtTokenForUser,
    verifyMe,
    getMe,
};
