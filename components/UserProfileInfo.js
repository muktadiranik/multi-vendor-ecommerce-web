import React, { useEffect, useState } from "react";
import shopimage from "/public/images/shop-owner/cycling.png";
import image from "/public/images/shop-owner/Cover.svg";
import frameicon from "/public/images/shop-owner/Frame.png";
import phoneicon from "/public/images/Vector2.png";
import locationicon from "/public/images/shop-owner/location-marker.png";
import calenderIcon from "/public/images/calender1.png";
import editicon from "/public/images/edit-white.png";
import CreateShopIcon from "/public/images/create.png";
import Image from "next/image";
import { useRouter } from "next/router";
import userBig from "../public/images/user-big.png";
import Date from "./shop/date";

const UserProfileInfo = () => {
  const router = useRouter();

  const [userInfo, SetUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/user/`, {
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${
            localStorage.getItem("access_token") &&
            localStorage.getItem("access_token")
          }`,
        },
      });
      const data = await res.json();
      SetUserInfo(data);
    };
    getUserInfo();
  }, []);

  const bg_image = `${userInfo?.user_cover}`;
  return (
    <div className="container mx-auto mt-6 mb-24">
      <div className="grid grid-cols-12 relative ">
        <div
          style={{ backgroundImage: `url(${bg_image})` }}
          className="col-span-full rounded-t-[10px] h-36 bg-no-repeat bg-left-top bg-cover"></div>
        {userInfo?.user_image ? (
          <Image
            className="absolute h-20 w-20 xl:w-40 xl:h-40 left-4 md:left-5 xl:left-6 -bottom-6 xl:top-6"
            width={500}
            height={500}
            src={userInfo?.user_image}
            alt=""
          />
        ) : (
          <img
            className="absolute h-20 w-20 xl:w-40 xl:h-40 left-5 xl:left-6 -bottom-6 xl:top-6"
            width={500}
            height={500}
            src="https://www.chanchao.com.tw/DTG/images/default.jpg"
            alt=""></img>
        )}
      </div>
      <div className="grid grid-cols-12 w-full bg-[#EBF3FF] p-4 xl:p-6 pt-8 xl:pt-14 rounded-b-[10px]">
        <div className="col-span-12 md:col-span-4">
          <div className="flex justify-start items-center ">
            <p className="text-xl xl:text-3xl font-medium mr-3">
              {userInfo?.name}
            </p>
            <Image className="h-6 xl:h-8" src={frameicon} alt="" />
          </div>
        </div>
        {/* <div></div> */}
        <div className="col-span-12 md:col-span-8">
          <div className="flex flex-col items-start md:items-end gap-y-6 xl:gap-y-8">
            <div className="flex  flex-col md:flex-row  gap-x-3 xl:gap-x-11">
              {/* <div className="flex items-center gap-2">
                <Image className="h-5" src={phoneicon} alt="" />
                <p>{userInfo?.phone_number}</p>
              </div> */}
              <div className="flex  gap-2 my-4 md:my-0 lg:my-0">
                <Image className="w-5 h-5" src={locationicon} alt="" />
                <p>
                  {userInfo?.city}, {userInfo?.state}
                </p>
              </div>
              <div className="flex gap-2">
                <Image className="h-5 w-5" src={calenderIcon} alt="" />
                <p>Joined {userInfo?.created_at}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-x-4 items-center">
                <button
                  onClick={() =>
                    router.push("/user-profile/personal-information")
                  }
                  className="w-32 h-8 flex items-center justify-center bg-common text-white rounded-[10px] font-normal text-xs">
                  <Image className="mr-2" src={editicon} alt="" />
                  Edit Profile
                </button>
                <label
                  htmlFor="create-shop-modal"
                  className="w-32 h-8 flex items-center justify-center bg-white text-black rounded-[10px] font-normal text-xs cursor-pointer">
                  <Image className="mr-2" src={CreateShopIcon} alt="" />
                  Create Shop
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
