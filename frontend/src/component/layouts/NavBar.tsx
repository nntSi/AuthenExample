import { useNavigate } from "react-router-dom";
import ButtonProfile from "./sub/ButtonProfile";

export default function NavBar() {
  const navigate = useNavigate()
  return (
    <div className="h-14 shadow-sm top-0 z-50 labtop:px-80 lg:px-60 px-6 bg-modern sticky">
      <div className="flex items-center h-full justify-between">
        <div className="flex items-center text-white">
          <i className="bx bxs-door-open text-3xl text-white mr-1 cursor-pointer"></i>
          <p className="text-sm font-bold text-white mr-3 cursor-pointer">Postify</p>|
          <button onClick={() => {navigate('/home')}} className="text-sm ml-3 hover:scale-[1.05]  font-semibold duration-200 text-white mr-3">Home</button>|
          <button onClick={() => {navigate('/profile')}} className="text-sm ml-3 font-semibold hover:scale-[1.05] duration-200 text-white">Profile</button>
        </div>
        <ButtonProfile/>
      </div>
    </div>
  );
}
