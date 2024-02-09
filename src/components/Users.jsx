import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { ProfileAvatar } from "./ProfileAvatar";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const me = useRecoilValue(currentUser);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/v1/user/bulk?filter=${filter}`)
      .then((res) => {
        setUsers(res.data.users);
      });
  }, [filter]);

  return (
    <div>
      <h1 className="font-bold text-2xl">Users</h1>
      <section className="mt-2">
        <InputBox
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder={"Search Users..."}
        />
      </section>
      <section className="mt-4">
        {users
          .filter((user) => user._id !== me?.id)
          .map((user) => (
            <div
              key={user._id}
              className="mb-2 flex justify-between items-center"
            >
              <ProfileAvatar
                firstName={user.firstName}
                lastName={user.lastName}
                reverse
              />
              <Button
                onClick={() => {
                  navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}
                label={"Send Money"}
              />
            </div>
          ))}
      </section>
    </div>
  );
};
