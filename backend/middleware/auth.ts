import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { RequestHandler } from 'express';

export const auth: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    throw TypeError;
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token === undefined) {
      throw TypeError;
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if (typeof decodedToken === 'string') {
      throw TypeError;
    }
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
