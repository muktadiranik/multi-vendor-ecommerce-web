import Image from "next/image";
import React, { useEffect, useState } from "react";
import shopimage from "/public/images/shop-owner/cycling.png";
import CoverImage from "/public/images/Cover.png";
import frameicon from "/public/images/store-icon.png";
import phoneicon from "/public/images/Vector2.png";
import Link from "next/link";
import locationicon from "/public/images/shop-owner/location-marker.png";
import calenderIcon from "/public/images/uim_calender.png";
import staricon from "/public/images/shop-owner/Star.png";
import editicon from "/public/images/shop-owner/white-edit.png";
import EditShop from "./EditShop";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const MyShop = () => {
  const router = useRouter();

  const shop = useSelector((state) => state.shop);

  const bg_image = `${shop?.shop?.shops?.edges[0]?.node?.shopCover}`;

  return (
    <>
      <div className="">
        <div className="grid grid-cols-12 relative ">
          <div
            style={{ backgroundImage: `url(${bg_image})` }}
            className="col-span-full rounded-t-[10px] h-36 bg-no-repeat bg-left-top bg-cover"></div>
          {shop?.shop?.shops?.edges[0]?.node?.shopImage ? (
            <Image
              className="absolute h-20 w-20 xl:w-[135px] xl:h-[135px] left-4 md:left-5 xl:left-6 -bottom-2 xl:-bottom-6 xl:top-6"
              width={500}
              height={500}
              src={shop?.shop?.shops?.edges[0]?.node?.shopImage}
              alt=""
            />
          ) : (
            <img
              className="absolute h-20 w-20 xl:w-[135px] xl:h-[135px] left-5 xl:left-6 -bottom-6 top-20 xl:top-6"
              width={500}
              height={500}
              src="https://www.chanchao.com.tw/DTG/images/default.jpg"
              alt=""></img>
          )}
        </div>
        {/* <div className="grid grid-cols-12 w-full ">
          <div className="col-span-full w-full rounded-t-lg relative overflow-hidden">
            {shop?.shop?.shops?.edges[0]?.node?.shopCover ? (
              <Image
                width={1400}
                height={145}
                className="h-36"
                src={shop?.shop?.shops?.edges[0]?.node?.shopCover}
                alt=""
              />
            ) : (
              <div className="flex justify-center ">
                <p className=" h-[145px]  pt-8">No image</p>
              </div>
            )}
            {shop?.shop?.shops?.edges[0]?.node?.shopImage ? (
              <Image
                className="absolute left-4 top-20"
                src={shop?.shop?.shops?.edges[0]?.node?.shopImage}
                alt=""
                width={80}
                height={80}
              />
            ) : (
              <div className="flex h-[80px] w-[80px] border absolute left-4 top-16 font-semibold items-center">
                <p className="text-center p-1">No image</p>
              </div>
              // <img
              //   src={user}
              //   className="w-[80px] h-[80px] absolute left-4 top-16"
              //   alt=""
              // />
            )}
          </div>
        </div> */}
        <div className="bg-[#EBF3FF] rounded-b-lg p-4 xl:p-6">
          <div className="grid grid-cols-12 w-full  ">
            <div className="col-span-full  w-full">
              <div className="grid grid-cols-12 justify-center w-full">
                <div className="col-span-12 md:col-span-4 xl:col-span-3 ">
                  <div className="flex items-center gap-4 mb-4 xl:mb-6">
                    <p className="text-xl xl:text-3xl font-medium capitalize whitespace-nowrap">
                      {shop?.shop?.shops?.edges[0]?.node?.name}
                    </p>
                    {shop?.shop?.shops?.edges[0]?.node?.isVerified === true ? (
                      <Image src={frameicon} alt="" />
                    ) : (
                      <>
                        <p className="text-[#147B11] font-small text-base whitespace-nowrap">
                          Not Verified
                        </p>
                      </>
                    )}
                  </div>
                  <p className="text-[#147B11] font-medium mb-4 xl:mb-6 text-base">
                    Opening hours:{" "}
                    <span className="text-black">
                      {shop?.shop?.shops?.edges[0]?.node?.openingTime}
                      {" - "}
                      {shop?.shop?.shops?.edges[0]?.node?.closingTime}
                    </span>
                  </p>
                  <div className="flex ">
                    <Image src={phoneicon} alt="" />
                    <p className="ml-2 text-base text-custom-black">
                      {shop?.shop?.shops?.edges[0]?.node?.phone === null
                        ? "Not Available"
                        : shop?.shop?.shops?.edges[0]?.node?.phone}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 xl:col-span-2"></div>
                <div className="col-span-12 md:col-span-7 xl:col-span-7">
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 flex md:justify-end items-start mt-4 md:mt-0">
                      <Image className="w-5 h-5" src={locationicon} alt="" />
                      <p className=" ml-1 text-base text-custom-black">
                        {shop?.shop?.shops?.edges[0]?.node?.city},{" "}
                        {shop?.shop?.shops?.edges[0]?.node?.country?.name}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 flex  md:justify-end items-start mt-4 md:mt-0">
                      <Image className="w-5 h-5" src={calenderIcon} alt="" />
                      <p className=" ml-1 text-base text-custom-black">
                        Joined {shop?.shop?.shops?.edges[0]?.node?.createdAt}
                      </p>
                    </div>
                    <div className="col-span-12 xl:col-span-4 flex md:justify-end items-start mt-4 md:mt-4 xl:mt-0">
                      <div className="border bg-common rounded-xl p-1 w-7 h-7">
                        <p className="text-xs text-center text-white">
                          {shop?.shop?.shops?.edges[0]?.node?.rating.toFixed(1)}
                        </p>
                      </div>
                      <Image className="w-5 h-5 ml-2" src={staricon} alt="" />
                      <p className="text-base text-custom-black ml-1">
                        Based on{" "}
                        {shop?.shop?.shops?.edges[0]?.node?.totalReviews}{" "}
                        Reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end my-4">
            {shop?.shop?.shops?.edges[0]?.node?.isVerified === true ? null : (
              <label className=" flex bg-common py-2 xl:py-[10px] px-3 xl:px-5 rounded-xl cursor-pointer">
                <Image
                  className="h-[12.15px] w-[13.33px] mt-[3px] ml-2"
                  src={editicon}
                  alt=""
                />
                <Link href="/id-verification">
                  <p className="text-xs ml-3 text-white">Verify Shop</p>
                </Link>
              </label>
            )}
            <label
              htmlFor="edit-shop-modal"
              className=" flex bg-common py-2 xl:py-[10px] px-3 xl:px-5 rounded-xl cursor-pointer mx-2">
              <Image
                className="h-[12.15px] w-[13.33px] mt-[3px] ml-2"
                src={editicon}
                alt=""
              />
              <p className="text-xs ml-3 text-white">Edit Shop Profile</p>
            </label>
          </div>
          <div className="flex gap-6">
            <Link
              href="/shopowner/my-shop"
              className={`text-lg text-[#7F7F7F] whitespace-nowrap ${
                router.asPath == "/shopowner/my-shop"
                  ? "underline decoration-common decoration-2 underline-offset-8"
                  : ""
              }`}>
              Rent Bikes
            </Link>
            <Link
              href="/shopowner/riders-review"
              className={`text-lg text-[#7F7F7F] whitespace-nowrap ${
                router.asPath == "/shopowner/riders-review"
                  ? "underline decoration-common decoration-2"
                  : ""
              }`}>
              Reviews From Riders
            </Link>
          </div>
        </div>
      </div>
      <EditShop />
    </>
  );
};

export default MyShop;
