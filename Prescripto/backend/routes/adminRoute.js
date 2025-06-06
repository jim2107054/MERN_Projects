import express, { Router } from "express";
import { addDoctor, adminLogin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express(Router());

adminRouter.post("/add-doctor",authAdmin,upload.single("doctorImage"), addDoctor);
adminRouter.post("/admin-login", adminLogin);

export default adminRouter;
