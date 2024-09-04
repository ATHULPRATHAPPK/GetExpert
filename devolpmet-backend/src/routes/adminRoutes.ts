import express from "express";
import { AdminRepo } from "../infrastructure/repositories/adminRepo";
import { AdminController } from "../presentation/controllers/adminController";
import { AdminInteractor } from "../application/interactor/adminInteractor";
import { jwtInterface } from "../interface/serviceInterface/jwtInterface";
import { JWT } from "../application/services/jwt";

const adminRouter = express.Router();

// Services
const jwtTokens = new JWT(); 
//userRepo
const adminRepo  = new AdminRepo()

//intractor
const adminInteractor = new AdminInteractor(adminRepo,jwtTokens);

//controllers
const adminController = new AdminController(adminInteractor);

//middleware


//routes 
adminRouter.post('/login',adminController.onLogin.bind(adminController))
adminRouter.get('/tech-data',adminController.techData.bind(adminController))
adminRouter.post('/tech-approve',adminController.techApprove.bind(adminController))
export default adminRouter
