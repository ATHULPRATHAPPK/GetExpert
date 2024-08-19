import { Admin } from "../../domain/entities/admin";

export interface IAdminRepo{
    findAdmin(data:Admin):Promise<Admin | null>;
    logout():Promise<Boolean>;
}