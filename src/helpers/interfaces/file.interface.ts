export interface CustomFile extends Express.Multer.File {
    firebaseUrl?: string;
  }