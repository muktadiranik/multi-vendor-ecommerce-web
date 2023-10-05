import React, { useState } from "react";

const SkeletonDesign = () => {
  return (
    <div className="grid grid-cols-12 card-side bg-base-100  w-full border border-gray p-4 xl:p-5 rounded mb-3 ">
      <div className="col-span-12 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center items-center">
          {/* <Link
            href={`/details/[id]?id=${productItem?.node?.id}`}
            as={`/details/${productItem?.node?.id}`}> */}
          <div className="w-[200px] lg:w-[311px]  md:h-[167px] xl:h-[167px] h-[200] bg-[#EAEAEA]"></div>
          {/* </Link> */}
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-9 grid grid-cols-12">
          <div className="col-span-6 md:col-span-12 xl:col-span-6">
            {/* <Link
              href={`/details/[id]?id=${productItem?.node?.id}`}
              as={`/details/${productItem?.node?.id}`}> */}
            <p className="font-semibold w-[150px] h-[40px] bg-[#EAEAEA] rounded-lg md:text-xl xl:text-3xl">
              {/* {productItem?.node?.brand} */}
            </p>
            {/* </Link> */}
            <div className="">
              <div className="my-[10px] md:my-1 xl:my-4 flex items-center gap-4">
                <p className="md:text-xs xl:text-base w-[120px] h-[20px] bg-[#EAEAEA] rounded-lg">
                  {/* {productItem?.node?.productType?.name}{" "} */}
                </p>
                <p className="w-1 h-1 rounded-full bg-[#EAEAEA] "></p>
                <p className="text-xs xl:text-base whitespace-nowrap opacity-75">
                  {/* Bike Size: */}
                  {/* {productItem?.node?.size?.productSize} */}
                </p>
              </div>
              <div className="flex items-center gap-2 my-[10px] md:my-0">
                {/* {productItem?.node?.isAvailable ? ( */}
                <button className="bg-[#EAEAEA] w-[65px] h-[20px] rounded-full text-[10px] xl:text-sm text-white py-0.5 px-1"></button>
                {/* ) : ( */}
                {/* <button className="bg-red rounded-full text-[10px] xl:text-sm text-white py-0.5 px-1">
                    Not Available
                  </button> */}
                {/* )} */}
              </div>
              <div className="flex items-center mt-4 xl:mt-4 w-full ">
                <p className="bg-[#EAEAEA] w-[100px] h-5 flex items-center justify-center  text-xs rounded-lg text-white">
                  {/* {productItem?.node?.rating}{" "} */}
                </p>
                {/* <CustomRating value={productItem?.node?.rating} /> */}
                {/* <p className="text-gray-400 ml-1 mt-[-3] text-sm">
                  {`(${productItem?.node?.totalReviews})`}
                </p> */}
              </div>
            </div>
          </div>
          <div className=" col-span-6 xl:col-span-6 flex flex-col  items-end  xl:items-end">
            <div className="flex  text-right mt-[10px] xl:mt-0">
              {/* <Image src={location} alt="" className="w-2 h-4 xl:w-4 xl:h-6" /> */}
              <div className="w-[150px] h-4 bg-[#EAEAEA] rounded-lg"></div>
              <p className="text-[10px] xl:text-base md:text-sm text-common whitespace-nowrap font-normal  capitalize inline-block">
                {/* {productItem?.node?.shop?.city},{" "}
                {productItem?.node?.shop?.country} */}
              </p>
            </div>
            <div className="my-[10px] md:my-1 xl:my-4 flex flex-col text-right xl:items-end">
              <div>
                <p className="font-semibold text-sm xl:text-2xl md:text-2xl w-[120px] h-[30px] bg-[#EAEAEA] rounded-lg">
                  {/* {productItem?.node?.productrateSet[0]?.rate} € /{" "}
                  {productItem?.node?.productrateSet[0]?.rateType?.name} */}
                </p>
              </div>
            </div>
            <button className="text-white whitespace-nowrap bg-[#EAEAEA] px-3 py-[6px] xl:px-[30px] xl:py-[11px] font-medium text-sm rounded-md w-[100px] h-[35px]"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDesign;
