import multer, { FileFilterCallback } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

export const fileUpload = (folderName: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, `src/uploads/${folderName}`);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });
  function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed') as any, false);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};
export const singleFile = (fieldName: string, folderName: string) => {
  return fileUpload(folderName).single(fieldName);
};
export const mixedFiles = (arrayOfFields: multer.Field[], folderName: string) => {
  return fileUpload(folderName).fields(arrayOfFields);
};
