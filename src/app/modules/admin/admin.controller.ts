import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User Blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
    const blogId = req.params.id;
  
    const result=await AdminServices.deleteBlog(blogId);
  
    sendResponse(res, {
      success: true,
      message: "Blog deleted successfully",
      statusCode: StatusCodes.OK,
      data:result,
    });
});

export const AdminController = {
  blockUser,
  deleteBlog
};
