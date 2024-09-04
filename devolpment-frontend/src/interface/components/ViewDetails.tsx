import React, { useState, useEffect } from "react";
import { techApprove } from "../../application/service/admin/adminService";

// (Interfaces remain unchanged)

interface Address {
    place: string;
    city: string;
  }
  
  interface PreferredWorkPlace {
    district: string;
    block: string;
    pincode: string;
  }
  
  interface ProfessionInfo {
    profession: string;
    subcategories: string[];
  }
  
  interface Documents {
    professionalLicenseUrl?: string;
    idProofUrl?: string;
    certificate1Url?: string;
    certificate2Url?: string;
  }
  
  interface Technician {
    email: string;
    profilePhotoUrl?: string;
    userName?: string;
    address?: Address;
    contactNo?: string;
    preferredWorkPlace?: PreferredWorkPlace;
    professionInfo?: ProfessionInfo;
    documents?: Documents;
    verified?: boolean;
    documentReject?: boolean;
    documentSubmited?: boolean;
    workDetails?: string;
  }
  
  interface TechnicianDetailsProps {
    technician: Technician | null;
    onClose: () => void;
  }

const TechnicianDetails: React.FC<TechnicianDetailsProps> = ({
  technician,
  onClose,
}) => {
  if (!technician) return null;

  const {
    email,
    profilePhotoUrl,
    userName,
    address,
    contactNo,
    preferredWorkPlace,
    professionInfo,
    documents,
    verified,
    documentReject,
    documentSubmited,
    workDetails,
  } = technician;

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  useEffect(() => {
    if (documentReject) {
      setApprovalStatus("Rejected");
    } else if (verified) {
      setApprovalStatus("Approved");
    } else {
      setApprovalStatus(null);
    }
  }, [documentReject, verified]);

  const renderDocumentImage = (url: string | undefined, title: string) => (
    <div className="flex flex-col items-center mb-4">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="w-24 h-24 bg-gray-100 flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
            <img src={url} alt={title} className="w-full h-full object-cover" />
          </div>
        </a>
      ) : (
        <div className="w-24 h-24 bg-gray-100 flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
          <p className="text-gray-600 text-sm">No {title} Available</p>
        </div>
      )}
      <p className="mt-2 text-center text-sm text-gray-600">{title}</p>
    </div>
  );

  const handleApprove = async () => {
    try {
      const isApproved = await techApprove(email, null);
      if (isApproved) {
        setApprovalStatus("Approved");
      } else {
        setApprovalStatus("Failed to Approve");
      }
    } catch (error) {
      console.error("Error approving technician:", error);
      setApprovalStatus("Failed to Approve");
    }
  };

  const handleReject = () => {
    setShowCommentBox(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const isRejected = await techApprove(email, comment);
      if (isRejected) {
        setApprovalStatus("Rejected");
      } else {
        setApprovalStatus("Failed to Reject");
      }
    } catch (error) {
      console.error("Error rejecting technician:", error);
      setApprovalStatus("Failed to Reject");
    } finally {
      setShowCommentBox(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-9/12 lg:w-8/12 xl:w-6/12 max-h-screen overflow-y-auto relative">
        <button
          onClick={onClose}
          className="text-gray-600 text-3xl absolute top-4 right-4 hover:text-gray-800"
        >
          &times;
        </button>

        <div className="flex items-center mb-8">
          <img
            src={profilePhotoUrl || "default-profile.png"}
            alt="Technician"
            className="w-32 h-32 rounded-full mr-6 border-4 border-gray-200 shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {userName || "No Name Available"}
            </h2>
            <p className="text-lg text-gray-600">
              {address
                ? `${address.place}, ${address.city}`
                : "No Address Available"}
            </p>
          </div>
        </div>

        <div className="text-gray-600 mb-6">
          <p className="text-lg">
            <strong>Contact Info:</strong> {contactNo || "No Contact Info"}
          </p>
          <p className="text-lg">
            <strong>Preferred Work Place:</strong>{" "}
            {preferredWorkPlace
              ? `${preferredWorkPlace.district}, ${preferredWorkPlace.block}, Pincode: ${preferredWorkPlace.pincode}`
              : "N/A"}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Profession Info:
            </h3>
            <div className="text-gray-600 text-lg">
              {professionInfo?.profession}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-5">
              Specialist:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {professionInfo?.subcategories &&
              professionInfo.subcategories.length > 0 ? (
                professionInfo.subcategories.map(
                  (subcategory: string, index: number) => (
                    <li key={index}>{subcategory}</li>
                  )
                )
              ) : (
                <li>No Subcategories Available</li>
              )}
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              Description about profession:
            </h3>
            <div>{workDetails}</div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Uploaded Documents:
            </h3>
            <div className="flex flex-wrap gap-4">
              {renderDocumentImage(
                documents?.professionalLicenseUrl,
                "Professional License"
              )}
              {renderDocumentImage(documents?.idProofUrl, "ID Proof")}
              {renderDocumentImage(
                documents?.certificate1Url,
                "Certificate 1"
              )}
              {renderDocumentImage(
                documents?.certificate2Url,
                "Certificate 2"
              )}
            </div>
          </div>
        </div>

        {documentSubmited && (
          <div className="mt-6 flex justify-center space-x-4">
            {approvalStatus === "Rejected" ? (
              <p className="text-2xl font-semibold text-red-600">Rejected</p>
            ) : !approvalStatus && !verified && !documentReject ? (
              <>
                <button
                  onClick={handleApprove}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Reject
                </button>
              </>
            ) : (
              approvalStatus && (
                <p
                  className={`text-2xl font-semibold ${
                    approvalStatus === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {approvalStatus}
                </p>
              )
            )}
          </div>
        )}

        {showCommentBox && (
          <div className="mt-6">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              placeholder="Add reason for rejection..."
              className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianDetails;
