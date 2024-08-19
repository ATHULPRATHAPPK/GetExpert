import { Admin } from "../../domain/entities/admin";

export interface IAdminInteractor{
    login(data:Admin):Promise<any>;
    logout():Promise<Boolean>;
}