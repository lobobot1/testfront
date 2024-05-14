"use client";
import { useForm } from "react-hook-form";
import ErrorInput from "../../../components/ErrorInput";
import { forgotPassword } from "../../actions";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const error = await forgotPassword(data);

    if (error) {
      swal(error.error, "click the button", "error");
    } else {
      swal("Password updated", "click the button", "success").then(() => {
        router.push("/login");
      });
    }
  });

  return (
    <div className="md:bg-[#c9d6ff] bg-[#fff] md:bg-[linear-gradient(to_right,_#031930,_#D1DDED)] flex items-center justify-center flex-col h-screen">
      <div className="bg-[#fff] md:rounded-[30px] md:[box-shadow:0_5px_15px_rgba(0,_0,_0,_0.35)]  w-[768px] max-w-full min-h-[480px] p-5 ">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl pt-5 font-bold capitalize text-center">
            {"Forgot password"}
          </h1>
          <div className="py-16">
            <div className="mb-5 px-10 flex flex-col gap-5 flex-wrap">
              <div className="flex flex-col grow">
                <label htmlFor="Email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors["email"] && (
                  <ErrorInput message={errors["email"].message as string} />
                )}
              </div>
              <div className="flex flex-col grow">
                <label htmlFor="password" className="block mb-1 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors["password"] && (
                  <ErrorInput message={errors["password"].message as string} />
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
        </form>
      </div>
    </div>
  );
};

export default Page;
