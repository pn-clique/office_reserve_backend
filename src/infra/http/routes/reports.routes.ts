import { Router } from "express";
import {AllReportsController} from "../../controllers";
import { uploadFile } from "../../../helpers";

import multer from "multer";



const router = Router();

router.get("/general-reports/:id", new AllReportsController().handle);

export default router;
