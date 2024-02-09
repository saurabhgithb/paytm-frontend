import React, { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { ProfileAvatar } from "./ProfileAvatar";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("name");
  const [balance, setBalance] = useState(0);

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

  async function handleSendMoney(e) {
    e.preventDefault();

    if (amount <= 0) {
      alert("Can't send this much");
      return;
    }
    if (amount > balance) {
      alert("Insufficient Balance");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/account/transfer`,
      {
        to: id,
        amount,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert(response.data.message);
  }

  return (
    <div className="w-96 max-w-[90%] bg-slate-50 rounded-lg p-4 mx-auto">
      <form>
        <section className="text-center mb-8">
          <Heading label={"Send Money"} />
        </section>
        <section>
          <ProfileAvatar firstName={firstName} reverse />
          <InputBox
            label={"Amount (in Rs)"}
            placeholder={"Enter Amount"}
            type={"number"}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </section>
        <section className="mt-4">
          <button
            className={`text-white w-full text-center bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer`}
            onClick={handleSendMoney}
          >
            Initiate Transfer
          </button>
        </section>
      </form>
    </div>
  );
};
