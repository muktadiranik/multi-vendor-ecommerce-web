import React from "react";
import Image from "next/image";
import Link from "next/link";

import successicon from "/public/images/Success.png";
import { useRouter } from "next/router";
const IdVerificationSuccessModal = () => {
  const router = useRouter();
  return (
    <div className="xl:container mx-auto">
      <p className="flex justify-center mt-24 font-medium text-center text-[20px] xl:text-2xl">
        Submit Documents for verify your account
      </p>
      <div className="grid grid-cols-12 w-full mt-4 mb-0 lg:mb-2 xl:mb-10 container">
        <div className="lg:col-span-2 xl:col-span-3"></div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-6">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 grid grid-cols-16 gap-1 xl:gap-2 text-sm font-medium text-gray-500">
                <li className="hidden lg:col-span-1 lg:block gap-2 items-center bg-white"></li>
                <li className="col-span-4 lg:col-span-3 flex gap-2 items-center bg-white">
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
                  <span className="text-black font-semibold text-[10px] xl:text-sm">
                    {" "}
                    Your photo
                  </span>
                </li>
                <li className="col-span-2 lg:col-span-2 flex justify-center items-center">
                  <div className="w-full border-[1px] border-[#DADADA] bg-[#DADADA] h-[2px]"></div>
                </li>
                <li className="col-span-4 lg:col-span-3 flex gap-2 items-center bg-white">
                  <span className="rounded-full bg-common  p-1.5 text-white font-bold">
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
                  <span className="text-black font-semibold text-[10px] xl:text-sm">
                    {" "}
                    Your ID
                  </span>
                </li>
                <li className="col-span-2 lg:col-span-2 flex justify-center items-center">
                  <div className="w-full border-[1px] border-[#DADADA] bg-[#DADADA] h-[2px]"></div>
                </li>
                <li className="col-span-4 lg:col-span-4 flex gap-2 items-center bg-white ">
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
                  <span className="text-black font-semibold text-[10px] xl:text-sm">
                    {" "}
                    Confirmation
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-3"></div>
      </div>
      <div className="container justify-center grid grid-cols-12 w-full">
        <div className="lg:col-span-2 xl:col-span-3"></div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-6 ">
          <div className="w-full">
            <div className="flex justify-center  bg-white border border-gray rounded-md mt-4 lg:mt-6 xl:mt-8 pb-6 lg:pb-8">
              <div>
                <Image
                  className="mx-auto mt-6 lg:mt-8 mb-4"
                  src={successicon}
                  alt=""
                />
                <div className="grid grid-cols-12">
                  <div className="col-span-2"></div>
                  <div className="col-span-8">
                    <p className="font-medium text-base lg:text-xl text-center">
                      Thank you! Your documents have been successfully uploaded
                    </p>
                  </div>
                  <div className="col-span-2"></div>
                </div>
                <p className="text-sm text-center mt-2 mb-2 text-[#7F7F7F]">
                  Your request is being reviewed and you should receive an email
                  reply within 48 hours.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/shopowner/my-shop")}
              className="btn bg-common hover:bg-common normal-case font-normal w-full mt-4 mb-6">
              Let’s go
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-3"></div>
      </div>
    </div>
  );
};

export default IdVerificationSuccessModal;
