import { Tech } from "../../domain/entities/tech";
import { ITechDocument } from "../../infrastructure/model/techModel";

export interface ITechInteractor{
    registerTech(data: Tech): Promise<string>;
    verifyOTP(otp: string, email: string): Promise<any>
    login(email: string, password: string): Promise<any>

}