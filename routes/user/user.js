import express from 'express';


import * as Auth from '../../helpers/auth';
import * as User from './user.controller';

const router = express.Router();


router.get('/', Auth.isAuthorized, User.page);
router.put('/', Auth.isAuthorized, User.update);
router.post('/img', Auth.isAuthorized, User.updateImg);

export default router;