import { useSelector } from "react-redux";
import LoginForm from "./sub/LoginForm";
import { authenSelector } from "../../../store/slice/authSlice";
import RegisterForm from "./sub/RegisterForm";
import { useEffect } from "react";
import axios from "axios";

export default function Login() {
  const page_sign = useSelector(authenSelector).page_sign;
  return (
    <div>
      <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
        <div className=" bg-white rounded-xl w-[500px] h-fit grid-cols-1 shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          {page_sign === "in" && <LoginForm />}
          {page_sign === "up" && <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
