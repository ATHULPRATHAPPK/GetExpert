
import { Admin } from "../../domain/entities/admin";
import {IAdminInteractor} from "../../interface/adminInterface/IAdminIntractor"
import { IAdminRepo } from "../../interface/adminInterface/IAdminRepo";
import { AdminModel } from "../model/adminModel";
import { techModel } from "../model/techModel";

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

    
    async techData(): Promise<any> {
        const data = await techModel.find();
        console.log("data", data);
        return data;
    }

    async techFind(email: string): Promise<any> {
        const data = await techModel.findOne({email:email});
        return data;
       
    }

    async updateTech(id: string, updateData: any): Promise<any> {
        return techModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    
}