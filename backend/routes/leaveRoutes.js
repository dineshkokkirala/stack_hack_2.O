import express from "express";
import { addLeave ,getAllPending,leaveApproval,leaveRejection,get_all_my_leaves,individualLeave} from "../controllers/leaveController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Route   -   /api/leave/addleave
//  Desc    -   Apply Leave
//  Access  -   Private (Employee)
//  Method  -   POST
router.route('/addleave').post(protect,addLeave);

//  Route   -   /api/leave/pending_all
//  Descc   -   Get all pending leaves to admin
//  Access  -   Private (Admin)
//  Method  -   GET
router.route("/pending_all").get(protect,isAdminUser,getAllPending);

//  Route   -   /api/leave/approve/${leaveID}
//  Desc    -   Approving Employee Leave
//  Private -   Private (Admin)
// Method   -   POST
router.route("/approve/:id").post(protect,isAdminUser,leaveApproval)

//  Route   -   /api/leave/reject/${leaveID}
//  Desc    -   Rejecting Employee Leave
//  Private -   Private (Admin)
//  Method  -   POST
router.route("/reject/:id").post(protect,isAdminUser,leaveRejection)

//  Route   -   /api/leave/my_leaves
//  Desc    -   Get all Employee leaves
//  Private -   Private (Employee)
//  Method  -   GET
router.route("/my_leaves").get(protect,get_all_my_leaves)

//  Route   -   /api/leave/${leave_id}
//  Desc    -   Get Leave by ID
//  Private -   Private (Admin)
//  Method  -   GET
router.route("/:id").get(protect,isAdminUser,individualLeave)

export default router;