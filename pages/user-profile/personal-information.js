import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import dropIcon from "/public/images/drop.png";
import user from "/public/images/user-big.png";
import AccountSettingLayout from "../../components/AccountSettingLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userSuccess } from "redux/slice/userRedux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userImage, setUserImage] = useState(null);
  const [userCover, setUserCover] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required("First name is required"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .max(13, "Maximum 13 characters"),
    street: yup.string().required("Street number is required").min(1).max(20),
    state: yup.string().required("State is required").min(1).max(20),
    zip_code: yup.string().required("Zipcode is required").min(1).max(20),
    area_code: yup.string().required("Area code is required").min(1).max(20),
    city: yup.string().required("City is required").min(1).max(20),
    country: yup.string().required("Country is required").min(1).max(20),
    user_image: yup.mixed().required("Please upload a profile picture"),
    user_cover: yup.mixed().required("Please upload a cover photo"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userInfo, SetUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const getUserInfo = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/auth/user/`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `JWT ${
                localStorage.getItem("access_token") &&
                localStorage.getItem("access_token")
              }`,
            },
          }
        );
        const data = await res.json();
        SetUserInfo(data);
      };
      getUserInfo();
    } else {
      router.push("/login");
    }
  }, []);

  const onSubmit = (data) => {
    let updatedUserInfo = {
      name: data?.name,
      phone_number: data?.phone_number,
      street: data?.street,
      state: data?.state,
      zip_code: data?.zip_code,
      area_code: data?.area_code,
      city: data?.city,
      country: data?.country,
    };
    if (data?.user_image[0]) {
      if (
        data?.user_image[0].type == "image/jpeg" ||
        data?.user_image[0].type == "image/png" ||
        data?.user_image[0].type == "image/jpg"
      ) {
        updatedUserInfo.user_image = data?.user_image[0];
      } else {
        toast.error("Please select a valid profile photo");
        return;
      }
    } else {
      updatedUserInfo.user_image = "";
    }
    if (data?.user_cover[0]) {
      if (
        data?.user_cover[0].type == "image/jpeg" ||
        data?.user_cover[0].type == "image/png" ||
        data?.user_cover[0].type == "image/jpg"
      ) {
        updatedUserInfo.user_cover = data?.user_cover[0];
      } else {
        toast.error("Please select a valid cover photo");
        return;
      }
    } else {
      updatedUserInfo.user_cover = "";
    }
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URI}/auth/user/`, updatedUserInfo, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(userSuccess(data));
        reset();
        router.push("/user-profile");
      });
  };

  return (
    <AccountSettingLayout>
      <div className="mb-24">
        {/* {userPreview && (
          <img src={userPreview} alt="" width="200px" height="200px" />
        )}
        <form action="">
          <input
            type="file"
            name="userImage"
            className=""
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setUserImage(file);
              } else {
                setUserImage(null);
              }
            }}
          />
        </form> */}
        <form
          className="mt-4"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data">
          <div className="border border-[#E2E2E2] rounded-xl mt-4  px-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-6">
                <h3 className="font-medium  mt-4 mb-1 ">Profile Picture</h3>
                <label>
                  <div className=" p-4 transition bg-white border border-[#E2E2E2] rounded-md appearance-none cursor-pointer">
                    <div className="py-4">
                      {userInfo && userInfo?.user_image && !userImage ? (
                        <img
                          className="w-[80px] h-[80px] object-cover rounded-full"
                          src={userInfo?.user_image}
                          alt=""
                        />
                      ) : userImage ? (
                        <img
                          className="w-[80px] h-[80px] object-cover rounded-full"
                          src={userImage}
                          alt=""
                        />
                      ) : (
                        <Image src={user} alt="profile" />
                      )}
                    </div>

                    <p className="text-[#7F7F7F] text-sm">
                      Please upload only formats as jpg, jpeg, png.
                    </p>
                    <input
                      type="file"
                      name="user_image"
                      className="hidden"
                      {...register("user_image", {
                        onChange: (e) => {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setUserImage(url);
                        },
                      })}
                    />
                    <p className="text-red mt-1.5">
                      {errors?.user_image?.message}
                    </p>
                  </div>
                </label>
              </div>
              <div className="col-span-12 xl:col-span-6">
                <h3 className="font-medium mt-4 mb-1">Cover Photo</h3>
                <label>
                  <div className="p-4 transition bg-white border border-[#E2E2E2] rounded-md appearance-none cursor-pointer">
                    <div className="py-4">
                      {userInfo && userInfo?.user_cover && !userCover ? (
                        <img
                          className="w-[421px] h-[80px] object-cover"
                          src={userInfo?.user_cover}
                          alt="cover"
                        />
                      ) : userCover ? (
                        <img
                          className="w-[421px] h-[80px] object-cover"
                          src={userCover}
                          alt="cover"
                        />
                      ) : (
                        <Image className="" src={dropIcon} alt="cover"></Image>
                      )}
                    </div>
                    <p className="text-[#7F7F7F] text-sm">
                      Please upload only formats as jpg, jpeg, png.
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      name="user_cover"
                      {...register("user_cover", {
                        onChange: (e) => {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setUserCover(url);
                        },
                      })}
                    />
                    <p className="text-red mt-1.5">
                      {errors?.user_cover?.message}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  defaultValue={userInfo && userInfo?.name}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("name")}
                />
                <p className="text-red mt-1.5">{errors?.name?.message}</p>
              </div>
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  defaultValue={userInfo && userInfo?.phone_number}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("phone_number")}
                />
                <p className="text-red mt-1.5">
                  {errors?.phone_number?.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Street</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your street number"
                  defaultValue={userInfo && userInfo?.street}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("street")}
                />
                <p className="text-red mt-1.5">{errors?.street?.message}</p>
              </div>
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">State</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your state"
                  defaultValue={userInfo && userInfo?.state}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("state")}
                />
                <p className="text-red mt-1.5">{errors?.state?.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Zip Code</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter zip code"
                  defaultValue={userInfo && userInfo?.zip_code}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("zip_code")}
                />
                <p className="text-red mt-1.5">{errors?.zip_code?.message}</p>
              </div>
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">City</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter City name"
                  defaultValue={userInfo && userInfo?.city}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("city")}
                />
                <p className="text-red mt-1.5">{errors?.city?.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Area Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Area code"
                  defaultValue={userInfo && userInfo?.area_code}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("area_code")}
                />
                <p className="text-red mt-1.5">{errors?.area_code?.message}</p>
              </div>
              <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                <label className="label">
                  <span className="font-medium mb-1 ">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Country name"
                  defaultValue={userInfo && userInfo?.country}
                  className="py-4 px-6 border border-[#E2E2E2] rounded-[10px] placeholder:text-[14px] w-full"
                  {...register("country")}
                />
                <p className="text-red mt-1.5">{errors?.country?.message}</p>
              </div>
            </div>
            <button
              className="py-2.5 px-3.5 bg-common border border-common text-white rounded-md  cursor-pointer w-full mb-4 mt-6"
              type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </AccountSettingLayout>
  );
};

export default PersonalInformation;
