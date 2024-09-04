import { verify } from "crypto";
import { Admin } from "../../domain/entities/admin";
import { IAdminInteractor } from "../../interface/adminInterface/IAdminIntractor";
import { IAdminRepo } from "../../interface/adminInterface/IAdminRepo";

import { jwtInterface } from "../../interface/serviceInterface/jwtInterface";

export class AdminInteractor implements IAdminInteractor{
    private repository : IAdminRepo;
    private jwt: jwtInterface;

    constructor(repository : IAdminRepo, jwt: jwtInterface,){
        this.repository = repository
        this.jwt = jwt;
    }
   async login(data: Admin): Promise<any> {
        console.log("reached intreactor..");
        
        let admin = await this.repository.findAdmin(data)
        console.log(admin);
        if(!admin){
            return "invalid email or password.."
        }
        const accessToken = this.jwt.generateToken({ id: admin?.email }, '1h'); 
      const refreshToken = this.jwt.generateToken({ id: admin?.email }, '30d'); 
        const tokens = {accessToken,refreshToken}
        
        return {admin,tokens}
    }
    logout(): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }


    async techDetails(): Promise<any> {
        console.log("Reached interactor...");
        
        const techData = await this.repository.techData();
    
        const filteredTechData = techData.map((tech: any) => {
            const { password, __v, ...safeData } = tech.toObject(); // Convert Mongoose document to plain JS object
            return safeData;
        });
    
        return filteredTechData;
    }
    
 async techApproveInteractor(email: string, comment: string | null): Promise<any> {
     console.log("reached interactor..",email,comment);
     const existingTech = await this.repository.techFind(email);
    if (!existingTech) {
      throw new Error("Technician not found.");
    }
     console.log("existingTech",existingTech);
    
    
    if(!comment){
        const Approve = {
            verified:true,
            rejectReson:comment||"",
           documentReject:false
         }
        const updatedTech = await this.repository.updateTech(
            existingTech._id,
            Approve
          );
          console.log("updatedTech",updatedTech);
          return {approve:true}
    }else{
        const reject = {
           rejectReson:comment,
           documentReject:true
         }
         const updatedTech = await this.repository.updateTech(
            existingTech._id,
            reject
          );
          console.log("updatedTech",updatedTech);
          return {approve:false}

    }
     
 }
}