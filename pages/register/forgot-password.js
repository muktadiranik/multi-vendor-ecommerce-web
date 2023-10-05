import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/password/reset/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((result) => {
        toast.success("Please check your email", { toastId: "Go Velo" });
        reset();
      })
      .catch((err) => {
        toast.error("No account found with this email", { toastId: "Go Velo" });
      });
  };

  return (
    <div className="container mb-10 md:mb-20 xl:mb-24">
      <h1 className="md:text-xl xl:text-2xl text-custom-black mt-10 md:mt-20 xl:mt-24 font-medium mb-4 xl:mb-10 text-center">
        Forgot your password?
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-3 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <p className="text-sm text-gray-deep text-center">
            No problem! We'll send you a link to reset it. Enter the email
            address you use to sign in to GoVelo.com
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 xl:col-span-4"></div>
      </div>
      <form
        className="grid grid-cols-12 mt-8 xl:mt-10 mb-[80px]"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-8 xl:col-span-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="font-medium text-base mb-0.5">
                Your Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
              {...register("email")}
            />
            <p className="text-red-500 mt-1.5">{errors?.email?.message}</p>
          </div>
          <button
            className="flex justify-center items-center mt-4 border rounded-[10px] bg-common text-white text-base font-medium h-12 xl:h-14 w-full"
            type="submit">
            Send reset link
          </button>
        </div>
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
      </form>
    </div>
  );
};

export default ForgotPassword;
