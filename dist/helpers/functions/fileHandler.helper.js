"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const admin = __importStar(require("firebase-admin"));
const serviceAccount = __importStar(require("../config/firebaseKey"));
const BUCKET_URL = "biskato-557d0.appspot.com";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET_URL,
});
const bucket = admin.storage().bucket();
const uploadFile = (req, res, next) => {
    if (!req.file)
        return next();
    const file = req.file; // Use a interface CustomFile
    const nameFile = Date.now() + "." + file.originalname.split(".").pop();
    const file_bucket = bucket.file(nameFile);
    const stream = file_bucket.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });
    stream.on("error", (e) => { });
    stream.on("finish", async () => {
        await file_bucket.makePublic();
        file.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`; // Atualize aqui
        next();
    });
    stream.end(file.buffer);
};
exports.uploadFile = uploadFile;
