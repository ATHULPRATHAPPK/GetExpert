export class User{
    constructor(
        readonly name: string,
        readonly email: string,
        readonly password: string|null,
        readonly blocked: boolean,
        readonly verified:boolean
    ){}


public static newUser(
        name:string,
        email:string,
        password:string|null,
        blocked:boolean,
        verified:boolean){
        return new User(name,email,password,blocked,verified)
        }
}