import {User} from "../../domain/entities/userSchema"
import { IuserDocument } from "../../infrastructure/model/userModel"
import {UpdateProfileResult} from "../../domain/entities/User"
import { any } from "zod";

export interface IUserInteractor{
    registerUser(data: User): Promise<string>;
    verifyOTP(otp: string, email: string): Promise<any>
    login(email: string, password: string): Promise<any>
    userProfile(email:string): Promise<any> 
    updateProfile(data:User):Promise<UpdateProfileResult>
    services(data:string,email:string):Promise<any>;
    findTech(data:any):Promise<any>
    bookingConfirm(techData:any,bookingData:any):Promise<any>
}