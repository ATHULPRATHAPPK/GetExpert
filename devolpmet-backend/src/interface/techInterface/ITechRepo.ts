
import { Tech } from "../../domain/entities/tech";

export interface ITechRepo{
    registerTech(data:Tech):Promise<any>;
    findTech(email:string):Promise<any>;
    updateTech(id: string, updateData: any): Promise<any>;
    findAvailableTech(data:any):Promise<any>
}