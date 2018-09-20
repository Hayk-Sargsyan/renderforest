import express from 'express';

import * as Auth from '../../helpers/auth';
import * as Verification from './verification.controller';

const router  = express.Router();

router.get('/', Auth.isRegistered, Verification.page);
router.post('/', Auth.isRegistered, Verification.answer);
router.get('/question', Auth.isRegistered, Verification.question);

export default router;