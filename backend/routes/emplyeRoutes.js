import express from "express";
import { addEmploye,displayEmployee,getEmployeeDetails,changePassword } from "../controllers/employeController.js";
import { isAdminUser, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Route   -   /api/admin/add
//  Desc    -   Adding Employee by Admin
//  Access  -   Private (Admin)
//  Method  -   POST
//protect,isAdminUser,
router.route("/add").post(protect,isAdminUser,addEmploye);

//  Route   -   /api/admin/all
//  Desc    -   Get all Employees
//  Access  -   Private (Admin)
//  Method  -   GET
router.route("/all").get(protect,isAdminUser,displayEmployee);

//  Route   -   /api/admin/${employe_id}
//  Desc    -   Get Employee Details
//  Access  -   Private (Employee)
//  Method  -   GET
router.route("/:id").get(protect,getEmployeeDetails);

//  Route   -   /api/admin/change/${employe_id}
//  Desc    -   Change Employe Password
//  Access  -   Private (Employee)
//  Method  -   POST
router.route("/change/:id").post(protect,changePassword);

export default router;
