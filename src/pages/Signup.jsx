import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { Card } from "../components/Card";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/auth";
import { useEffect } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [me, setMe] = useRecoilState(currentUser);

  useEffect(() => {
    if (me) {
      navigate("/dashboard");
    }
    if (!me) {
      navigate("/signup");
    }
  }, [me]);

  async function handleSignup(e) {
    e.preventDefault();
    if (!password || !username || !firstName || !lastName) {
      alert("All inputs are required");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/user/signup`,
      {
        firstName,
        lastName,
        username,
        password,
      }
    );
    alert(response.data.message);
    if (!response.data.token) {
      return;
    }
    localStorage.setItem("token", response.data.token);
    axios
      .get(`${import.meta.env.VITE_API}/api/v1/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
            <Heading label={"Sign Up"} />
            <SubHeading
              label={"Enter your information to create your account"}
            />
          </section>

          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              id={"firstName"}
              label={"First Name"}
              placeholder={"John"}
            />
          </section>
          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              id={"lastName"}
              label={"Last Name"}
              placeholder={"Doe"}
            />
          </section>
          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id={"username"}
              label={"Email"}
              placeholder={"johndoe@example.com"}
              type={"email"}
            />
          </section>
          <section className="mt-4">
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id={"pwd"}
              label={"Password"}
              placeholder={"min 6 characters long"}
              type={"password"}
            />
          </section>
          <section className="mt-4 text-center">
            <Button onClick={handleSignup} label={"Sign Up"} />
            <BottomWarning
              label={"Already have an account?"}
              link={"Login"}
              to={"/signin"}
            />
          </section>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
