import { bcryptInterface } from "../../interface/serviceInterface/bcryptInterface";
import bcrypt from "bcryptjs";

export class HashPassword implements bcryptInterface {
  constructor() {}
  async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      console.log("compairig... here");
      
        return await bcrypt.compare(password,hashedPassword)
    } catch (error) {
        throw error;
    }
    
}
}
