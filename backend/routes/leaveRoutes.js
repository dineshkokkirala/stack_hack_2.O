import express from "express";
import { addLeave } from "../controllers/leaveController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/addleave').post(protect,addLeave);

export default router;
