import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const ForgetPass = () => {
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    fetch(`${NEXT_PUBLIC_API_URI}/auth/password/reset/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Please check your email", { toastId: "Go Velo" });
      })
      .catch((err) => {});
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 md:mt-[140px] xl:mt-[100px] text-center">
        <h1 className="text-xl xl:text-2xl font-medium">
          Forgot your password?
        </h1>
        <p className="text-sm font-normal text-[#7F7F7F] mt-4">
          No problem! We’ll send you a link to reset it. Enter the email address
          you use to sign in to GoVelo.com
        </p>
      </div>
      <form
        className="grid grid-cols-12 mt-6 mb-10 md:mb-[80px] xl:mb-[350px] justify-center"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-2 xl:col-span-3"></div>
        <div className="col-span-full md:col-span-8  xl:col-span-6 font-medium">
          <div className="form-control rounded-[10px w-full ">
            <label className="label">
              <span className="font-medium text-base mb-1 mt-8">
                Your Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered placeholder:text-[14px]"
              {...register("email")}
            />
            <p className="text-red-500 mt-1.5">{errors?.email?.message}</p>
          </div>
          <div className="mt-8 flex justify-center border  bg-common h-14 rounded-[10px] mx-auto">
            <button className="text-white text-base font-medium" type="submit">
              Send reset link
            </button>
          </div>
        </div>
        <div className="md:col-span-2 xl:col-span-3"></div>
      </form>
    </div>
  );
};

export default ForgetPass;
