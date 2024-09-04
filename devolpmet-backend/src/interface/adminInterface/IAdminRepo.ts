import { Admin } from "../../domain/entities/admin";

export interface IAdminRepo{
    findAdmin(data:Admin):Promise<Admin | null>;
    logout():Promise<Boolean>;
    techData():Promise<any>;
    techFind(email:string):Promise<any>
    updateTech(id: string,updateData: any):Promise<any>;
}