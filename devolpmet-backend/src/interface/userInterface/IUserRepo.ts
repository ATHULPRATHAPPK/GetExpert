
import { User } from "../../domain/entities/userSchema";
import { IuserDocument } from "../../infrastructure/model/userModel";
import { LoginResult } from "../../domain/entities/User";


export interface IUserRepo{
    registerUser(data:User):Promise<any>;
    findUser(email :string): Promise<any>;
}