import { Route, Routes, useNavigate} from "react-router-dom";
import Login from "./component/pages/auth/Login";
import { useAppDispatch } from "./store/store";
import { RestoreLogin, authenSelector } from "./store/slice/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "./component/layouts/NavBar";
import Home from "./component/pages/home/Home";
import ProfileEdit from "./component/pages/profile/ProfileEdit";

function App() {
  const dispatch = useAppDispatch();
  const is_login = useSelector(authenSelector).is_login;
  const navigate = useNavigate();
  const checkLogin = async () => {
    const {payload} = await dispatch(RestoreLogin());
    if(payload.sts){
      navigate("/home");
    }else{
      navigate("/");
    }
  }
  useEffect(() => {
    checkLogin();
  }, [is_login])
  
  return (
    <div className="App bg-gradient-to-tr bg-gray-100">
      {is_login && <NavBar/>}
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/profile" element={ <ProfileEdit/> } />
      </Routes>
    </div>
  )
}

export default App
