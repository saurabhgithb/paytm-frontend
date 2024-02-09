import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1 className="text-sky-500 text-4xl">Welcome to Paytm</h1>
      <Link className="underline ml-2" to={"/signin"}>
        /signin
      </Link>
      <Link className="underline ml-2" to={"/signup"}>
        /signup
      </Link>
    </div>
  );
};

export default Welcome;
