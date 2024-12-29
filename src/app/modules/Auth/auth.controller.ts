import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
    const {token} = await AuthServices.loginUser(req.body);

    sendResponse(res, {
      statusCode:200,
      success: true,
      message: 'Login succesful',
      data: {
        token
      },
    });

  });

export const AuthControllers={
    loginUser
}