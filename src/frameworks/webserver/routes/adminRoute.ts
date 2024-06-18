import { Router } from "express";
import adminController from "../../../adapters/adminController";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { authService } from "../../services/authService";
import { authenticateAdmin } from "../middlewares/authMiddleware";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb } from "../../database/mongodb/repositories/doctorRepositoryMongodb";
import { departmentDbRepository } from "../../../app/interfaces/departmentRepositoryInterface";
import { departmentRepositoryMongodb } from "../../database/mongodb/repositories/departmentRepositoryMongodb";

export default () =>{
    const router = Router();

    const controller = adminController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        departmentDbRepository,
        departmentRepositoryMongodb
    );

    router.post("/login", controller.adminLogin);
    router.get("/users", controller.getAllUser);
    router.get("/doctors", controller.getAllTheDoctors);
    router.patch("/block_user/:id", controller.userBlock);
    router.patch("/block_doctor/:id", controller.doctorBlock);
    router.get("/doctors/:id", controller.doctorDetails);
    router.patch("/verify_doctor/:id", controller.VerifyDoctor);
    router.patch("/verify_doctor_rejection/:id",controller.rejectionDoctor);

    // router.post('/addDepartment', controller.addDepartmentHandler);
    router.get('/department', controller.getAllDepartmentsHandler);
    router.post('/addDepartment', controller.addDepartmentHandler);
    router.get('/department/list', controller.listDepartmentsHandler);
    router.put('/department/:id', controller.updateDepartmentHandler);
    router.patch('/block_department/:id', controller.blockDepartmentHandler);
    router.patch('/unblock_department/:id', controller.unblockDepartmentHandler);

    







    return router;
};