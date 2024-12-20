import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { userCreateValidationSchema } from './user.validation';
import { userController } from './user.controller';
import { AuthValidation } from '../Auth/auth.validation';
import { AuthControllers } from '../Auth/auth.controller';


const router=express.Router();

router.post('/register',validateRequest(userCreateValidationSchema),userController.createUser);
router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)

export const UserRoutes=router;