import React from "react";

export const InputBox = ({ id, type, placeholder, label, onChange }) => {
  return (
    <>
      {label && (
        <label className="block font-semibold text-black" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="border mt-2 border-gray-400 py-1 px-2 rounded-md w-full"
        type={type || "text"}
        id={id}
        placeholder={placeholder || ""}
        onChange={onChange}
      />
    </>
  );
};
