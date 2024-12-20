import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
        token.split(' ')[1],
        config.jwt_access_secret as string
      ) as JwtPayload;
    
      if (decoded.role !== 'user') {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'Access denied! User only.'
        );
      }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;