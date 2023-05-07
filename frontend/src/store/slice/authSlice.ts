import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, UserLogin } from "../../models/User";
import { authPath, userPath } from "../../services/backend_api_path";
import axiosInstance from "../../services/axiosInstant";

export interface authenState {
  user_obj: User | null;
  is_login: boolean;
  is_loading: boolean;
  token: string | null;
  page_sign: string;
}

const initialState: authenState = {
  user_obj: null,
  is_login: false,
  is_loading: false,
  token: null,
  page_sign: "in", // in and up
};

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.is_login = false;
    },
    setPageSign: (state, action: PayloadAction<string>) => {
      state.page_sign = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(singIn.fulfilled, (state, action) => {
      const { token, sts, body } = action.payload;
      state.is_login = sts;
      state.user_obj = body;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", body._id);
    });
    builder.addCase(RestoreLogin.fulfilled, (state, action) => {
      const { token, sts, body } = action.payload;
      state.is_login = sts;
      state.user_obj = body;
      localStorage.setItem("token", token);
    });
  },
});

export const singIn = createAsyncThunk(
  "authen/login",
  async (obj: UserLogin) => {
    const { data } = await axiosInstance.post(authPath.LOGIN, obj);
    return data;
  }
);

export const RestoreLogin = createAsyncThunk(
  "authen/restore/login",
  async () => {
    if (!localStorage.getItem("token")) {
      return { is_login: false };
    }
    const { data } = await axiosInstance.post(authPath.RESTORELOGIN, {
      token: localStorage.getItem("token"),
    });
    return data;
  }
);

export const registerUser = createAsyncThunk(
  "authen/register",
  async (obj: any) => {
    const formData = new FormData();
    const imgname = `${obj.firstname + obj.lastname}.jpg`;
    formData.append("file", obj.file, imgname);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("date_of_birth", obj.date_of_birth);
    formData.append("lastname", obj.lastname);
    formData.append("firstname", obj.firstname);
    formData.append("profile_img", imgname);
    const { data } = await axiosInstance.post(userPath.REGISTER, formData);
    console.log(data);
    return data;
  }
);

export const updateProfileInfo = createAsyncThunk(
  "authen/updateProfileInfo",
  async (obj: any) => {
    const formData = new FormData();
    if (obj.file) {
      formData.append("file", obj.file, obj.profile_img);
    }
    formData.append("_id", obj._id);
    formData.append("firstname", obj.firstname);
    formData.append("lastname", obj.lastname);
    formData.append("date_of_birth", obj.date_of_birth);
    const {data} = await axiosInstance.post(userPath.UPDATE_INFO, formData);
    return data;
  }
);

export const updateUserPassword = createAsyncThunk("authen/updateUserPassword", async (obj: any) => {
  const {data} = await axiosInstance.post(userPath.UPDATE_USER_PASSWORD, obj);
  return data;
})

export const { signOut, setPageSign } = authenSlice.actions;
export const authenSelector = (store: RootState) => store.authen;
export default authenSlice.reducer;
