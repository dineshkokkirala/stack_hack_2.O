import express from "express";
import { addEmploye } from "../controllers/employeController.js";

const router = express.Router();

router.route("/add").post(addEmploye);

export default router;
