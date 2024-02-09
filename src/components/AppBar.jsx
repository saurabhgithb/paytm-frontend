import React from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/auth";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [me, setMe] = useRecoilState(currentUser);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setMe(null);
    navigate("/signin");
  }

  return (
    <div className="shadow-sm max-w-full">
      <div className="flex justify-between items-center bg-white px-4 max-w-6xl mx-auto">
        <div>
          <h1 className="font-semibold text-xl">Paytm App</h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <ProfileAvatar firstName={me?.firstName} lastName={me?.lastName} />
          <Button onClick={handleLogout} label={"Logout"} />
        </div>
      </div>
    </div>
  );
};
