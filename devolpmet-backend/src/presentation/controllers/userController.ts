// src/presentation/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../interface/userInterface/IUserInteractor"; 





export class UserController   {
  private userInteractor : IUserInteractor ;

  constructor(userInteractor:  IUserInteractor) {
    this.userInteractor = userInteractor;
  }

  //==================================user registration===================//
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userInteractor.registerUser(req.body);
      console.log(user);
      
      res.status(201).json("User registration successful. Please verify the OTP sent to your email.");
    } catch (err) {
      next(err);
    }
  }
//=========================================verify otp =================//
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;
    try {
      const result = await this.userInteractor.verifyOTP(email, otp);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
//=========================================user login=================//
async userLogin(req: Request, res: Response, next: NextFunction) {
 console.log("user login...");
 
  const { email, password } = req.body;
  try {
      const result = await this.userInteractor.login(email, password);
      console.log(" result ", result);
      console.log(" result.success");
      
      if (result.success) {
          const { accessToken, refreshToken } = result.tokens;
          res.cookie("accessToken", accessToken, {
              httpOnly: true,
              sameSite: "lax",
              secure: true
          });
          res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "lax",
              secure: true
          });
          return res.status(200).json(result);
      } else {
          return res.status(401).json(result);
      }
  } catch (error) {
      console.error("Error during login:", error);
      next(error);
  }
}

//=========================================user profile=================//
  async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
    const {email} = req.body
    console.log('email',email);
    const result = await this.userInteractor.userProfile(email)
    console.log("result",result);
    if (result.success) {   
      return res.status(200).json(result);
  } else {
      return res.status(401).json(result);
  }
      
    } catch (error) {
      console.error("Error during reaching userprofile", error);
      next(error);
    }
  }

  //=========================================update profile=================//
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("result",req.body);
        const result = await this.userInteractor.updateProfile(req.body);
        // console.log("result",result);
        
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error during reaching userprofile", error);
        next(error);
    }
}

  //=========================================available tech=================//


async serviceRequire(req:Request,res:Response,next:NextFunction){
  try{
  console.log("body",req.body.name);
  const result = await this.userInteractor.services(req.body.name,req.body.email)
  console.log(result,"result");
  if(result){
    return res.status(200).json({status:true,result});
  }else{
    return res.status(401).json({status:false});
  }
} catch (error) {
  console.error("Error during reaching userprofile", error);
  next(error);
}
}

async serviceSelected(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Request body:", req.body);
    const result = await this.userInteractor.findTech(req.body);

    console.log("Available technicians:", result);
    if (result && result.length > 0) {
      return res.status(200).json({ status: true, result });
    } else {
      return res.status(404).json({ status: false, message: "No technicians found." });
    }
  } catch (error) {
    console.error("Error finding technicians:", error);
    next(error);
  }
} 

async servicePayment(req:Request, res:Response, next:NextFunction){

  console.log("reached.. controller",req.body);
  const result = await this.userInteractor.bookingConfirm(req.body.techData,req.body.bookingData);
  if(result.status){

    return res.status(200).json(result);
  }else{
    return res.status(404).json({ status: false, message: "booking failed" });
  }
}

}
