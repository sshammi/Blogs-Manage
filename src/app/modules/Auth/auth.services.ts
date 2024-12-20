import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../../config';
import AppError from '../../errors/AppError';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(401, 'Invalid credentials');
  }

  const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  const Token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

  return { Token };
};

export const AuthServices = {
  loginUser,
};
