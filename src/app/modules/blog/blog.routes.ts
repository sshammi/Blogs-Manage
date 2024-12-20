import express from 'express'
import { BlogValidation } from '../blog/blog.validation';
import { BlogController } from '../blog/blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router=express.Router();

router.post('',auth(),validateRequest(BlogValidation.BlogCreateValidationSchema),BlogController.createBlog)
router.patch('/:id',auth(),validateRequest(BlogValidation.BlogUpdateValidationSchema),BlogController.updateBlog)
router.delete('/:id',auth(),BlogController.deleteBlog)
router.get('',BlogController.getAllBlogs)

export const BlogRoutes=router;