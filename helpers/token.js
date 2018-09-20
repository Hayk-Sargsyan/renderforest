import jwt from 'jsonwebtoken';

const secret = 'mySecret';

const createToken = userId => {
    return new Promise((resolve, reject) => {
        return jwt.sign({ id: userId }, secret, function(err, token) {
            if (err) {
                reject(err);
            }

            resolve(token);
        });
    });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, function(err, userId) {
            if (err) {
                reject(err);
            }

            resolve(userId);
        });
    });
};

export {
    createToken,
    verifyToken
};