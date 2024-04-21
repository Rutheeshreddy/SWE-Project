import React from "react";

const OpinionButtons = ({ question, onChange }) => {
    return (
        <div className="grid grid-cols-5 gap-3 p-2 items-center">
            {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((option, index) => (
                <div key={index} className="grid grid-cols-2 gap-1 mx-10 items-center">
                    <input type="radio" id={`${option.replaceAll(" ", "")}`}
                           name={question}
                           value={option}
                           onChange={() => onChange(option)}
                           className="w-4 h-4"
                    />
                    <label htmlFor={`${option.replaceAll(" ", "")}`} className="text-sm">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default OpinionButtons;
