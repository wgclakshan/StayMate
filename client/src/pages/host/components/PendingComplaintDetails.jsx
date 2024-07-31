import React, { useState, useEffect } from "react";
import PopupForm from "../ResolveComplaintForm"

import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import ComplaintDetails from "../ComplaintDetails";


export default function PendingComplaintDetails({ complaint, id}) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);




  const handleFindTechnician = () => {
    alert("directing t technician explore page ");
    console.log("complaint id is going forward from complaint details to view technicians")
    console.log(`this is the complaint id: ${id}`);
    navigate(`/host/view-technicians?complaintID=${id}`);
  
  };
  const markAsResolved = () => {
    
    navigate(`/host/complaint-details/${id}/resolve`);
  };
  

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div>heyy
        
      </div>
      <div>
        <button
          className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          onClick={handleFindTechnician}
        >
          Assign to Technician
        </button>
        <button
          className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          onClick={() => setShowModal(true)}

        >
          Assign to Technician
        </button>

        <PopupForm
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
