import { useSelector } from "react-redux";
import { authenSelector, signOut } from "../../../store/slice/authSlice";
import { backendUrl, userPath } from "../../../services/backend_api_path";
import { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

export default function ButtonProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user_model = useSelector(authenSelector).user_obj;
  const [showDropDown, setShowDropDown] = useState(false);
  const signOutFun = () => {
    setShowDropDown(false);
    dispatch(signOut());
  }
  const gotoProfile = () => {
    navigate('/profile');
  }
  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className="flex items-center space-x-2 hover:bg-azur-m/30 duration-200 p-2 rounded-md"
      >
        <div className="relative">
          <img
            className="w-8 h-8 rounded-full ring-2 ring-gray-200"
            src={
              backendUrl + userPath.STATIC_PROFILE_IMG + user_model?.profile_img
            }
          />
          <div className="p-1 bg-green-400 absolute rounded-full border border-white bottom-0 -right-[2px]"></div>
        </div>
        <p className="text-sm font-semibold lg:block hidden text-white">{`${user_model?.firstname} ${user_model?.lastname}`}</p>
        <i className="bx bx-chevron-down text-white"></i>
      </button>
      {showDropDown && (
        <ul className="w-fit absolute bg-white rounded-lg ring-1 ring-gray-900/5 shadow-sm overflow-hidden">
          <li className="border-b">
            <button onClick={gotoProfile} className="text-sm flex items-center w-full text-start font-semibold py-2 pl-4 pr-24 hover:bg-gray-50">
              <i className="bx bx-cog text-sm mr-2"></i>Edit Profile
            </button>
          </li>
          <li className="border-b">
            <button onClick={signOutFun} className="text-sm flex items-center w-full text-start font-semibold py-2 pl-4 pr-24 hover:bg-gray-50">
              <i className="bx bx-log-out text-sm mr-2"></i>Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
