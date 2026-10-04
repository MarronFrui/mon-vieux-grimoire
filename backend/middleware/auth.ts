import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: { userId: string };
  }
}

export const auth: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token === undefined) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if (typeof decodedToken === 'string') {
      res.status(401).json({ error: 'Unauthorized' });
      return;
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
