export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  confirm_password: string;
  firstname: string;
  lastname: string;
  date_of_birth: Date | null;
  profile_img: string;
  token: string;
}
