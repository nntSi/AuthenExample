import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Post } from "../../models/Post";
import axiosInstance from "../../services/axiosInstant";
import { postPath } from "../../services/backend_api_path";

export interface postState {
  post_arr: Post[];
}

const initialState: postState = {
  post_arr: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers(builder) {
    builder.addCase(getAllPost.fulfilled, (state, actions) => {
      state.post_arr = actions.payload.body;
    });
  },
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (obj: any) => {
    const formData = new FormData();
    const date = new Date();
    if (obj.file) {
      const file_name = `POST${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}${date.getMinutes()}${date.getMilliseconds()}${obj.img}`;
      formData.append("file", obj.file, file_name);
      formData.append("img", file_name);
    }
    formData.append("user_id", obj.user_id);
    formData.append("content", obj.content);
    const { data } = await axiosInstance.post(postPath.CREATE_POST, formData);
    return data;
  }
);

export const getAllPost = createAsyncThunk("post/getAllPost", async (user_id: string | null) => {
  const {data} = await axiosInstance.get(postPath.GET_ALL + user_id);
  /* console.log(data); */
  return data;
});

// eslint-disable-next-line no-empty-pattern
export const {} = postSlice.actions;
export const postSelector = (store: RootState) => store.post;
export default postSlice.reducer;
