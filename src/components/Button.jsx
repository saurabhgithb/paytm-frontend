import React from "react";

export const Button = ({ label, color, onClick }) => {
  return (
    <button
      className={`text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
