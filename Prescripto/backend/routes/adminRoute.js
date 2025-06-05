import express, { Router } from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express(Router())

adminRouter.post("/add-doctor",upload.single('doctorImage'),addDoctor)

export default adminRouter;