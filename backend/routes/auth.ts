import express from 'express';

import * as UserCtrl from '../controllers/UserCtrl.ts';

const router = express.Router();

router.post('/signup', UserCtrl.signup);
router.post('/login', UserCtrl.login);

export default router;
