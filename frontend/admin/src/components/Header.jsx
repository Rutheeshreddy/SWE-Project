import React from 'react';

const Header = () => {
    const handleClick = () => {
        sessionStorage.setItem("token", "");
        window.location.href = import.meta.env.VITE_LOGIN;
    };

    return (
        <div className="flex justify-end p-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
