import React from "react";

export const Balance = ({ balance }) => {
  return (
    <div className="font-bold">
      Your Balance <span className="ml-4">Rs {balance}</span>
    </div>
  );
};
