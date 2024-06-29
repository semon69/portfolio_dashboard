/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hook";
import { useLoginMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { TUser, setUser } from "../redux/features/authSlice";
import { verifyToken } from "../utils/verfyToken";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className="md:flex md:justify-evenly items-center bg-gradient-to-br from-[#000428] to-[#01427a]"
    >
      <div>
        <div className="border-2 rounded-lg p-5 shadow-xl m-2 bg-white">
          <p className="text-xl font-bold text-center text-orange-500">
            Login Now
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="font-bold" htmlFor="">
                Email:
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                placeholder="Enter yout Email"
                type="text"
                id="email"
                {...register("email")}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="font-bold" htmlFor="">
                Password:
              </label>
              <input
                className="input input-bordered input-info w-full max-w-xs"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                id="password"
              />
            </div>
            <button
              className="cursor-pointer rounded bg-orange-500 py-2 px-4 text-white font-bold"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
