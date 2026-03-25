import express from 'express';

import { addEmployee, getEmployees, deleteEmployee } from "../controllers/employeeController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from '../middlewares/auth.js';
import { updateEmployee } from '../controllers/employeeController.js';

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


router.post("/employee/add", isLoggedIn, isAdmin, addEmployee);
router.get("/employees", isLoggedIn, getEmployees);
router.put('/employee/update/:id', isLoggedIn, isAdmin, updateEmployee);
router.delete("/employee/:id", isLoggedIn, isAdmin, deleteEmployee);
export default router;