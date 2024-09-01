import express from "express";
import { TechRepo } from "../infrastructure/repositories/techRepo";
import { TechIntractor } from "../application/interactor/techInteractor";
import multer from "multer"
import { HashPassword } from "../application/services/bcrypt";
import { JWT } from "../application/services/jwt";
import { EmailService } from "../application/services/mailer";
import { TechConteoller } from "../presentation/controllers/techController";
import { Cloudinary } from "../application/services/cloudinary";



const techRouter = express.Router();
//service
const bcrypt = new HashPassword(); 
const jwtTokens = new JWT(); 
const sendEmail = new EmailService();
const cloudinary = new Cloudinary()
const upload = multer({ dest: 'uploads/' })

//repositories
const techRepo = new TechRepo()

//intractor
const techIntractor = new TechIntractor(techRepo,bcrypt,jwtTokens,sendEmail,cloudinary) 


//controllers
const techController = new TechConteoller(techIntractor)


//routes
techRouter.post('/register',techController.register.bind(techController))
techRouter.post('/otp-verify',techController.verifyOtp.bind(techController));
techRouter.post('/login',techController.techLogin.bind(techController))
techRouter.get('/dash-board',techController.techDetails.bind(techController))
techRouter.post('/documents',upload.fields([
    {name:"idProof",maxCount:1},
    {name:"profilePhoto",maxCount:1},
    {name:"professionalLicense",maxCount:1},
    {name:"certificate1",maxCount:1},
    {name:"certificate2",maxCount:1},
]),techController.documentSubmit.bind(techController))

export default techRouter;