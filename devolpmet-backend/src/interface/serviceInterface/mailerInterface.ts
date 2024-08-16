export interface IMailer{
    sendEmail(recipient:string,type:string,message:string):Promise<any>;
}