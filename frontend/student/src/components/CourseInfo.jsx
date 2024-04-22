import React, { useEffect, useState, useRef } from "react";

function CourseInfo(props){

    const selectedCourseId = props.courseid
    const [showModal, setShowModal] = props.showModal
    const modalRef = props.modalRef

    // const [showModal, setShowModal] = useState(false);
    // const [selectedCourseId, setSelectedCourseId] = useState(null);
    // const modalRef = useRef(null);
  

    useEffect(() => {

        const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
          }
        };
    
        if (showModal) {
          document.addEventListener("mousedown", handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [showModal]);
    

    return(

        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">

          <div ref={modalRef} className="bg-white p-4 rounded-md max-w-md overflow-y-auto">

            <h2 className="text-lg font-semibold mb-2">Course ID: {selectedCourseId}</h2>

            <div className="max-h-48 overflow-y-auto"><p>Course Information Course Information Course Information Course Information Course Information Course Information Course Information Course Information</p></div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
    ) 
}

export default CourseInfo;