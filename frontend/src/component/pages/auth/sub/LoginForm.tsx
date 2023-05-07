import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserLogin } from "../../../../models/User";
import { useAppDispatch } from "../../../../store/store";
import { setPageSign, singIn } from "../../../../store/slice/authSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const schema = yup
    .object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().min(8, "Password must have at least 8 characters").required("Password is required")
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(schema),
  });
  const handelSignUpBtn = () => {
    dispatch(setPageSign('up'));
  }
  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    dispatch(singIn(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-16 px-20">
        <h1 className="text-center font-bold text-blue-deep text-lg flex justify-center items-center">
          <i className="bx bxs-door-open text-5xl mr-1 text-blue-deep"></i>{" "}
        </h1>
        <h1 className="text-center mt-6 text-3xl font-bold text-blue-deep">
          Postify
        </h1>
        <div className="mt-12">
          <label>
            <p className="text-sm font-semibold">Email Address</p>
            <div className="mt-1 relative">
              <input
                {...register("email")}
                placeholder="Email Address"
                type="text"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-envelope absolute right-3 text-gray-400 top-[9px]"></i>
              {errors.email && (
                <p className="text-xs font-semibold text-rose-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </label>
        </div>
        <div className="mt-4">
          <label>
            <p className="text-sm font-semibold">Password</p>
            <div className="mt-1 relative">
              <input
                {...register("password")}
                placeholder="Password"
                type="Password"
                className="ring-1 bg-gray-50 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600 duration-200 ring-gray-200 shadow w-full"
              />
              <i className="bx bx-lock-alt absolute right-3 text-gray-400 top-[9px]"></i>
              {errors.password && (
                <p className="text-xs font-semibold text-rose-600 mt-1">{errors.password.message}</p>
              )}
            </div>
          </label>
        </div>
        <button type="submit" className="mt-6 w-full bg-gradient-to-r ring-2 ring-azur-l from-azur-l via-azur-m to-azur-r hover:scale-105 duration-200 text-white rounded-md py-2 text-sm font-semibold shadow">
          Sign In
        </button>
        <div className="w-full py-[0.5px] my-8 bg-gray-200"></div>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span onClick={handelSignUpBtn} className="font-semibold text-rose-600 hover:underline duration-200 cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </form>
  );
}
