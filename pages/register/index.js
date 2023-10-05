import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { userSuccess, userStart, userFailure } from "/redux/slice/userRedux";
import { useRouter } from "next/router";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { accessTokenMutation } from "../../common/queries/user";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const CompanySignup = ({
  facebookClient,
  facebookUri,
  googleUri,
  googleClient,
}) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters."),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password1: yup
      .string()
      .required("Password is required")
      .min(8)
      .max(32)
      .matches(/[^A-Za-z0-9]/, "Please enter a strong password"),
    password2: yup
      .string()
      .required("Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters")
      .max(32)
      .oneOf([yup.ref("password1"), null], "Confirm passwords must match"),
    tandc: yup.bool().oneOf([true], "You must accept the terms and conditions"),
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
    router.push("/login");
  }

  const onSubmit = (data) => {
    dispatch(userStart());
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/registration/`, {
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
        toast.success(result?.detail);
        reset();
      })
      .catch((err) => dispatch(userFailure(err.message)));
  };
  const handleCallbackResponse = (res) => {
    console.log("JWT :" + res.credential);
    for (const key in res) {
      console.log(res[key]);
    }
  };
  return (
    <div className="container mb-10 md:mb-20 xl:mb-24">
      <h1 className="md:text-xl xl:text-2xl font-medium mt-10 md:mt-20 xl:mt-24 mb-10 xl:mb-16 flex justify-center">
        Create an account
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-8 xl:col-span-4">
          <a
            href={`https://www.facebook.com/v13.0/dialog/oauth?client_id=${facebookClient}&redirect_uri=${facebookUri}&scope=email&response_type=code&state=VhvWZIpwkh26`}
            className="flex justify-center items-center border rounded-[10px] bg-[#3B5998] h-12 xl:h-14 w-full">
            <RiFacebookBoxFill className="text-white font-medium text-2xl mr-2"></RiFacebookBoxFill>
            <span className="text-white text-base font-medium">
              Register with Facebook
            </span>
          </a>
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleUri}&prompt=consent&response_type=code&client_id=${googleClient}&scope=openid%20email%20profile&access_type=offline`}
            className="mt-4 flex justify-center items-center border border-black-light bg-transparent h-12 xl:h-14 w-full rounded-[10px]">
            <FcGoogle className="text-white font-medium text-2xl mr-2"></FcGoogle>
            <span className="text-black text-base font-medium">
              Register with Google
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
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
        <form
          className="col-span-12 md:col-span-8 xl:col-span-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="w-full">
              <label className="label">
                <span className="font-medium text-base mb-0.5">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                {...register("username")}
              />
              <p className="text-red mt-1.5">{errors?.username?.message}</p>
              <p className="text-red mt-1.5">
                {user?.error == 400 &&
                  !errors?.password?.message &&
                  "Username isn't unique "}
              </p>
            </div>
            <div className="form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium text-base mb-0.5">
                  Email address
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                {...register("email")}
              />
              <p className="text-red mt-1.5">{errors?.email?.message}</p>
            </div>
          </div>
          <div>
            <div className="form-control rounded-[10px] w-full ">
              <label className="label">
                <span className="font-medium text-base mb-0.5">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                {...register("password1")}
              />
              <p className="text-red mt-1.5">
                {errors?.password1?.message ==
                "password1 must be at least 8 characters"
                  ? "Password must be 8 characters"
                  : errors?.password1?.message}
              </p>
            </div>
            <div className="form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium text-base mb-0.5">
                  Confirm password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="py-3 xl:py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                {...register("password2")}
              />
              <p className="text-red mt-1.5">{errors?.password2?.message}</p>
            </div>
          </div>
          <div className="flex items-start mt-5 mb-4">
            <input
              type="checkbox"
              name="agree"
              id="remember"
              aria-label="Remember me"
              className="mr-1 rounded-sm mt-1"
              {...register("tandc")}
            />
            <label for="remember" className="text-sm text-gray-deep text-start">
              I hereby agree to the Terms and Conditions and agree to the
              collection, processing and use of my personal data as further
              described in the Privacy Policy
            </label>
          </div>
          <p className="text-red mt-1.5">{errors?.tandc?.message}</p>
          <input
            type="submit"
            value="Register"
            className="flex justify-center btn  items-center mt-9 border rounded-[10px] bg-common text-white hover:bg-common normal-case text-base font-medium h-12 xl:h-14 w-full"
          />
          <div className="col-span-4 mt-6">
            <Link
              href={"/login"}
              className="font-medium text-base text-gray-deep">
              Already signed up?
            </Link>
          </div>
        </form>
        <div className="col-span-12 md:col-span-2 xl:col-span-4"></div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4"></div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
};

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

export default CompanySignup;
