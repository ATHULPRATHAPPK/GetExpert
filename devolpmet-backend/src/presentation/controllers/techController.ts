import {Request,Response,NextFunction} from "express"
import { ITechInteractor } from "../../interface/techInterface/ITechInteractor"



export class TechConteoller{
    private techInteractor : ITechInteractor;

    constructor(techInteractor:ITechInteractor){
        this.techInteractor = techInteractor
    }

     //==================================tech registration===================//
  async register(req: Request, res: Response, next: NextFunction) {
    console.log("reached here....");
    
    try {
      const tech = await this.techInteractor.registerTech(req.body);
      console.log(tech);
      
      res.status(201).json("User registration successful. Please verify the OTP sent to your email.");
    } catch (err) {
      next(err);
    }
  }
   
  //=========================================verify otp =================//
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;
    try {
      const result = await this.techInteractor.verifyOTP(email, otp);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async techLogin(req: Request, res: Response, next: NextFunction){
 try{
    const { email, password } = req.body;
    const result = await this.techInteractor.login(email, password);
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
  
  

}