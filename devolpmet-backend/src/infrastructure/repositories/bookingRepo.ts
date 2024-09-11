import { IbookingRepo } from "../../interface/bookingInterface/IbookingRepo";
import { BookingModel } from "../model/bookingModel";
export class BookingRepo implements IbookingRepo{

    async confirmBooking(bookingData: any): Promise<any> {
        try {
            const newBooking = new BookingModel({
                category: bookingData.category,
                service: bookingData.service,
                date: bookingData.date,
                time: bookingData.time,
                address: bookingData.address,
                userEmail: bookingData.userEmail,
                userId: bookingData.userId,
                technicianId: bookingData.technicianId,
                status: "pending" 
            });

            const savedBooking = await newBooking.save();
            
            console.log("Booking saved successfully:", savedBooking);

            return {savedBooking,status:true};
        } catch (error) {
            console.error("Error saving booking:", error);
            throw new Error("Booking confirmation failed");
        }
    }
}