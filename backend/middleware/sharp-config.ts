import sharp from 'sharp';
import type { RequestHandler } from 'express';

export const optimizeImage: RequestHandler = async (req, res, next) => {
  if (!req.file) return;
  await sharp(req.file.path)
    .resize({ width: 1280, height: 720 })
    .toFile(`${req.file.path}.${req.file.filename}`)
    .then((info) => {
      if (!req.file) return;
      console.log(req.file.size, '→', info.size);
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed image conversion' });
    });
};
