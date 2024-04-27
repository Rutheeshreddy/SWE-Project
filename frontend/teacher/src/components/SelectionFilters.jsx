import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function SelectionFilters(props){

    
    const handleChange = (e, field) => {
      props.updatefilters({ ...props.filters, [field]: e.target.value });
    }

    const HandleFilters = (filters_) => {

      // console.log(filters_);

      var token = sessionStorage.getItem("token");
      axios.post(import.meta.env.VITE_TEACHER+"available-courses/1", {
          filters : filters_
      },{
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
        }
      }).then( (res) =>{
        if(res.data.status == 1) {
          props.setTotPageNumaval(res.data.totPages)
          props.updatecourselist(res.data.courses)
        }
  
      }).catch((err) => {
  
        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
    }

    return(

        <div className="grid grid-cols-4 justify-between font-semibold items-center mb-1">
                
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={props.filters.courseId}
                    onChange={(e) => handleChange(e, "courseId")}
                  />
                </div>
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={props.filters.courseName}
                    onChange={(e) => handleChange(e, "courseName")}
                  />
                </div>

                <div><button onClick={() => HandleFilters(props.filters)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button></div>
              </div>  
    )
}

export default SelectionFilters