/* eslint-disable @typescript-eslint/no-namespace */
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from '../utils/appError';
import { prisma } from '../lib/prisma';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in', 401));
    }

    // 2) Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // 3) Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // 4) Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};