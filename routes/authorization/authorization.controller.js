import * as validation from '../../helpers/validation';
import * as token from '../../helpers/token';
import * as crypto from '../../helpers/crypto';
import User from '../../db/models/user';

const signIn = (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    };

    return User.findOne({ where: { email: credentials.email } }).then(user => {
        if (!user) {
            return res.status(403).send('wrong email address');
        }

        return crypto.comparePass(credentials.password, user.password)
            .then(() => token.createToken(user.id))
            .then(token => {
                res.cookie('jwtToken', token, {maxAge: 2 * 60 * 60 * 1000});

                return res.json({ redirect: '/profile/me' });
            });
    });
};

const signOut = (req, res) => {
    return res.clearCookie('jwtToken').json({ redirect: '../authorization/signin'});
};

const signUp = (req, res) => {
    const errorMessages = [];
    const credentials = {
        email: req.body.email,
        password: req.body.password,
        confirmPass: req.body.confirmPass
    };

    const emailValidationStatus = validation.email(credentials.email);
    const passValidationStatus = validation.password(credentials.password, credentials.confirmPass);

    if (!emailValidationStatus.status) {
        errorMessages.push(emailValidationStatus.message);
    }

    if (!passValidationStatus.status) {
        errorMessages.push(passValidationStatus.message);
    }

    if (errorMessages.length) {
        return res.status(403).send(errorMessages);
    }

    return User.findOne({ where: { email: credentials.email }}).then(user => {
        if (user) {
            return res.status(403).send(['user already exist']);
        }

        User.create({
            email: credentials.email,
            password: credentials.password,
            verified: false
        }).then(user => token.createToken(user.id))
            .then(token => {
                res.cookie('jwtToken' , token, { maxAge: 2 * 60 * 60 * 1000 });

                return res.json({ redirect: '/verification' });
            });
    });
};

const signUpPage = (req, res) => {
    return res.render('signup');
};

const signInPage = (req, res) => {
    return res.render('signin');
};

export {
    signIn,
    signOut,
    signUp,
    signUpPage,
    signInPage
};