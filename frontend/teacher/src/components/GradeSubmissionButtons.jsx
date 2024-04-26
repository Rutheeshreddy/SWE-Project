import React from 'react';

const GradeSubmissionButtons = ({ onManualEntryClick, onFileUpload }) => {
    return (
        <div className="flex justify-center space-x-4 mt-4">
            <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={onManualEntryClick}
            >
                Enter Manually
            </button>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onFileUpload}
            >
                Upload File
            </button>
        </div>
    );
};

export default GradeSubmissionButtons;
