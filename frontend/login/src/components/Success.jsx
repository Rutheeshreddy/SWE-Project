import React, { useEffect, useState } from 'react';


function Success() {


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-green-600 mb-2">Successfully logged in!</p>
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
}

export default Success;
