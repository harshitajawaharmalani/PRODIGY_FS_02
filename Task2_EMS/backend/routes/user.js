import express from 'express';


import {
  register,
  login,
  logout,
  googleLogin, 
  updateUserDetails
} from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.post('/google-login', googleLogin);
router.put('/update', updateUserDetails);

export default router;