import express, { Router } from "express";
import { addDoctor, adminLogin, allDoctors } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express(Router());

adminRouter.post("/add-doctor",authAdmin,upload.single("doctorImage"), addDoctor);
adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/all-doctors",authAdmin,allDoctors);//add authAdmin middleware to authenticate admin to access this api

export default adminRouter;
