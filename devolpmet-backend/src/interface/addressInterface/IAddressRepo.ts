import { IaddressDocument } from "../../infrastructure/model/addressModel";

export interface IAddressRepo {
    
  addAddress(roleId:string,role:string,data:any):Promise<any>;
  findRoleId(data:string):Promise<any>
  updateAddress(id:string,data:any):Promise<any>
}