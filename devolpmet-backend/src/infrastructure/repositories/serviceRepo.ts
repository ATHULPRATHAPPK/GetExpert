import { IserviceRepo } from "../../interface/bookingInterface/IserviceRepo";
import { serviceModel } from "../model/serviceModel";

export class ServiceRepo implements IserviceRepo {
  async findService(service: string): Promise<any> {
    try {
      const result = await serviceModel.findOne({ service })
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
