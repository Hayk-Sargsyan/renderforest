import * as token from './token';
import User from '../db/models/user';

const isRegistered = (req, res, next) => {
    if (!req.cookies.jwtToken) {
        return res.status(403).redirect('/authorization/signin');
    }

    return token.verifyToken(req.cookies.jwtToken)
        .then(decodedToken => User.findById(decodedToken.id))
        .then(user => {
            if (!user) {
                return res.status(403).redirect('/authorization/signin');
            }

            req.user = user;
            next();
        });
};

const isAuthorized = (req, res, next) => {
    if (!req.cookies.jwtToken) {
        return res.status(403).redirect('/authorization/signin');
    }

    return token.verifyToken(req.cookies.jwtToken)
        .then(decodedToken => User.findById(decodedToken.id))
        .then(user => {
            if (!user) {
                return res.status(403).redirect('/authorization/signin');
            }

            if (!user.verified) {
                return res.status(403).redirect('/verification');
            }

            req.user = user;
            next();
        });
};

export {
    isAuthorized,
    isRegistered
}