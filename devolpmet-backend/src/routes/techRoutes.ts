import express from "express";
import { TechRepo } from "../infrastructure/repositories/techRepo";
import { TechIntractor } from "../application/interactor/techInteractor";

import { HashPassword } from "../application/services/bcrypt";
import { JWT } from "../application/services/jwt";
import { EmailService } from "../application/services/mailer";
import { TechConteoller } from "../presentation/controllers/techController";
import { UserController } from "../presentation/controllers/userController";



const techRouter = express.Router();
//service
const bcrypt = new HashPassword(); 
const jwtTokens = new JWT(); 
const sendEmail = new EmailService();

//repositories
const techRepo = new TechRepo()

//intractor
const techIntractor = new TechIntractor(techRepo,bcrypt,jwtTokens,sendEmail) 


//controllers
const techController = new TechConteoller(techIntractor)


//routes
techRouter.post('/register',techController.register.bind(techController))
techRouter.post('/otp-verify',techController.verifyOtp.bind(techController));
techRouter.post('/login',techController.techLogin.bind(techController))
export default techRouter;