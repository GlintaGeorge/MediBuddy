"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const authService_1 = require("../../services/authService");
const userRepositoryMongodb_1 = require("../../database/mongodb/repositories/userRepositoryMongodb");
const authServiceInterface_1 = require("../../../app/service-interface/authServiceInterface");
const userController_1 = __importDefault(require("../../../adapters/userController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const doctorRepositoryMongodb_1 = require("../../database/mongodb/repositories/doctorRepositoryMongodb");
const doctorDBRepository_1 = require("./../../../app/interfaces/doctorDBRepository");
const departmentRepositoryInterface_1 = require("../../../app/interfaces/departmentRepositoryInterface");
const departmentRepositoryMongodb_1 = require("../../database/mongodb/repositories/departmentRepositoryMongodb");
const timeSlotDbRepository_1 = require("../../../app/interfaces/timeSlotDbRepository");
const timeSlotRepositoryMongodb_1 = require("../../database/mongodb/repositories/timeSlotRepositoryMongodb");
const bookingController_1 = __importDefault(require("../../../adapters/bookingController"));
const bookingrepository_1 = require("../../../app/interfaces/bookingrepository");
const bookingRepositoryMongodb_1 = require("../../database/mongodb/repositories/bookingRepositoryMongodb");
const prescriptionDbRepositort_1 = require("../../../app/interfaces/prescriptionDbRepositort");
const prescriptionRepositoryMongodb_1 = require("../../database/mongodb/repositories/prescriptionRepositoryMongodb");
const userRoutes = () => {
    const router = express_1.default.Router();
    const departmentRepo = (0, departmentRepositoryMongodb_1.departmentRepositoryMongodb)();
    const controller = (0, userController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, departmentRepositoryInterface_1.departmentDbRepository, departmentRepo, // Instantiate here
    timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, prescriptionDbRepositort_1.prescriptionDbRepository, prescriptionRepositoryMongodb_1.prescriptionRepositoryMongodb);
    const _bookingController = (0, bookingController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, bookingrepository_1.bookingDbRepository, bookingRepositoryMongodb_1.bookingRepositoryMongodb);
    router.post("/register", controller.registerUser);
    router.post("/google_signIn", controller.googleSignIn);
    router.post("/verify_otp", controller.verifyOtp);
    router.post("/resend_otp", controller.resendOtp);
    router.post("/login", controller.userLogin);
    router.post("/forgot_password", controller.forgotPassword);
    router.post("/reset_password/:token", controller.resetPassword);
    router.get("/profile", authMiddleware_1.default, controller.userProfile);
    router.patch("/profile/edit", authMiddleware_1.default, controller.updateUserInfo);
    router.get("/doctors", controller.doctorPage);
    router.get("/doctors/:id", controller.doctorDetails);
    router.get('/departments', controller.listDepartmentsHandler);
    router.get("/time-slots/:id", authMiddleware_1.default, controller.getTimeslots);
    router.get("/time-slots/:id/dates", authMiddleware_1.default, controller.getDateSlots);
    router.get("/fetchWallet/:id", authMiddleware_1.default, controller.getWallet);
    router.get("/transactions", authMiddleware_1.default, controller.getTransactions);
    router.post("/fetchPrescription", authMiddleware_1.default, controller.fetchPrescription);
    router.post("/downloadPrescription", authMiddleware_1.default, controller.downloadPrescription);
    /*  Booking Routes for booking Controller  */
    router.post("/appointments", authMiddleware_1.default, _bookingController.BookAppoinment);
    router.get("/allAppoinments", authMiddleware_1.default, _bookingController.getAllAppoinments);
    router.patch("/payment/status/:id", authMiddleware_1.default, _bookingController.updatePaymentStatus);
    router.post("/walletPayment", authMiddleware_1.default, _bookingController.walletPayment);
    router.put("/updateWallet", authMiddleware_1.default, _bookingController.changeWalletAmount);
    router.get("/bookingdetails/:id", authMiddleware_1.default, _bookingController.getBookingDetails);
    router.get("/bookings/:id", authMiddleware_1.default, _bookingController.getAllBookingDetails);
    router.put("/bookingdetails/:id", authMiddleware_1.default, _bookingController.cancelAppoinment);
    return router;
};
exports.default = userRoutes;