import { backendUrl, userPath } from "../../../../services/backend_api_path";
import { useSelector } from "react-redux";
import { authenSelector } from "../../../../store/slice/authSlice";
import { useState } from "react";
import PostModal from "./PostModal";

export default function CreatePost() {
  const user_model = useSelector(authenSelector).user_obj;
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div onClick={() => {setShowModal(true)}} className="p-4 ring-1 ring-gray-200 bg-white rounded-xl flex items-center shadow-sm">
        <img
          className="w-8 h-8 rounded-full ring-2 ring-gray-200 mr-4"
          src={
            backendUrl + userPath.STATIC_PROFILE_IMG + user_model?.profile_img
          }
        />
        <input
          placeholder="Type somthing"
          type="text"
          className="bg-gray-100 mr-4 font-normal py-1.5 lg:w-[800px] w-[300px] rounded-md px-3 text-sm rounde-full duration-200 ring-2 ring-gray-200 hover:ring-gray-300 "
        />
        <label className="mr-4 ml-auto" htmlFor="upload_post_img">
          <i className="bx bx-image-alt text-xl bg-gray-50 py-1 px-2 rounded-md ring-2 hover:ring-gray-300 duration-200 cursor-pointer text-azur-l ring-gray-900/5"></i>
        </label>
        <i className="bx bxs-send text-xl text-blue-600 py-1 px-2 hover:bg-slate-100 bg-slate-50 cursor-pointer duration-200 rounded-md"></i>
      </div>
      {showModal && <PostModal handleClose={() => {setShowModal(false)}} />}
    </div>
  );
}
