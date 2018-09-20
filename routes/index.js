import User from './user/user';
import Auth from './authorization/authorization';
import Verification from  './verification/verification';

export default (app) => {
    app.use('/profile/me', User);
    app.use('/authorization', Auth);
    app.use('/verification', Verification);
};