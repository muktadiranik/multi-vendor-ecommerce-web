import React from "react";
import Image from "next/image";
import Link from "next/link";
import successicon from "/public/images/Success.png";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  return (
    <div className="xl:container">
      <h1 className="text-2xl font-medium">Create your Rental Shop</h1>

      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-full">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 flex justify-around text-sm font-medium text-gray-500">
                <li className="flex gap-2 items-center bg-white ">
                  <span className="rounded-full bg-common p-1.5 text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <span className="text-black font-semibold text-sm">
                    {" "}
                    Shop Details
                  </span>
                </li>
                <li className="flex justify-center items-center">
                  <div className="w-[40px] lg:w-[235px] border-[1px] border-[#DADADA] bg-[#DADADA] h-[2px]"></div>
                </li>
                <li className="flex gap-2 items-center bg-white ">
                  <span className="rounded-full bg-common p-1.5 text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <span className="text-black font-semibold">Confirmation</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-6 xl:pb-40 xl:pt-10  bg-white border border-gray rounded-md mt-8 ">
        <div>
          <Image
            className="mx-auto mt-8 mb-4 w-[65px] lg:w-[85px] xl:w-[100px]"
            src={successicon}
            alt=""
          />
          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-8">
              <p className="font-medium text-base xl:text-2xl text-center">
                Thank you! You have successfully opened your Rental Shop on Go
                Velo platform
              </p>
            </div>
            <div className="col-span-2"></div>
          </div>
          <p className="text-[12px] xl:text-base text-center mt-2 mb-2 text-[#7F7F7F]">
            Now you need to verify your ID for upload Bikes in your Rental Shop
          </p>
        </div>
      </div>
      <div className="mt-4 ">
        <div className="flex flex-col lg:flex-row justify-start xl:justify-end w-full gap-4">
          <button
            htmlFor="create-shop-modal"
            className="py-2 px-3.5 border rounded-md text-center flex  text-custom-black cursor-pointer"
            onClick={() => router.push("/shopowner/my-shop")}>
            Let’s go to your shop
          </button>
          <button
            onClick={() => router.push("/id-verification")}
            className="py-2 px-3.5 bg-common border border-common text-white rounded-md  cursor-pointer">
            ID Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
