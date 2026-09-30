import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import type { RequestHandler } from 'express';

export const signup: RequestHandler = (req, res, _next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const login: RequestHandler = (req, res, _next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
