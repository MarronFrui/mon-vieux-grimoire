import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { RequestHandler } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: { userId: string };
  }
}

export const auth: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new TypeError('Error : Forbidden');
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token === undefined) {
      throw new TypeError('Error : token is undefined');
    }
    const decodedToken: JwtPayload | string = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if (typeof decodedToken === 'string') {
      throw new TypeError('Error : Need valid jason web token');
    }
    const userId: string = decodedToken['userId'];
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
