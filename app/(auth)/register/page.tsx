"use client";
import { useForm } from "react-hook-form";
import ErrorInput from "../../../components/ErrorInput";
import { useTransition } from "react";
import { create } from "../../actions";

const page = () => {

  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    startTransition(() => {
      create(data);
    });
  });

  return (
    <div className="md:bg-[#c9d6ff] bg-[#fff] md:bg-[linear-gradient(to_right,_#031930,_#D1DDED)] flex items-center justify-center flex-col h-screen">
      <div className="bg-[#fff] md:rounded-[30px] md:[box-shadow:0_5px_15px_rgba(0,_0,_0,_0.35)]  w-[768px] max-w-full min-h-[480px] p-5 ">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl pt-5 font-bold text-center">{"Register"}</h1>
          <div className="py-16">
            <div className="mb-5 px-10 flex flex-rows gap-5 flex-wrap">
              <div className="flex flex-col grow">
                <label htmlFor="First Name" className="block mb-1 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="First Name"
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                  {...register("First Name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors["First Name"] && (
                  <ErrorInput
                    message={errors["First Name"].message as string}
                  />
                )}
              </div>
              <div className="flex flex-col grow">
                <label htmlFor="Last Name" className="block mb-1 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="Last Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("Last Name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors["Last Name"] && (
                  <ErrorInput message={errors["Last Name"].message as string} />
                )}
              </div>
            </div>
            <div className="flex flex-col mb-5 px-10">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-transparent w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                {...register("email", {
                  required: { value: true, message: "This field is required" },
                })}
              />
              {errors["email"] && (
                <ErrorInput message={errors.email.message as string} />
              )}
            </div>
            <div className="relative mb-5 px-10 flex flex-rows gap-5 flex-wrap">
              <div className="flex flex-col grow">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-transparent w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
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

              <div className="flex flex-col grow">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                  {...register("confirmPassword", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: (value: string) =>
                      value.trim() === getValues("password").trim() ||
                      "The passwords do not match",
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors["confirmPassword"] && (
                  <ErrorInput
                    message={errors.confirmPassword.message as string}
                  />
                )}
              </div>
            </div>
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
            <p className="text-slate-600 opacity-65">{"Do have an account?"}</p>
            <a href="/login" className="text-[#4CAF50] font-bold">
              {"login"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
