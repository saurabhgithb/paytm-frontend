import React from "react";
import { Link } from "react-router-dom";

export const BottomWarning = ({ label, to, link }) => {
  return (
    <div className="text-sm mt-3">
      {label}
      <span>
        <Link className="underline ml-2" to={to}>
          {link}
        </Link>
      </span>
    </div>
  );
};
