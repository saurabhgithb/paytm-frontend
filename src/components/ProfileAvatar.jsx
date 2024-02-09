import React from "react";

export const ProfileAvatar = ({ reverse, firstName, lastName }) => {
  return (
    <div
      className={`flex items-center justify-end gap-4 ${
        reverse && "flex-row-reverse"
      }`}
    >
      <h2>{`${firstName || ""} ${lastName || ""}`}</h2>
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 my-1">
        {`${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`}
      </span>
    </div>
  );
};
