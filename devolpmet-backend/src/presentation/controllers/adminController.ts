import { Request,Response,NextFunction } from "express";
import { IAdminInteractor } from "../../interface/adminInterface/IAdminIntractor";

export class AdminController {
    private interactor : IAdminInteractor;
    constructor(interactor:IAdminInteractor){
        this.interactor = interactor;
    }

    async onLogin(req:Request,res:Response,next:NextFunction){
        console.log("reached here...");
        
        try {
            const body = req.body;
            console.log(body);
            const data = await this.interactor.login(body);
            console.log(data,"dta");
            console.log(data,"data");
            
            if(!data.admin){
                return res.status(401).json({
                    authenticated: false,
                    message:"Invalid credentials",
                    data:null
                });
            }
            const { accessToken, refreshToken } = data.tokens;
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
            return res.status(200).json({
                
                success:true,
                authenticated:true,
                message:"Admin logged in successfully",
                data:{
                    email:data.admin.email,
                }
            });
        } catch (error) {
            console.log(error);
            
        }
    }

}