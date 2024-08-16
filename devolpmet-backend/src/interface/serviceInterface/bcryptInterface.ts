export interface bcryptInterface{
    encryptPassword(password:string):Promise<string>;
    comparePassword(password:string,hashedPassword:string):Promise<boolean>;
}