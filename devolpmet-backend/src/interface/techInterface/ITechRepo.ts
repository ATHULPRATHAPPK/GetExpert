
import { Tech } from "../../domain/entities/tech";

export interface ITechRepo{
    registerTech(data:Tech):Promise<any>;
    findTech(email:string):Promise<any>;
}