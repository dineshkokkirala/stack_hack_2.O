import express from "express";
import { addEmploye,displayEmployee } from "../controllers/employeController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/add").post(addEmploye);

router.route("/all").get(protect,isAdminUser,displayEmployee);

export default router;
