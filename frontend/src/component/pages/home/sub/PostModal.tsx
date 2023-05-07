import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authenSelector } from "../../../../store/slice/authSlice";
import { backendUrl, userPath } from "../../../../services/backend_api_path";
import { useAppDispatch } from "../../../../store/store";
import { Post } from "../../../../models/Post";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPost, getAllPost } from "../../../../store/slice/postSlice";
import SuccessModal from "../../../general/SuccessModal";

interface Props {
  handleClose: any;
}

export default function PostModal({ handleClose }: Props) {
  const dispatch = useAppDispatch();
  const [showScm, setShowScm] = useState(false);
  const user_obj = useSelector(authenSelector).user_obj;
  const { register, handleSubmit, setValue, watch } = useForm<Post>({});
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file!);
    setValue("img", file!.name);
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
  const onSubmit: SubmitHandler<Post> = async (data) => {
    if (!watch("content") || watch("content") === "") {
      return;
    }
    const { payload } = await dispatch(
      createPost({ ...data, file, user_id: user_obj?._id })
    );
    if (!payload.sts) {
      return alert(payload.msg);
    }
    dispatch(getAllPost(localStorage.getItem("user_id")));
    setShowScm(true);
    setTimeout(() => {
      setShowScm(false);
      handleClose();
    }, 1500);
  };
  const user_model = useSelector(authenSelector).user_obj;
  return (
    <div>
      <div
        tabIndex={-1}
        className={`fixed font-noto w-full top-0 left-0 flex justify-center items-center right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-opacity-50 bg-black`}
      >
        <div className="relative w-full h-full max-w-xl md:h-auto">
          <div className="relative bg-white overflow-hidden rounded-xl shadow dark:bg-gray-700">
            <div className="py-2.5 border-b pl-4 pr-2.5 flex items-center text-slate-700 font-semibold">
              <p className="text-mint">Create</p>
              <b className="text-dusk-l ml-1 mr-1">New</b>{" "}
              <p className="text-yellow-ped">Post</p>
              <button
                type="button"
                onClick={() => {
                  handleClose(1);
                }}
                className="ml-auto px-3 py-1.5 rounded-lg hover:bg-gray-100 bg-gray-50 duration-200"
              >
                <i className="bx bx-x-circle text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-4">
                <div className="w-full flex items-center">
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-gray-200 mr-3"
                    src={
                      backendUrl +
                      userPath.STATIC_PROFILE_IMG +
                      user_model?.profile_img
                    }
                  />
                  <p className="text-sm font-semibold text-slate-700">{`${user_model?.firstname} ${user_model?.lastname}`}</p>
                </div>
                <div className="mt-4">
                  <textarea
                    {...register("content")}
                    placeholder="Type something"
                    className="w-full hover:ring-gray-300 duration-200 bg-gray-50 text-sm rounded-md py-2 px-3 h-32 shadow-sm ring-2 ring-gray-200"
                  />
                </div>
                <div className="mt-2 h-56 p-2 rounded-md ring-1 ring-gray-200 shadow-sm overflow-y-scroll ">
                  <label htmlFor="uploadfile">
                    {filePreview === null ? (
                      <div className="p-4 border-2 h-56 items-center text-gray-400 hover:text-gray-700 border-dashed flex justify-center rounded-md bg-gray-50 hover:border-gray-600 duration-200 cursor-pointer">
                        <i className="bx bx-image-add text-3xl"></i>
                      </div>
                    ) : (
                      <div className="p-4 border-2 items-center text-gray-400 hover:text-gray-700 border-dashed rounded-md bg-gray-50 hover:border-gray-600 duration-200 cursor-pointer">
                        <img className="w-full" src={filePreview} />
                      </div>
                    )}
                    <input
                      onChange={handleFileSelect}
                      type="file"
                      id="uploadfile"
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full ${
                    watch("content") ? "" : "grayscale"
                  } mt-4 bg-gradient-to-r ring-2 ring-azur-l from-azur-l via-azur-m to-azur-r hover:scale-[1.01] duration-200 text-white rounded-md py-2 text-sm font-semibold shadow`}
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showScm && <SuccessModal />}
    </div>
  );
}
