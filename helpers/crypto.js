import bcrypt from 'bcrypt';

const hashPass = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                reject(err);
            }

            resolve(hash);
        });
    });
};

const comparePass = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                reject(err);
            }

            resolve(true);
        });
    });
};

export {
    hashPass,
    comparePass
};