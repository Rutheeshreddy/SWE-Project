import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Filters(props){

    const filters = props.filters
    const updatefilters = props.updatefilters
    
    const handleChange = (e, field) => {
      updatefilters({ ...filters, [field]: e.target.value });
    }

    const HandleFilters = () => {

      var token = sessionStorage.getItem("token");
      axios.post(import.meta.env.VITE_STUDENT+"available-courses/" + 1,
      {
        filters:filters
      },{
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          }
      }).then( (res) =>{

        if (res.data.tokenStatus === 0) {
          window.location.href = import.meta.env.VITE_LOGIN
        }
        
        props.settotpagenum(res.data.totPages)
        props.updatecourselist (res.data.courses)
      }).catch((err) => {

        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
    }

    return(

        <div className="grid grid-cols-7 justify-between font-semibold items-center mb-1">
                
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={filters.courseId}
                    onChange={(e) => handleChange(e, "courseId")}
                  />
                </div>
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={filters.courseName}
                    onChange={(e) => handleChange(e, "courseName")}
                  />
                </div>
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={filters.instructor}
                    onChange={(e) => handleChange(e, "instructor")}
                  />
                </div>
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={filters.slot}
                    onChange={(e) => handleChange(e, "slot")}
                  />
                </div>
                <div></div>
                <div></div>
                <div><button onClick={() => HandleFilters()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button></div>
              </div>  
    )
}

export default Filters