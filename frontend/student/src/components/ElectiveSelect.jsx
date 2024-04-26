import React, { useEffect, useState, useRef } from "react";

function ElectiveSelect(props){

    const selectedCourseId = props.courseid
    const regCourses = props.regCourses
    const avalCourses = props.avalCourses
    const updateReg = props.updateReg
    const updatecourseid = props.updatecourseid
    const updateshowchoice = props.updateshowchoice

    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
      { id: 1, label: 'Department Elective', value: 'Departmental' },
      { id: 2, label: 'Free Elective', value: 'Free' },
      { id: 3, label: 'Additional', value: 'Additional' },
    ];
  
    const handleOptionChange = (value) => {
      setSelectedOption(value);
    };

    const handleDone = () =>{

        if(selectedOption !== null){
    
          const addedCourse = avalCourses.find(course => course.course_id === selectedCourseId);

          const newslot = addedCourse.slot;

          const slotclashing = (regCourses.filter(course => course.slot === newslot)).length
          const courseclashing = (regCourses.filter(course =>course.course_id === selectedCourseId)).length

          if(!slotclashing){

            updateReg([...regCourses, addedCourse]);
            updatecourseid(null)
            updateshowchoice(false)
    
            addedCourse.elective = selectedOption           
          }

          else if(courseclashing){

            alert('You have already registered for this course!')
          
          }

          else if(slotclashing){

            alert('There is a slot clash!')
          }

        }    
    }
    
    const handleCancel = () =>{
    
        updatecourseid(null)
        updateshowchoice(false)  
    }

    return(

        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">

              <div className="bg-white p-4 rounded-md max-w-md overflow-y-auto">

                <h2 className="text-lg font-semibold mb-2">{selectedCourseId} : Choose Elective Type</h2>

                <div className="flex justify-between items-center mb-4">

                  <select className="border rounded-md p-2" onChange={(e) => handleOptionChange(e.target.value)}>

                    <option value="">Select an option</option>
                    {options.map(option => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="space-x-2">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleDone()}>Done</button>
                    <button className="bg-violet-500 text-white px-4 py-2 rounded-md" onClick={() => handleCancel()}>Cancel</button>

                  </div>
                </div>
              </div>
            </div>
    )
}

export default ElectiveSelect;