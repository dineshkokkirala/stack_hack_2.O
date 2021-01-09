import express from "express";
import { addEmploye,displayEmployee,getEmployeeDetails,changePassword } from "../controllers/employeController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/add").post(addEmploye);

router.route("/all").get(protect,isAdminUser,displayEmployee);

router.route("/:id").get(protect,getEmployeeDetails);

router.route("/change/:id").post(protect,changePassword);

export default router;
