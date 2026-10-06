import sharp from 'sharp';
import type { RequestHandler } from 'express';
import fs from 'node:fs';

export const optimizeImage: RequestHandler = async (req, res, next) => {
  if (!req.file) return next();
  const originalPath = req.file.path;
  const newPath = originalPath.replace(/\.[^.]+$/, '.webp');
  sharp(req.file.path)
    .resize({ width: 1280, height: 720 })
    .toFile(`${newPath}`)
    .then((info) => {
      if (!req.file) return next();
      fs.unlink(`${originalPath}`, () => {
        //todo
        console.error;
      });
      console.log(req.file.size, '→', info.size);
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed image conversion' });
    });
};
