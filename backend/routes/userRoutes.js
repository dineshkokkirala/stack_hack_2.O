import express from "express";
import { userLogin, getUserProfile } from "../controllers/userController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Route -  /api/users/login
//  Desc    -   Login as Employee or as Admin
//  Access  -   Public
router.route("/login").post(userLogin);

//  Route   -   /api/users/profile
//  Desc    -   Get a profile of user
//  Access  -   Private (Employee)
router.route("/profile").get(protect, getUserProfile);

export default router;
