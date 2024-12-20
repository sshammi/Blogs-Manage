import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
    const { title, content } = req.body;
  
    const authorId = req.user.id;
  
    const result = await BlogServices.createBlogIntoDB({title,content,author: authorId});
    sendResponse(res, {
        success: true,
        message: 'Blog created succesfully',
        statusCode:StatusCodes.OK,
        data: result,
      });
})

const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await BlogServices.getAllBlogsFromDB(req.query);
    
    sendResponse(res, {
      success: true,
      message: "Blogs fetched successfully",
      statusCode: StatusCodes.OK,
      data: blogs,
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const { title, content } = req.body; 
    
    const result = await BlogServices.updateBlogInDB(id, { title, content });
  
    sendResponse(res, {
      success: true,
      message: 'Blog updated successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  });

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params; 

    const result = await BlogServices.deleteBlogInDB(id);

    sendResponse(res, {
      success: true,
      message: 'Blog deleted successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  });

export const BlogController={
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}