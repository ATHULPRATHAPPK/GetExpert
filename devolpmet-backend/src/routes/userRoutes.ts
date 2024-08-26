import express from "express";
import { UserRepo } from "../infrastructure/repositories/userRepo";
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

// Interactors
const userInteractor = new UserInteractor(userRepo, bcrypt, jwtTokens, sendEmail); 

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

export default router;
