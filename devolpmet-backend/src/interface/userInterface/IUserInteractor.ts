import {User} from "../../domain/entities/userSchema"
import { IuserDocument } from "../../infrastructure/model/userModel"

export interface IUserInteractor{
    registerUser(data: User): Promise<string>;
    verifyOTP(otp: string, email: string): Promise<any>
    login(email: string, password: string): Promise<any>
    userProfile(email:string): Promise<any> 
}