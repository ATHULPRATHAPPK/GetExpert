import express from "express";
import { UserRepo } from "../infrastructure/repositories/userRepo";
import { AddressRepo } from "../infrastructure/repositories/addressRepo";
import { ServiceRepo } from "../infrastructure/repositories/serviceRepo";
import { TechRepo } from "../infrastructure/repositories/techRepo";
import { BookingRepo } from "../infrastructure/repositories/bookingRepo";
import { UserInteractor } from "../application/interactor/userInteractor";
import { UserController } from "../presentation/controllers/userController";
import { HashPassword } from "../application/services/bcrypt";
import { JWT } from "../application/services/jwt";
import { EmailService } from "../application/services/mailer";
import { UserAuthIntractor } from "../application/interactor/userAuthInteractor";
import { userAuthMiddleware } from "../presentation/middleware/userAuthMiddleware";

const router = express.Router();

// Services
const bcrypt = new HashPassword(); 
const jwtTokens = new JWT(); 
const sendEmail = new EmailService();

// Repositories
const userRepo = new UserRepo();
const serviceRepo = new ServiceRepo();
const addressRepo = new AddressRepo()
const techRepo = new TechRepo();
const bookingRepo = new BookingRepo();
// Interactors
const userInteractor = new UserInteractor(userRepo,serviceRepo,addressRepo,techRepo,bookingRepo, bcrypt, jwtTokens, sendEmail); 

// Controllers
const userController = new UserController(userInteractor);

// Middleware
const userAuthIntractor = new UserAuthIntractor(jwtTokens, userRepo);
const userAuth = new userAuthMiddleware(userAuthIntractor,jwtTokens);

// Routes 
router.post('/register', userController.register.bind(userController));
router.post('/otp-verify', userController.verifyOtp.bind(userController));
router.post('/login', userController.userLogin.bind(userController));


// Apply auth
router.post('/profile', userAuth.authenticateUser.bind(userAuth), userController.userProfile.bind(userController));
router.put('/update-profile',userController.updateProfile.bind(userController))
router.post("/service-required",userController.serviceRequire.bind(userController))
router.post("/service-selection",userController.serviceSelected.bind(userController))
router.post("/booking-payment",userController.servicePayment.bind(userController))

export default router;
