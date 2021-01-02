import express from "express";
import { addLeave ,getAllPending,leaveApproval,leaveRejection,get_all_my_leaves} from "../controllers/leaveController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/addleave').post(protect,addLeave);
router.route("/pending_all").get(protect,isAdminUser,getAllPending);
router.route("/approve/:id").post(protect,isAdminUser,leaveApproval)
router.route("/reject/:id").post(protect,isAdminUser,leaveRejection)
// router.route("/my_pending").get(protect,my_leaves_pending)
router.route("/my_leaves").get(protect,get_all_my_leaves)

export default router;
