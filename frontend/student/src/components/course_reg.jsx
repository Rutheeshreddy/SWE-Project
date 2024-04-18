import { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
// import { useCookies } from "react-cookie";




function Courseregpage(props)
{

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
const [params,setparams] = useState([]);
const [totpagenum,settotpagenum] = useState(1);
const [posts,setPosts] = useState([]);
const [curpagenum,setCurpagenum] = useState(1);

useEffect(()=>
{
    setPosts(props.posts);
    settotpagenum(props.pages)
    setparams(props.params)
},[])


function handleBack()
{
  
}


function handleNext()
{
  
}

function List({items}){
  // var arr=items.tags.split(/[<\s>]+/);
  // arr=arr.filter(function (el) {
  //   return el != "";
  // })

  // return(
  //   <div>
  //     <h1>Hi</h1>    
  //   </div>
  // )
}




  return (
    <div>
    <h1>HI</h1>
        <div className="w-full overflow-y-auto rounded-lg shadow-xs">
          
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            {/* Table header */}
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3"><h2>Course ID</h2></th>
                <th className="px-4 py-3"><h2>Instructor</h2></th>
                <th className="px-4 py-3"><h2>Credits</h2></th>
                <th className="px-4 py-3"><h2></h2></th>
                <th className="px-4 py-3"><h2>Credits</h2></th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
  {/* Map through the data and create a row for each item */}
  {posts.map((post) => (
    <tr key={post.id} className="bg-white divide-y">
      <td className="px-4 py-3 border-b">
        <Link to={'/posts/' + post.id} className="hover:text-blue-500 truncate" state={{ post: post, Edit_status: params.Edit_status }}>
          {post.title}
        </Link>
      </td>
      <td className="px-4 py-3">{post.ownername}</td>
      <td className="px-4 py-3">
        <List items={post}></List>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
        <div className="flex justify-between w-full"> <button className="border w-24 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleBack}>back</button> Page {curpagenum} of {totpagenum} <button className="border w-24 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleNext}>next</button></div>
      </div>
      </div>
    )
}

export default Courseregpage;

