import { User } from "../../domain/entities/userSchema"; // Assuming this is your base User type
import { IUserRepo } from "../../interface/userInterface/IUserRepo";
import { IuserDocument, userModel } from "../model/userModel";

export class UserRepo implements IUserRepo {
  async registerUser(userData: User): Promise<string> {
    console.log("user register  repo..", userData);

    const newUser = new userModel({
      email: userData.email,
      password: userData.password,
      userName: userData.name,
    });
    await newUser.save();
    return "registration completed";
  }

  async findUser(email: string): Promise<IuserDocument | null> {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  async updateUser(data: IuserDocument): Promise<any> {
    try {
      const updatedUser = await data.save();
      console.log("reached repository....", updatedUser);
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }
}
