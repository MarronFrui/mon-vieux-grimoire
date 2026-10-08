import sharp from 'sharp';
import type { RequestHandler } from 'express';
import fs from 'node:fs';
import { basename } from 'node:path';

export const optimizeImage: RequestHandler = async (req, res, next) => {
  if (!req.file) return next();
  const originalPath = req.file.path;
  const newPath = originalPath.replace(/\.[^.]+$/, '.webp');
  sharp(req.file.path)
    .resize({ width: 800, height: 1200, fit: 'inside', withoutEnlargement: true })
    .toFile(`${newPath}`)
    .then((info) => {
      if (!req.file) return next();

      fs.unlink(originalPath, (err) => {
        if (err) console.error('unlink failed:', err);
        return;
      });
      console.log(req.file.size, '→', info.size);
      req.file.path = newPath;
      req.file.filename = basename(newPath);

      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed image conversion' });
    });
};
