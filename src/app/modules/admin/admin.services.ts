import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model"; // Assuming the User model exists
import AppError from "../../errors/AppError";
import BlogPost from "../blog/blog.model";

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND,"User not found")
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST,"User is already blocked")
  }

  user.isBlocked = true;
  await user.save();

  return;
};


const deleteBlog = async (blogId: string) => {
    const blog = await BlogPost.findById(blogId);
  
    if (!blog) {
      throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
    }
  
    await BlogPost.findByIdAndDelete(blogId);
  
    return;
  };


export const AdminServices = {
  blockUser,
  deleteBlog,
};
