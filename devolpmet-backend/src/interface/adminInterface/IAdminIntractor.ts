import { Admin } from "../../domain/entities/admin";

export interface IAdminInteractor{
    login(data:Admin):Promise<any>;
    logout():Promise<Boolean>;
    techDetails():Promise<any>;
    techApproveInteractor(email:string,comment:string|null):Promise<any>
}