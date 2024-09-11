import { ITechRepo } from "../../interface/techInterface/ITechRepo";
import { Tech } from "../../domain/entities/tech";
import { techModel } from "../model/techModel";

export class TechRepo implements ITechRepo {
  async registerTech(data: Tech): Promise<any> {
    console.log("user register  repo..", data);
    const newUser = new techModel({
      email: data.email,
      password: data.password,
      userName: data.username,
    });
    await newUser.save();
    return "registration completed";
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

  async findAvailableTech(data: any): Promise<any> {
    try {
      const {
        service,
        category,
        address: { pincode },
      } = data.data;
      console.log("Service:", service);
      console.log("Category:", category);
      console.log("Pincode:", pincode);
      const pipeline = [
        {
          $match: {
            "professionInfo.profession": service.toLowerCase(),
            "professionInfo.subcategories": { $in: [category] },
            "preferredWorkPlace.pincode": pincode,
          },
        },
        {
          $project: {
            _id: 1,
            userName: 1,
            email: 1,
            profilePhotoUrl: "$profilePhotoUrl",
            profession: "$professionInfo.profession",
            subcategories: 1,
            preferredWorkPlace: 1,
          },
        },
      ];
      console.log("Category to match:", category);
      console.log("Pipeline:", pipeline);
      const technicians = await techModel.aggregate(pipeline);
      console.log(technicians,"technicians");
      
      return technicians;
    } catch (error) {
      console.error("Error finding available technicians:", error);
      throw error;
    }
  }



}
