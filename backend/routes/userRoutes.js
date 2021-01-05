import express from "express";
import { userLogin, getUserProfile } from "../controllers/userController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(userLogin);
//router.route("/employee/login").post(employeLogin);
router.route("/profile").get(protect, getUserProfile);

export default router;
