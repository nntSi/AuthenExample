export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const authPath = {
  LOGIN: `/login`,
  RESTORELOGIN: `/restore/login`,
};

export const userPath = {
  REGISTER: `/user/create`,
  UPDATE_INFO: `/user/update`,
  STATIC_PROFILE_IMG: `/img/user/profile/`,
  UPDATE_USER_PASSWORD: `/user/update/password`
};

export const postPath = {
  CREATE_POST: `/post/create`,
  GET_ALL: `/post/getall/`,
  STATIC_POST_IMG: `/img/post/`,
};

