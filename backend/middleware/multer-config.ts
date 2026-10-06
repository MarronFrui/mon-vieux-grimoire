import multer from 'multer';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

function isKnownMime(maybeMimeType: string): maybeMimeType is keyof typeof MIME_TYPES {
  return maybeMimeType in MIME_TYPES;
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (_req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    if (!isKnownMime(file.mimetype)) {
      return callback(new Error('Wrong file type'), '');
    }
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

export default multer({ storage }).single('image');
