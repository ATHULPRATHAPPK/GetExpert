import { IAddressRepo } from "../../interface/addressInterface/IAddressRepo";
import { addressModel, IaddressDocument } from "../model/addressModel";

export class AddressRepo implements IAddressRepo {
  // Add a new address (creates a new document)
  async addAddress(roleId: string, role: string, addressData: any): Promise<any> {
    try {
      // Log incoming address data for verification
      console.log("Adding address with data:", addressData);
  
      // Create a new address document
      const newAddress = new addressModel({
        roleId,
        role,
        address: [addressData[0]]  // Address data wrapped in an array
      });
  
      // Save the new address document
      const savedAddress = await newAddress.save();
      console.log("Address added successfully:", savedAddress);
  
      return savedAddress;
    } catch (error) {
      console.error("Error while adding address:", error);
      throw error;
    }
  }
  
  

  // Update an existing address (pushes to the address array)
  async updateAddress(roleId: string, addressData: any): Promise<any> {
    try {
      const updatedAddress = await addressModel.findOneAndUpdate(
        { roleId },
        { $push: { address: addressData } },  // Push new address into the array
        { new: true, upsert: true }  // Create a new document if none exists
      );
      console.log("Address updated successfully", updatedAddress);
      return updatedAddress;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  }

  // Find the document by roleId
  async findRoleId(roleId: string): Promise<any> {
    console.log("roleId",roleId);
    
    try {
      const roleAddress = await addressModel.findOne({ roleId });
      console.log("roleAddress",roleAddress);
      
      return roleAddress?.address;
    } catch (error) {
      console.error("Error finding roleId:", error);
      throw error;
    }
  }
}
