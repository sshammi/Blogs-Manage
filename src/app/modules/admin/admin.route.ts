import express from 'express'
import adminAuth from '../../middlewares/authAdmin';
import { AdminController } from './admin.controller';

const router=express.Router();

router.patch('/users/:userId/block',adminAuth(),AdminController.blockUser);
router.delete('/blogs/:id',adminAuth(),AdminController.deleteBlog);

export const AdminRoutes=router;