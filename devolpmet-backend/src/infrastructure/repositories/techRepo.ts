import { ITechRepo } from "../../interface/techInterface/ITechRepo";
import { Tech } from "../../domain/entities/tech";
import { techModel } from "../model/techModel";


export class TechRepo implements ITechRepo{

     async registerTech(data: Tech): Promise<any> {
        console.log("user register  repo..", data);
        const newUser = new techModel({
            email: data.email,
            password: data.password,
            userName: data.username,
          });
          await newUser.save();
          return "registration completed"
        }


     async findTech(email: string): Promise<any> {
    try {
        const user = await techModel.findOne({ email });
        return user;
      } catch (error) {
        console.error("Error finding user:", error);
        throw error;
      }
    }

    async updateTech(id: string, updateData: any): Promise<any> {
      return techModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    
      
  }


     
