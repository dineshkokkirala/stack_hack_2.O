import express from "express";
import { userLogin } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(userLogin);

export default router;
