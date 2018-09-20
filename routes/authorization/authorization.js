import express from 'express';
import * as Auth from './authorization.controller'

const router = express.Router();

router.get('/signin', Auth.signInPage);
router.post('/signin', Auth.signIn);

router.get('/signup', Auth.signUpPage);
router.post('/signup', Auth.signUp);

router.post('/signout', Auth.signOut);


export default router;