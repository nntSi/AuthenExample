
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../../models/User";
import { useSelector } from "react-redux";
import { RestoreLogin, authenSelector, updateProfileInfo } from "../../../store/slice/authSlice";
import {
  authPath,
  backendUrl,
  userPath,
} from "../../../services/backend_api_path";
import { useAppDispatch } from "../../../store/store";
import SuccessModal from "../../general/SuccessModal";
import UpdatePassword from "./sub/UpdatePassword";

/* type Props = {}
 */
export default function ProfileEdit() {
  const dispatch = useAppDispatch();
  const user_model = useSelector(authenSelector).user_obj;
  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({});
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
    /* setValue("profile_img", file!.name); */
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
    const { payload } = await dispatch(updateProfileInfo({...data, file}));
    if (!payload.sts) {
      return alert(payload.msg);
    }
    await dispatch(RestoreLogin());
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };
  useEffect(() => {
    reset(user_model!);
  }, [user_model]);

  return (
    <div className="labtop:mx-80 lg:mx-60 h-full border-x border-gray-900/5 shadow-sm bg-white/90">
      <div className="px-8 py-3">
        <span className="text-[10px] pt-0.5 pb-1 px-3 rounded-xl shadow-sm text-white bg-dusk-r">
          Edit Profile
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:px-56 px-10 py-10 border-b">
        <h1 className="font-semibold">Profile</h1>
        <p className="text-sm text-gray-600">Edit your profile</p>
        <div className="mt-8 mb-8">
          <label className="" htmlFor="upload">
            <div className="flex justify-center items-center cursor-pointer">
              {filePreview === null ? (
                <img
                  src={
                    backendUrl +
                    userPath.STATIC_PROFILE_IMG +
                    user_model?.profile_img
                  }
                  className="w-20 h-20 rounded-full shadow ring-1 ring-gray-300 hover:ring-2 hover:ring-gray-600 duration-200"
                />
              ) : (
                <img
                  src={filePreview}
                  className="w-20 h-20 rounded-full shadow ring-1 ring-gray-300 hover:ring-2 hover:ring-gray-600 duration-200"
                />
              )}
            </div>
            <input
              onChange={handleFileSelect}
              id="upload"
              type="file"
              className="hidden"
            />
          </label>
          <label>
            <p className="text-sm font-semibold">Firstname</p>
            <input
              {...register("firstname")}
              type="text"
              className="ring-1 mt-3 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-300 shadow w-full"
            />
          </label>
        </div>
        <div className="mt-8">
          <label>
            <p className="text-sm font-semibold">Lastname</p>
            <input
              {...register("lastname")}
              type="text"
              className="ring-1 mt-3 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-300 shadow w-full"
            />
          </label>
        </div>
        <div className="mt-8">
          <label className="">
            <p className="text-sm font-semibold">Date of Birth</p>
            <div className="mt-1 relative">
              <DatePicker
                showDisabledMonthNavigation
                showMonthDropdown
                useShortMonthInDropdown
                showYearDropdown
                yearDropdownItemNumber={40}
                scrollableYearDropdown
                selected={
                  watch("date_of_birth")
                    ? new Date(watch("date_of_birth")!)
                    : null
                }
                onChange={(date) => {
                  setValue("date_of_birth", date);
                }}
                dateFormat={"dd/MM/yy"}
                className="ring-1 cursor-pointer bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-calendar cursor-pointer absolute right-3 text-gray-400 top-[9px]"></i>
            </div>
          </label>
        </div>
        <div className="flex justify-end mt-6 text-sm font-semibold space-x-4">
          {/* <button className="">Cancel</button> */}
          <button
            type="submit"
            className="px-6 py-2 w-full rounded-md bg-modern text-white shadow-sm hover:scale-105 duration-200"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="lg:px-56 px-10 py-10 ">
        <UpdatePassword/>
      </div>
      {showSuccess && <SuccessModal/>}
    </div>
  );
}
