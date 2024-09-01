import React, { useState, useEffect } from "react";
import { FaHome, FaUser, FaClipboardList, FaMoneyBill } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import "../../styles/index.css";
import RegistrationForm from "../../components/tech/TechRegistration"; // Import RegistrationForm
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";
import { fetchDashData } from "../../../application/service/technician/techService";

const adminMenuItems = [
  { path: "#", label: "Home", icon: <FaHome /> },
  { path: "#", label: "Profile Management", icon: <FaUser /> },
  { path: "#", label: "Booking Management", icon: <FaClipboardList /> },
  { path: "#", label: "Payment History", icon: <FaMoneyBill /> },
];

const TechDashboard: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [documentSubmited, setDocumentSubmited] = useState<boolean>(false);
  const technicianEmail = useSelector(
    (state: RootState) => state.technician.email
  );
  console.log(technicianEmail);
  const data = { email: technicianEmail };

  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
  };

  useEffect(() => {
    const fetchTechDetails = async () => {
      try {
        const response: any = await fetchDashData(data);
        console.log("Fetched technician details:", response);
        if (response.data.success) {
          const { documentSubmited } = response.data.techData;
          setDocumentSubmited(documentSubmited);
        }
      } catch (error) {
        console.error("Error fetching technician details:", error);
      }
    };

    fetchTechDetails();
  }, [data]);

  const handleSubmitSuccess = () => {
    setShowRegistrationForm(false);
    setSubmissionStatus(
      "Document submitted successfully. Review status is pending."
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        title="Technician"
        menuItems={adminMenuItems}
        className=""
        classElements=""
      />
      <div className="flex-1 p-8 bg-gray-100">
        <h4 className="text-3xl font-extrabold text-gray-500 text-center pb-4">
          Welcome to GetExpert Technician Portal
        </h4>

        {documentSubmited ? (
          <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-2xl mt-10">
            <div className="text-xl text-center font-bold pb-4">
              Your documents have been submitted. Please wait for approval.
              <div className="text-xl text-center font-thin mt-8">
                Our admin team will review your application and notify you upon
                approval.
              </div>
            </div>
          </div>
        ) : !showRegistrationForm ? (
          <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-2xl mt-10">
            <div className="text-xl text-center font-bold pb-4">
              Complete your registration to start receiving service requests
              <div className="text-xl text-center font-thin mt-8">
                Please fill out the following form with your details and upload
                the required documents. Once submitted, our admin team will
                review your application and notify you upon approval.
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleRegistrationClick}
                className="text-orange-600 hover:underline bg-transparent border-none cursor-pointer"
              >
                Click here to complete the registration
              </button>
            </div>
          </div>
        ) : (
          <RegistrationForm onSubmitSuccess={handleSubmitSuccess} />
        )}

        {/* Show submission status message if applicable */}
        {submissionStatus && (
          <div className="text-green-500 mt-6 text-center">
            {submissionStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechDashboard;
