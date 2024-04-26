import React, { useEffect, useState, useRef } from "react";

function Filters(props){

    const filters = props.filters
    const updatefilters = props.updatefilters
    
    const handleChange = (e, field) => {
      updatefilters({ ...filters, [field]: e.target.value });
    }

    const HandleFilters = (filters_) => {

    }

    return(

        <div className="grid grid-cols-9 justify-between font-semibold items-center mb-1">
                
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
                    value={filters.department}
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
                    value={filters.semester}
                    onChange={(e) => handleChange(e, "semester")}
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
                <div>
                  <input className = "w-24 h-6"
                    type="text"
                    placeholder="Filter..."
                    value={filters.credits}
                    onChange={(e) => handleChange(e, "credits")}
                  />
                </div>
                <div></div>
                <div><button onClick={() => HandleFilters(filters)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button></div>
              </div>  
    )
}

export default Filters