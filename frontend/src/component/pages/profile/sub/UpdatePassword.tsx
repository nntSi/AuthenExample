import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { passwordRegex } from "../../../../config/regex/password";
import SuccessModal from "../../../general/SuccessModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authenSelector, updateUserPassword } from "../../../../store/slice/authSlice";
import { useAppDispatch } from "../../../../store/store";

interface passwordUpd {
  password_new: string;
  password_old: string;
  _id: string;
}

export default function UpdatePassword() {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const user_model = useSelector(authenSelector).user_obj;
  const schema = yup.object().shape({
    password_new: yup
      .string()
      .matches(
        passwordRegex,
        "Password must have upper case, lower case, number, and special character"
      )
      .min(8, "Password must have 8 character").required("New password is required"),
    password_old: yup.string().required("Current Passwod is required"),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordUpd>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<passwordUpd> = async (data) => {
    const {payload} = await dispatch(updateUserPassword({...data, _id: user_model?._id}));
    if(!payload.sts){
      return alert(payload.msg);
    }
    setShowSuccess(true);
    setTimeout(() => {
      reset();
      setShowSuccess(false);
    }, 1500);
  };
  return (
    <div className="">
      <h1 className="font-semibold">Password</h1>
      <p className="text-sm text-gray-600">Edit your password</p>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div>
            <label>
              <p className="text-sm font-semibold">Your current password</p>
              <div className="mt-3 relative">
                <input
                  {...register("password_old")}
                  type="password"
                  className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
                />
                <i className="bx bx-lock absolute right-3 text-gray-400 top-[9px]"></i>
                {errors.password_old && (
                  <p className="text-[10px] font-semibold text-rose-600 mt-1">
                    {errors.password_old.message}
                  </p>
                )}
              </div>
            </label>
          </div>
          <div>
            <label>
              <p className="text-sm font-semibold">New password</p>
              <div className="mt-3 relative">
                <input
                  {...register("password_new")}
                  type="password"
                  className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
                />
                <i className="bx bx-lock absolute right-3 text-gray-400 top-[9px]"></i>
                {errors.password_new && (
                  <p className="text-[10px] font-semibold text-rose-600 mt-1">
                    {errors.password_new.message}
                  </p>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r ring-2 ring-dusk-l from-dusk-l to-dusk-r hover:scale-105 duration-200 text-white rounded-md py-2 text-sm font-semibold shadow"
          >
            Update Your Passwod
          </button>
        </div>
      </form>
      {showSuccess && <SuccessModal/>}
    </div>
  );
}
