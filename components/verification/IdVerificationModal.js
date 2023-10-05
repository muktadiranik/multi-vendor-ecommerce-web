import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dropIcon from "/public/images/drop.png";
const IdVerificationModal = ({ getIdVerificationValue }) => {
  const [data, setData] = useState("");

  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (
      (data.frontId[0].type == "image/jpeg" ||
        data.frontId[0].type == "image/png" ||
        data.frontId[0].type == "image/jpg") &&
      (data.backId[0].type == "image/jpeg" ||
        data.backId[0].type == "image/png" ||
        data.backId[0].type == "image/jpg")
    ) {
      data && getIdVerificationValue(data);
    } else {
      toast.error("Please select a valid file");
    }
  };
  return (
    <div className="xl:container mx-auto">
      <p className="flex justify-center mt-24 font-medium text-center text-[20px] xl:text-2xl">
        Submit Documents for verify your account
      </p>
      <div className="grid grid-cols-12 w-full mt-4 mb-10 container">
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
                  <span className="rounded-full bg-[#6E6E6E] p-1.5 text-white font-bold">
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
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className=" w-full h-full px-0 lg:px-4 transition bg-white border-2 border-[#DADADA] border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div className="flex justify-center gap-0 lg:gap-4 mt-2 mb-3">
                  <label className=" px-2 pb-2">
                    {frontId ? (
                      <img
                        className="w-[100px] mx-auto mt-8 mb-4"
                        src={frontId}
                        alt=""
                      />
                    ) : (
                      <>
                        <Image
                          className="mx-auto mt-8 mb-4"
                          src={dropIcon}
                          alt=""
                        />
                        <div className="flex justify-center items-center text-xs">
                          <span>Upload ID front side </span>
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      name="file_upload"
                      className="hidden"
                      {...register("frontId", {
                        onChange: (e) => {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setFrontId(url);
                        },
                      })}
                    />
                  </label>
                  <div className="divider divider-horizontal"></div>
                  <label className="  px-2 pb-2">
                    {backId ? (
                      <img
                        className="w-[100px] mx-auto mt-8 mb-4"
                        src={backId}
                        alt=""
                      />
                    ) : (
                      <>
                        <Image
                          className="mx-auto mt-8 mb-4"
                          src={dropIcon}
                          alt=""
                        />
                        <div className="flex justify-center items-center text-xs">
                          <span>Upload ID Back side </span>
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      name="file_upload"
                      className="hidden"
                      {...register("backId", {
                        onChange: (e) => {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setBackId(url);
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="flex justify-center">
                  <div className="mb-5">
                    <span className="text-[#7F7F7F] text-xs lg:text-sm">
                      (only JPEG, JPG, PNG accepted)
                    </span>
                    {/* <p className="text-[#7F7F7F] text-sm text-center mt-2 mb-2">
                      or
                    </p>
                    <div className="pb-6">
                      <p className="px-4 py-[2px] bg-[#282828] text-white rounded-xl text-center">
                        Upload Document
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-common hover:bg-common normal-case font-normal w-full mt-4 mb-10 lg:mb-20 xl:mb-24">
                Next Step
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-3"></div>
      </div>
    </div>
  );
};

export default IdVerificationModal;
