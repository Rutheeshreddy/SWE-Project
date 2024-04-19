import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courseregpage(props) {
  const [params, setParams] = useState([]);
  const [totpagenum, setTotPageNum] = useState(1);
  const [regCourses, setRegCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);
  const [curPageNum, setCurPageNum] = useState(1);

  useEffect(() => {
    setRegCourses(props.regCourses);
    setAvalCourses(props.avalCourses);
    setTotPageNum(props.pages);
    setParams(props.params);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl">
        <div className="w-full overflow-y-auto rounded-lg shadow-xs mb-8">
          <table className="w-full whitespace-no-wrap">
            {/* Table header */}
            <caption className="text-lg font-semibold text-center mb-2">Available Courses</caption> {/* Title */}
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3"><h2>Course ID</h2></th>
                <th className="px-4 py-3"><h2>Instructor</h2></th>
                <th className="px-4 py-3"><h2>Semester</h2></th>
                <th className="px-4 py-3"><h2>Elective Type</h2></th>
                <th className="px-4 py-3"><h2>Credits</h2></th>
                <th className="px-4 py-3"><h2>Add Course</h2></th> {/* New column */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Map through the data and create a row for each item */}
              {regCourses.map((course) => (
                <tr key={course.id} className="bg-white divide-y">
                  <td className="px-4 py-3 border-b">{course.Course_ID}</td>
                  <td className="px-4 py-3">{course.Instructor}</td>
                  <td className="px-4 py-3">{course.Semester}</td>
                  <td className="px-4 py-3">{course.Elective}</td>
                  <td className="px-4 py-3">{course.Credits}</td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md">
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full overflow-y-auto rounded-lg shadow-xs">
          <table className="w-full whitespace-no-wrap">
            {/* Table header */}
            <caption className="text-lg font-semibold text-center mb-2">Registered Courses</caption> {/* Title */}
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3"><h2>Course ID</h2></th>
                <th className="px-4 py-3"><h2>Instructor</h2></th>
                <th className="px-4 py-3"><h2>Semester</h2></th>
                <th className="px-4 py-3"><h2>Elective Type</h2></th>
                <th className="px-4 py-3"><h2>Credits</h2></th>
                <th className="px-4 py-3"><h2>Remove Course</h2></th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Map through the data and create a row for each item */}
              {avalCourses.map((course) => (
                <tr key={course.id} className="bg-white divide-y">
                  <td className="px-4 py-3 border-b">{course.Course_ID}</td>
                  <td className="px-4 py-3">{course.Instructor}</td>
                  <td className="px-4 py-3">{course.Semester}</td>
                  <td className="px-4 py-3">{course.Elective}</td>
                  <td className="px-4 py-3">{course.Credits}</td>
                  <td className="px-4 py-3">
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Courseregpage;
