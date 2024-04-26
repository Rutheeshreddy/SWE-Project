import React, { useEffect, useState, useRef } from "react";

function Filters(props){

    
    const handleChange = (e, field) => {
      props.updatefilters({ ...props.filters, [field]: e.target.value });
    }

    const HandleFilters = (filters_) => {

    }

    return(

        <div className="grid grid-cols-6 justify-between font-semibold items-center mb-1">
                
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
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={props.filters.department}
                    onChange={(e) => handleChange(e, "department")}
                  />
                </div><div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={props.filters.semester}
                    onChange={(e) => handleChange(e, "semester")}
                  />
                </div>
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={props.filters.credits}
                    onChange={(e) => handleChange(e, "credits")}
                  />
                </div>
                <div></div>
                <div><button onClick={() => HandleFilters(props.filters)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button></div>
              </div>  
    )
}

export default Filters