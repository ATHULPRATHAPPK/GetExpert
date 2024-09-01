
import Navbar from '../../components/Navbar';

const BookingConfirmation = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen p-20">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-orange-600 pb-4">
          Booking Confirmation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="md:col-span-2 bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Service Details</h2>
            <div className="flex items-center mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Technician"
                className="w-24 h-24 rounded-full border-4 border-orange-500 mr-6"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Xavior M</h3>
                <p className="text-lg text-gray-600">Electrician</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-inner">
              <div className="text-center">
                <p className="text-gray-600">Service</p>
                <p className="font-semibold text-gray-900">Electrician</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Service Description</p>
                <p className="font-semibold text-gray-900">Residential Wiring</p>
              </div>
            </div>

            {/* Service Location and Reschedule */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-inner">
              <p className="text-gray-700 text-lg mb-4">The technician will arrive on:</p>
              <p className="font-semibold text-gray-900 text-lg mb-6">11:00am on Friday, 23rd May</p>
              <p className="text-gray-700 text-lg mb-4">Service Location:</p>
              <p className="font-semibold text-gray-900">
                Athul pk
                <br />
                Vrindhavanam(h)
                <br />
                Panthalayani, Koyilandy(po)
                <br />
                Pincode: 673305
                <br />
                Kozhikode, Kerala
              </p>
              <button className="mt-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-600 transition duration-300">
                Re-schedule
              </button>
            </div>

            {/* Additional Notes */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-inner">
              <h4 className="font-bold text-gray-900 text-xl mb-4">Additional Notes:</h4>
              <p className="text-gray-700 text-lg">
                The booking charge is a non-refundable fee to secure your appointment. After the technician completes
                the service, the remaining balance will be updated based on the actual work done. You will receive an
                email with the final invoice, and payment will be required to complete the service.
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <p className="text-gray-600">Booking Charge</p>
                <p className="font-bold text-gray-900">125.00 rs</p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="text-gray-600">GST (18%)</p>
                <p className="font-bold text-gray-900">25.00 rs</p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="text-gray-600">Deposit</p>
                <p className="font-bold text-gray-900">0.00 rs</p>
              </div>
              <hr className="my-6 border-gray-300" />
              <div className="flex justify-between text-xl">
                <p className="font-bold text-gray-900">Amount to pay</p>
                <p className="font-bold text-gray-900">150.00 rs</p>
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-600 transition duration-300">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
