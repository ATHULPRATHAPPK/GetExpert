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
}