"use client";
import { FieldValue, useForm } from "react-hook-form";
import ErrorInput from "../../../components/ErrorInput";
import { login } from "../../actions";
import swal from "sweetalert";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const error = await login(data);
    if (error) {
      swal(error.error, "click the button", "error");
    }
  });

  return (
    <div className="md:bg-[#c9d6ff] bg-[#fff] md:bg-[linear-gradient(to_right,_#031930,_#D1DDED)] flex items-center justify-center flex-col h-screen">
      <div className="bg-[#fff] md:rounded-[30px] md:[box-shadow:0_5px_15px_rgba(0,_0,_0,_0.35)] relative overflow-hidden w-[768px] max-w-full min-h-[480px] p-5">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold text-center pt-5">{"Login"}</h1>
          <div className="py-16 px-10">
            <div className="mb-5 md:px-10">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                {...register("email", { required: true })}
              />
              {errors["email"] && (
                <ErrorInput message={errors.email.message as string} />
              )}
            </div>
            <div className="md:px-10">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              {errors["password"] && (
                <ErrorInput message={errors.password.message as string} />
              )}
            </div>
            <p className="px-12 pt-2">
              <a href="/forgot-password" className="text-slate-500 underline font-bold">
                {"Forgot password?"}
              </a>
            </p>
          </div>
          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className=" bg-[#4CAF50] w-[35%] text-white text-lg p-2 rounded hover:bg-[#5cd360] ease-in-out transition-all duration-300"
            >
              Submit
            </button>
          </div>
          <div className="text-center flex justify-center gap-2 pb-5">
            <p className="text-slate-600 opacity-65">
              {"Don't have an account?"}
            </p>
            <a href="/register" className="text-[#4CAF50] font-bold">
              {"register"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
