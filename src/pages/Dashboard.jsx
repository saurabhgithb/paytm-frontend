import React, { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();

  const [me, setMe] = useRecoilState(currentUser);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/v1/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMe(res.data.user);
        }
        if (res.status === 403) {
          setMe(null);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/v1/account/balance`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, []);

  useEffect(() => {
    if (me) {
      navigate("/dashboard");
    }
    if (!me) {
      navigate("/signin");
    }
  }, [me]);
  return (
    <>
      <AppBar />
      <section className="mt-8 max-w-6xl mx-auto px-4">
        <div className="my-2">
          <Balance balance={balance} />
        </div>
        <div>
          <Users />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
