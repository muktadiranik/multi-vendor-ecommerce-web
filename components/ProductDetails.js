import Image from "next/image";
import Link from "next/link";
import React from "react";
import location from "../public/images/mapicon.png";
import CustomRating from "./CustomRating";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { useSelector } from "react-redux";
import Date from "./shop/date";

const ProductDetails = ({ productItem, add }) => {
  const currency = useSelector((state) => state.currency);

  return (
    <div className="container">
      <div className=" mt-4 mb-4"></div>
      <div className="grid grid-cols-12 gap-8">
        <div className="md:col-span-6 col-span-full">
          {productItem?.node?.image ? (
            <img
              className="rounded-xl lg:w-[745px] lg:h-[500px] md:w-[410px] md:h-[274px]  "
              src={productItem?.node?.image}
              alt=""
            />
          ) : (
            <p className="lg:w-[745px] lg:h-[500px] md:w-[410px] md:h-[274px]  flex justify-center items-center font-semibold text-lg">
              No image
            </p>
          )}
          <div className="flex justify-between mt-10">
            <div>
              <div>
                <h1 className="lg:text-4xl md:text-xl font-semibold">
                  {productItem?.node?.brand}
                </h1>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Image src={location} alt="" className="w-4 h-6" />
                <p className="lg:text-lg md:text-sm font-normal text-common ">
                  {productItem?.node?.shop?.city},{" "}
                  {productItem?.node?.shop?.country}
                </p>
                <div className="">
                  {productItem?.node?.isAvailable ? (
                    <button className="bg-green rounded-full text-sm text-white py-0.5 px-1">
                      Available
                    </button>
                  ) : (
                    <button className="bg-red rounded-full text-sm text-white py-0.5 px-1">
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden lg:block md:block">
              {/* {productItem?.node?.productrateSet &&
                productItem?.node?.productrateSet?.map((rate) => (
                  <div className="flex justify-end" key={rate?.id}>
                    <p className="font-semibold mt-3 lg:text-xl">
                      {rate?.rate} € / {rate?.rateType?.name}
                    </p>
                  </div>
                ))} */}
              <div className="flex justify-end">
                <p className="font-semibold mt-3 lg:text-xl">
                  {productItem?.node?.productrateSet?.map(
                    (rate) =>
                      rate?.currency?.id == currency?.currency && (
                        <div>
                          {rate?.rate} {rate?.currency?.code} /{" "}
                          {rate?.rateType?.name}
                        </div>
                      )
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex items-center w-full ">
              <p className="bg-common w-7 flex items-center justify-center  text-xs rounded-lg text-white">
                {productItem?.node?.rating.toFixed(1)}{" "}
              </p>
              <CustomRating value={productItem?.node?.rating} />
              <p className="text-gray-400 ml-1 mt-[-3] text-sm">
                {`(${productItem?.node?.totalReviews})`}
              </p>
            </div>
            <button
              className="hidden lg:block md:block text-white whitespace-nowrap bg-common  px-[30px] py-[11px]  font-medium lg:text-sm md:text-xs rounded-xl"
              onClick={() => add(productItem?.node?.id)}>
              Add to cart
            </button>
          </div>
        </div>
        <div className="md:col-span-6 col-span-full">
          <h1 className="lg:text-2xl md:text-base font-semibold mb-4">
            Description
          </h1>
          <div className="flex items-center">
            <h1 className="text-xl text-common mr-3">
              {" "}
              <AiOutlineColumnWidth />
            </h1>
            <h1 className="text-2xl font-normal">
              {productItem?.node?.size?.productSize}
            </h1>
          </div>
          <div className="divider"></div>
          <div>
            <p className="font-normal lg:text-lg md:text-xs text-[#7F7F7F]">
              {productItem?.node?.description}
            </p>
          </div>
          <div className="flex lg:hidden md:hidden justify-between mt-8">
            <div className="">
              {productItem?.node?.productrateSet &&
                productItem?.node?.productrateSet?.map((rate) => (
                  <div className="flex justify-end" key={rate?.id}>
                    <p className="font-semibold mt-3 lg:text-xl">
                      {rate?.rate} {rate?.currency?.symbol} /{" "}
                      {rate?.rateType?.name}
                    </p>
                  </div>
                ))}
            </div>
            <button
              className="text-white btn bg-common font-medium text-sm rounded-xl mt-5"
              onClick={() => add(productItem?.node?.id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-8 mb-6"></div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-6 bg-[#FAFAFA]  pb-4">
          <h1 className="font-semibold lg:text-2xl md:text-base mb-4">
            Renter by
          </h1>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-6 md:col-span-6  col-span-full">
              <div className="flex">
                <div className="avatar lg:w-16 lg:h-16 md:w-10 md:h-10 w-10 mr-4">
                  <div className="w-24 rounded-full">
                    {productItem?.node?.shop?.shopImage ? (
                      <img
                        className=""
                        src={productItem?.node?.shop?.shopImage}
                        alt=""
                      />
                    ) : (
                      <img
                        className=""
                        src="https://www.chanchao.com.tw/DTG/images/default.jpg"
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="lg:text-base md:text-sm font-medium whitespace-nowrap">
                    {productItem?.node?.shop?.name}
                  </h1>
                  <p className="text-sm font-normal whitespace-nowrap">
                    Joined on {productItem?.node?.shop?.createdAt}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-6 flex justify-center items-center lg:ml-0 md:ml-0  ml-12 lg:mt-0 md:mt-0 mt-7">
              {/* <button className="text-white whitespace-nowrap lg:ml-28 bg-common px-[17px] py-[11px]  font-medium lg:text-sm md:text-xs rounded-xl flex justify-center items-center">
                <SiGooglechat className="mr-3 text-white" />
                Chat Renter
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-6 mb-10">
        <div className="col-span-12">
          <h1 className="lg:text-2xl md:text-base font-semibold mb-4">
            Terms & Conditions
          </h1>
          <p className="lg:text-lg md:text-xs font-normal text-[#7F7F7F] mb-3">
            Definitions This ‘Rental Agreement’ is composed for the Rental of
            Bicycle(s) from Black-Bikes.com by Het Zwart Fitisemanu (the
            ‘Lessor’) to individuals or commercial enterprises, such as Hotels
            (= ‘Lessee’).
          </p>
          <p className="lg:text-lg md:text-xs font-normal text-[#7F7F7F] mb-3">
            Rental fee The rental fee (the ‘Rent’) is defined in accordance with
            Lessor’s current price list (the ‘Price List’) at the moment of
            entering into the rental agreement. The Price List is deposited and
            available for inspection by Lessee at the branch offices of the
            Lessor
          </p>
          <p className="lg:text-lg md:text-xs font-normal text-[#7F7F7F]">
            Cancellation free of charge is possible provided that Lessee informs
            Lessor in writing (e-mail) 48 hours in advance. In case of
            cancellation from less than 48 hours in advance the full rent will
            remain charged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
