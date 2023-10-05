import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const index = () => {
  const { query } = useRouter();

  const router = useRouter();

  const schema = yup.object().shape({
    new_password1: yup
      .string()
      .required("Password is required")
      .min(8)
      .max(100),
    new_password2: yup
      .string()
      .required("Password is required")
      .min(8)
      .max(100),
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
    data = { ...data, uid: query.uid, token: query.token };
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/reset/confirm/${query.uid}/${query.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((result) => {
        toast.success("Password changed successfully", { toastId: "Go Velo" });
        router.push("/login");
      })
      .catch((err) => {});
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 md:mt-[140px] xl:mt-[100px] text-center">
        <h1 className="text-xl xl:text-2xl font-medium">Create new password</h1>
        <p className="text-sm font-normal text-[#7F7F7F] mt-4">
          your new password must be different from previous used passwords.
        </p>
      </div>
      <form
        className="grid grid-cols-12 mt-6 mb-10 md:mb-[80px] xl:mb-[350px] justify-center"
        onSubmit={handleSubmit(onSubmit)}>
        <div className=" md:col-span-2 xl:col-span-3"></div>
        <div className="col-span-full md:col-span-8  xl:col-span-6 font-medium">
          <div className="form-control rounded-[10px w-full ">
            <label className="label">
              <span className="font-medium text-base mb-1 mt-8">
                New Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="py-4 px-6 border border-gray-200 rounded-[10px] placeholder:text-[14px] w-full"
              {...register("new_password1")}
            />
            <p className="text-red-500 mt-1.5">
              {errors?.new_password1?.message}
            </p>
          </div>
          <div className="form-control rounded-[10px w-full ">
            <label className="label">
              <span className="font-medium text-base mb-1 mt-8">
                Re-enter Your New Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Retype new password"
              className="py-4 px-6 border border-gray-200 rounded-[10px] placeholder:text-[14px] w-full"
              {...register("new_password2")}
            />
            <p className="text-red-500 mt-1.5">
              {errors?.new_password2?.message}
            </p>
          </div>
          <div className="mt-8 flex justify-center border  bg-common h-14 rounded-[10px] mx-auto">
            <button className="text-white text-base font-medium" type="submit">
              Change Password
            </button>
          </div>
        </div>
        <div className="md:col-span-2 xl:col-span-3"></div>
      </form>
    </div>
  );
};

export default index;
