import express from "express";
import { UserRepo } from "../infrastructure/repositories/userRepo";
import { UserInteractor } from "../application/interactor/userInteractor";
import { UserController } from "../presentation/controllers/userController";
import { HashPassword } from "../application/services/bcrypt";
import { JWT } from "../application/services/jwt";
import { EmailService } from "../application/services/mailer";
import { IUserInteractor } from "../interface/userInterface/IUserInteractor";
import validate from "../presentation/middleware/validateReqMiddleware";
import { UserAuthIntractor } from "../application/interactor/userAuthInteractor";
import { userAuthMiddleware } from "../presentation/middleware/userAuthMiddleware";

const router = express.Router();

// Services
const bcrypt = new HashPassword(); // Implements bcryptInterface
const jwtTokens = new JWT(); // Implements jwtInterface
const sendEmail = new EmailService();

// Repositories
const userRepo = new UserRepo();

// Interactors
const userInteractor = new UserInteractor(userRepo, bcrypt, jwtTokens, sendEmail);  // Ensure correct order of parameters

// Controllers
const userController = new UserController(userInteractor);

// Middleware
const userAuthIntractor = new UserAuthIntractor(jwtTokens, userRepo);
const userAuth = new userAuthMiddleware(userAuthIntractor,jwtTokens);

// Routes with Authentication Middleware
router.post('/register', userController.register.bind(userController));
router.post('/otp-verify', userController.verifyOtp.bind(userController));
router.post('/login', userController.userLogin.bind(userController));

// Apply `userAuth.authenticateUser` middleware before accessing the `/profile` route
router.post('/profile', userAuth.authenticateUser.bind(userAuth), userController.userProfile.bind(userController));

export default router;
