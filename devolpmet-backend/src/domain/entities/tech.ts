export class Tech{
    constructor(
        public readonly username:string,
        public readonly email: string,
        public readonly password: string, 
        public readonly blocked:boolean,
        public readonly verified:boolean
    ){}

    
public static newTech(
    name:string,
    email:string,
    password:string,
    blocked:boolean,
    verified:boolean){
    return new Tech(name,email,password,blocked,verified)
    }

}
