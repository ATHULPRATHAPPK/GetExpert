import {Request,Response,NextFunction} from "express"
import { ITechInteractor } from "../../interface/techInterface/ITechInteractor"
import { TechIntractor } from "../../application/interactor/techInteractor";



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
  


  async  documentSubmit (req: Request, res: Response, next: NextFunction) {
    try {

      const updateResult  =  await this.techInteractor.documentUpdate(req.body,req.files)
      console.log("updateResult",updateResult);

      if(updateResult){
        const updated :boolean= true
        return res.status(200).json(updated);
      }else{
        const updated :boolean= false
        return res.status(401).json(updated);
      }
      
    } catch (error) {
      console.error('Error uploading files:', error);
      next(error);
    }
  };
  
  
 async techDetails(req:Request,res:Response,next:NextFunction){
  try{
    const techDataParams = req.query;
   console.log(techDataParams);
   
    const techData = await this.techInteractor.techData(techDataParams)
    console.log("tech conteoller",techData);
    
    if(techData){
     
      return res.status(200).json({success:true,techData});
    }else{
      
      return res.status(401).json({success:false});
    }
    
  }catch(error){
    console.log(error);
    next(error);
  }
 }

}