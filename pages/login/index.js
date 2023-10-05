import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { userStart, userSuccess, userFailure } from "/redux/slice/userRedux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { accessTokenMutation } from "../../common/queries/user";
import { toast } from "react-toastify";
import { GET_SHOP } from "../../redux/constants/shopConstants";
import { getShopByUserId } from "../../common/queries/shop";
import { client } from "graphql/apolloClient";

const Login = ({ facebookClient, facebookUri, googleUri, googleClient }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const schema = yup.object().shape({
    userNameOrEmail: yup.string().required("Username or email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,

    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [verifyToken, { data, loading, error }] =
    useMutation(accessTokenMutation);

  if (data?.verifyToken?.payload?.user_id) {
    localStorage.setItem("userId", data?.verifyToken?.payload?.user_id);
    dispatch(userSuccess(data.verifyToken.payload.user_id));
    router.push("/");
  }

  const onSubmit = (data) => {
    const emailOruserName = { password: data.password };
    if (
      data.userNameOrEmail.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      )
    ) {
      emailOruserName.email = data.userNameOrEmail;
    } else {
      emailOruserName.username = data.userNameOrEmail;
    }
    dispatch(userStart());
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailOruserName),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((result) => {
        if (result.access_token) {
          localStorage.setItem("access_token", result?.access_token);
          verifyToken({
            variables: {
              token: result.access_token,
            },
          });
          toast.success("Logged In Successfully");
          reset();
        }
      })
      .catch((err) => {
        dispatch(userFailure(err?.message));
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="container mb-10 md:mb-20 xl:mb-24">
      <p className="md:text-xl xl:text-2xl font-medium mt-10 md:mt-20 xl:mt-24 mb-10 xl:mb-16 flex justify-center">
        Sign In
      </p>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-8 xl:col-span-4">
          <a
            href={`https://www.facebook.com/v13.0/dialog/oauth?client_id=${facebookClient}&redirect_uri=${facebookUri}&scope=email&response_type=code&state=VhvWZIpwkh26`}
            className="flex justify-center items-center border rounded-[10px] bg-[#3B5998] h-12 xl:h-14 w-full">
            <RiFacebookBoxFill className="text-white font-medium text-2xl mr-2"></RiFacebookBoxFill>
            <span className="text-white text-base font-medium">
              Continue with Facebook
            </span>
          </a>
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleUri}&prompt=consent&response_type=code&client_id=${googleClient}&scope=openid%20email%20profile&access_type=offline`}
            className="mt-4 flex justify-center items-center border border-black-light bg-transparent h-12 xl:h-14 w-full rounded-[10px]">
            <FcGoogle className="text-white font-medium text-2xl mr-2"></FcGoogle>
            <span className="text-black text-base font-medium">
              Continue with Google
            </span>
          </a>
          <div className="mx-4 md:mx-10">
            <div className="divider mt-5 mb-4">
              <span className="text-[#697883]">or</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
        <form
          className="col-span-12 md:col-span-8 xl:col-span-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label className="label">
              <span className="font-medium text-base mb-0.5">
                Username or email address
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
              {...register("userNameOrEmail")}
            />
            <p className="text-red mt-1.5">
              {errors?.userNameOrEmail?.message}
            </p>
          </div>
          <div className="w-full mt-4">
            <label className="label">
              <span className="font-medium text-base mb-0.5">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="py-3 xl:py-4  px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
              {...register("password")}
            />
            <p className="text-red mt-1.5">{errors?.password?.message}</p>
            <p className="text-red mt-1.5"></p>
          </div>
          <Link
            href="/register/forgot-password"
            className="text-common font-medium text-sm leading-5 mt-4">
            Forgot password?
          </Link>
          <button
            className="flex justify-center items-center mt-9 border rounded-[10px] bg-common text-white text-base font-medium h-12 xl:h-14 w-full"
            type="submit">
            Sign In
          </button>
          <div className="mt-6">
            <p className="font-medium inline-block text-gray-deep">
              {" "}
              Don't have an account?{" "}
            </p>
            <Link href={"/register"} className="text-common">
              <span className="ml-2 font-semibold">Register!</span>
            </Link>
          </div>
        </form>
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
      </div>
    </div>
  );
};

// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: getShopByUserId,
//   });
//   return {
//     props: {
//       shopByUserId: data,
//     },
//   };
// }
export async function getServerSideProps() {
  const facebookClient = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  const facebookUri = process.env.REACT_APP_FACEBOOK_REDIRECT_URI;
  const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const googleUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  return {
    props: {
      facebookClient: facebookClient,
      facebookUri: facebookUri,
      googleClient: googleClient,
      googleUri: googleUri,
    },
  };
}

export default Login;
