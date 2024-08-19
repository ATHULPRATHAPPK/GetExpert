
import { Admin } from "../../domain/entities/admin";
import {IAdminInteractor} from "../../interface/adminInterface/IAdminIntractor"
import { IAdminRepo } from "../../interface/adminInterface/IAdminRepo";
import { AdminModel } from "../model/adminModel";

export class AdminRepo implements IAdminRepo {
    async findAdmin(data: Admin): Promise<Admin | null> {
        console.log("reached repo..");
        const adminDoc = await AdminModel.findOne(
            {email:data.email,password:data.password},
            {password:0}
        )
        if(!adminDoc) return null;

        const admin:Admin ={
            email:adminDoc?.email as string,
            password:''
        }
        
        return admin
    }

    logout(): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}