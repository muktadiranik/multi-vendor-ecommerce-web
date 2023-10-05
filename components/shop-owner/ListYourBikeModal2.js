import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dropIcon from "/public/images/drop.png";
import Image from "next/image";
import { toast } from "react-toastify";

const ListYourBikeModal2 = ({ getImage, setBikeDetails }) => {
  const [productImage, setProductImage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const image = data?.image[0];
    if (
      image.type == "image/jpeg" ||
      image.type == "image/png" ||
      image.type == "image/jpg"
    ) {
      image && getImage(image);
    } else {
      toast.error("Please select a valid file");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">List your bike</h1>
      </div>
      <div className="grid grid-cols-12 mt-[18px]">
        <div className="col-span-full">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 flex justify-between items-center text-sm font-medium text-gray-500">
                <li className="flex gap-2 items-center bg-white">
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
                  <span className="hidden md:inline-block text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Bike Details
                  </span>
                  <span className="block md:hidden text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Details
                  </span>
                </li>
                <div className="divider divider-vertical w-[18px] md:w-[41px] xl:w-[200px]"></div>
                <li className="flex gap-2 items-center bg-white">
                  <span className="rounded-full  bg-common p-1.5 text-white font-bold">
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
                  <span className="hidden md:inline-block text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Default Image
                  </span>
                  <span className="block md:hidden text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Image
                  </span>
                </li>
                <div className="divider divider-vertical w-[18px] md:w-[80px] xl:w-[200px]"></div>
                <li className="flex gap-2 items-center bg-white ">
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
                  <span className="text-black font-medium text-xs xl:text-sm">
                    Pricing
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-4 xl:mt-6 mb-1">
        <div className="col-span-full">
          <h1 className="font-medium w-full text-left ">
            Bike Images<span className="text-common">*</span>
          </h1>
        </div>
      </div>
      <div className="justify-center grid grid-cols-12 w-full">
        <div className="col-span-full">
          <div className="w-full">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label className="flex justify-center w-full h-full px-4 transition bg-white border-2 border-gray border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div className="">
                  {productImage ? (
                    <img
                      className="w-[200px] h-[200px] mx-auto mt-8 mb-4"
                      src={productImage}
                      alt=""
                    />
                  ) : (
                    <>
                      <Image
                        className="mx-auto mt-8 mb-4"
                        src={dropIcon}
                        alt=""
                      />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-[#7F7F7F] text-xs xl:text-sm">
                          (only JPEG, JPG, PNG)
                        </p>
                        <div className="btn normal-case btn-sm px-6 my-5 font-normal">
                          Upload Image
                        </div>
                      </div>
                      {productImage && (
                        <img id="image" src={productImage} alt="user" />
                      )}
                    </>
                  )}
                </div>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  {...register("image", {
                    onChange: (e) => {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setProductImage(url);
                    },
                  })}
                />
              </label>
              <div className="flex justify-start xl:justify-end mt-4">
                <div className="col-span-3"></div>
                <button
                  onClick={() => {
                    setBikeDetails(null);
                  }}
                  className="col-span-3 btn btn-xl bg-transparent hover:bg-common hover:text-white  text-custom-black normal-case font-normal">
                  Back
                </button>
                <label
                  htmlFor="list-your-bike-modal"
                  className="col-span-3 btn btn-xl mx-4 bg-transparent hover:bg-common hover:text-white  text-custom-black normal-case font-normal">
                  Cancel
                </label>
                <button
                  type="submit"
                  className="col-span-3 btn btn-xl hover:bg-transparent bg-common text-white hover:text-custom-black normal-case font-normal">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListYourBikeModal2;
