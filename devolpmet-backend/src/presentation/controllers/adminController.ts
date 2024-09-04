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

    async techData(req: Request, res: Response, next: NextFunction) {
        console.log("get method reached here...");
    
        try {
            const allTechData = await this.interactor.techDetails();
    
            // Assuming allTechData is an array of technician objects
            const filteredData = allTechData.map((tech: any) => {
                return {
                    email: tech.email,
                    userName: tech.userName,
                    profilePhotoUrl: tech.profilePhotoUrl,
                    blocked: tech.blocked,
                    verified: tech.verified,
                    documentReject:tech.documentReject,
                    createdAt: tech.createdAt,
                    updatedAt: tech.updatedAt,
                    professionInfo: tech.professionInfo,
                    documents: tech.documents,
                    address: tech.address,
                    preferredWorkPlace: tech.preferredWorkPlace,
                    workDetails: tech.workDetails,
                    documentSubmited:tech.documentSubmited
                };
            });
    
            // Send success response with filtered data
            return res.status(200).json({
                success: true,
                message: "Technician data retrieved successfully",
                data: filteredData
            });
        } catch (error) {
            console.error("Error in techData:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve technician data"
            });
        }
    }
   
    async techApprove(req: Request, res: Response, next: NextFunction){
        console.log("reached controller",req.body);
     const approve =   await this.interactor.techApproveInteractor(req.body.email,req.body.commnet)
      return res.status(200).json({
        approve:approve
      })  
    }

    
}