import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../../../models/User";
import { useAppDispatch } from "../../../../store/store";
import { passwordRegex } from "../../../../config/regex/password";
import { registerUser, setPageSign } from "../../../../store/slice/authSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SuccessModal from "../../../general/SuccessModal";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .matches(
          passwordRegex,
          "Password must have upper case, lower case, number, and special character"
        )
        .min(8, "Password must have 8 character"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Password not match")
        .required("Confirm Password is requird"),
      firstname: yup.string().required("Firstname is required"),
      lastname: yup.string().required("Lastname is required"),
      profile_img: yup.string().required("Plase upload profile image"),
      date_of_birth: yup.date().required("Date of Birth is required"),
    })
    .required();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
    setValue("profile_img", file!.name);
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFilePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  const [showSuccess, setShowSuccess] = useState(false);
  const onSubmit: SubmitHandler<User> = async (data) => {
    // implement file
    const { payload } = await dispatch(registerUser({ ...data, file }));
    if (!payload.sts) {
      return alert(payload.msg);
    }
    setShowSuccess(true);
    setTimeout(() => {
      dispatch(setPageSign("in"));
      setShowSuccess(false);
    }, 1500);
  };
  const gotoSignIn = () => {
    dispatch(setPageSign("in"));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-10 px-16">
        <label className="" htmlFor="upload">
          <div className="flex justify-center items-center cursor-pointer">
            {filePreview === null ? (
              <div className="w-20 h-20 shadow cursor-pointer border hover:border-gray-500 duration-200 bg-gray-100 flex justify-center items-center rounded-full">
                <i className="bx bxs-camera-plus text-2xl text-gray-700"></i>
              </div>
            ) : (
              <img
                src={filePreview}
                className="w-20 h-20 rounded-full shadow ring-1 ring-gray-300 hover:ring-2 hover:ring-gray-600 duration-200"
              />
            )}
          </div>
          {errors.profile_img && (
            <p className="text-[10px] text-center font-semibold text-rose-600 mt-2">
              {errors.profile_img.message}
            </p>
          )}
          <input
            onChange={handleFileSelect}
            id="upload"
            type="file"
            className="hidden"
          />
        </label>
        <div className="mt-8">
          <label>
            <p className="text-sm font-semibold">Email Address</p>
            <div className="mt-1 relative">
              <input
                {...register("email")}
                /* placeholder="Email Address" */
                type="text"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-envelope absolute right-3 text-gray-400 top-[9px]"></i>
              {errors.email && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <p className="text-sm font-semibold">Password</p>
            <div className="mt-1 relative">
              <input
                {...register("password")}
                /* placeholder="Password" */
                type="Password"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-lock-alt absolute right-3 text-gray-400 top-[9px]"></i>
              {errors.password && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <p className="text-sm font-semibold">Confirm Password</p>
            <div className="mt-1 relative">
              <input
                {...register("confirm_password")}
                type="Password"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-lock-alt absolute right-3 text-gray-400 top-[9px]"></i>
              {errors.confirm_password && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4 lg:gap-6">
          <label>
            <p className="text-sm font-semibold">Firstname</p>
            <div className="mt-1 relative">
              <input
                {...register("firstname")}
                type="text"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              {errors.firstname && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>
          </label>
          <label>
            <p className="text-sm font-semibold">Lastname</p>
            <div className="mt-1 relative">
              <input
                {...register("lastname")}
                /* placeholder="Confirm Passwod" */
                type="text"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              {/* <i className="bx bx-lock-alt absolute right-3 text-gray-400 top-[9px]"></i> */}
              {errors.lastname && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label className="col-span-2">
            <p className="text-sm font-semibold">Date of Birth</p>
            <div className="mt-1 relative">
              <DatePicker
                showDisabledMonthNavigation
                showMonthDropdown
                useShortMonthInDropdown
                showYearDropdown
                yearDropdownItemNumber={40}
                scrollableYearDropdown
                selected={watch("date_of_birth")}
                dateFormat={"dd/MM/yy"}
                onChange={(date) => {
                  setValue("date_of_birth", date);
                }}
                className="ring-1 cursor-pointer bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              {errors.date_of_birth && (
                <p className="text-[10px] font-semibold text-rose-600 mt-1">
                  {errors.date_of_birth.message}
                </p>
              )}
              <i className="bx bx-calendar cursor-pointer absolute right-3 text-gray-400 top-[9px]"></i>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r ring-2 ring-dusk-l from-dusk-l to-dusk-r hover:scale-105 duration-200 text-white rounded-md py-2 text-sm font-semibold shadow"
        >
          Sign Up
        </button>
        <p
          onClick={gotoSignIn}
          className="text-xs text-start w-fit text-rose-500 font-semibold hover:underline cursor-pointer mt-6"
        >
          <i className="bx bx-left-arrow-alt mr-1"></i>Sign In
        </p>
      </div>
      {showSuccess && <SuccessModal />}
    </form>
  );
}
