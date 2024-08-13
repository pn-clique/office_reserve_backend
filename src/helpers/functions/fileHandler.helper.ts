import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import * as serviceAccount from "../config/firebaseKey";
import { CustomFile } from "../interfaces/file.interface";
const BUCKET_URL = "biskato-557d0.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const bucket = admin.storage().bucket();

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();
  const file = req.file as CustomFile; // Use a interface CustomFile
  const nameFile = Date.now() + "." + file.originalname.split(".").pop();
  const file_bucket = bucket.file(nameFile);
  const stream = file_bucket.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });
  stream.on("error", (e) => {});
  stream.on("finish", async () => {
    await file_bucket.makePublic();
    file.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`; // Atualize aqui
    next();
  });
  stream.end(file.buffer);
};

export { uploadFile };
