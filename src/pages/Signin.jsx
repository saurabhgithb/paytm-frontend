import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/auth";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [me, setMe] = useRecoilState(currentUser);

  useEffect(() => {
    if (me) {
      navigate("/dashboard");
    }
    if (!me) {
      navigate("/signin");
    }
  }, [me]);

  async function handleSignin(e) {
    e.preventDefault();
    if (!username || !password || password.length < 6) {
      alert("Empty fields or password length is less than 6 charaters.");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/user/signin`,
      {
        username,
        password,
      }
    );

    alert(response.data.message);
    if (!response.data.token) {
      consol.log;
      return;
    }

    localStorage.setItem("token", response.data.token);
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
    navigate("/dashboard");
  }
  return (
    <div className="min-h-lvh grid place-content-center bg-gray-500">
      <Card>
        <form>
          <section className="text-center">
            <Heading label={"Sign In"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
          </section>
          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label={"Email"}
              type={"email"}
              placeholder={"johndoe@example.com"}
              id={"username"}
            />
          </section>
          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              type={"password"}
              id={"pwd"}
            />
          </section>
          <section className="mt-4 text-center">
            <Button onClick={handleSignin} label={"Sign In"} />
            <BottomWarning
              label={"Don't have an account?"}
              link={"Sign Up"}
              to={"/signup"}
            />
          </section>
        </form>
      </Card>
    </div>
  );
};

export default Signin;
