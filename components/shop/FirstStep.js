import React from "react";
import dropIcon from "/public/images/drop.png";
import user from "/public/images/user-big.png";
import Image from "next/image";

const FirstStep = () => {
  return (
    <div>
      <p className="mt-8 text-lg font-medium text-left">
        Write Your Rental Bike Shop General Information.
      </p>
      <form className="mt-4">
        <div className="border border-gray rounded-xl pt-6 pb-4 px-4">
          <div className="flex items-center gap-4">
            <div className=" form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium mb-1 ">
                  BrandShop Name<span className="text-common">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your bike shop name"
                className="input input-bordered placeholder:text-[14px] w-full"
              />
            </div>
            <div className=" form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium mb-1 ">
                  Legal Entity<span className="text-common">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your legan entity name"
                className="input input-bordered placeholder:text-[14px] w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className=" form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium mb-1 ">
                  Phone Number<span className="text-common">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="Enter your phone number"
                className="input input-bordered placeholder:text-[14px] w-full"
              />
            </div>
            <div className=" form-control rounded-[10px] w-full">
              <label className="label">
                <span className="font-medium mb-1 ">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered placeholder:text-[14px] w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label>
              <h3 className="font-medium  mt-4 mb-1">Shop Profile Picture</h3>
              <div className=" p-4 transition bg-white border border-gray rounded-md appearance-none cursor-pointer">
                <Image className=" mt-4 mb-4" src={user} alt="" />

                <p className="text-[#7F7F7F] text-sm">
                  Please upload only formats as jpg, jpeg, png. Maximum size is
                  20mb. Minimum dimension is 80px x 80px.
                </p>

                <input type="file" name="file_upload" className="hidden" />
              </div>
            </label>
            <label>
              <h3 className="font-medium mt-4 mb-1">Cover Photo</h3>
              <div className=" p-4 transition bg-white border border-gray rounded-md appearance-none cursor-pointer">
                <div className="py-5 bg-gray mt-5 mb-4">
                  <Image className="mx-auto" src={dropIcon} alt="" />
                </div>

                <p className="text-[#7F7F7F] text-sm">
                  Please upload only formats as jpg, jpeg, png. Maximum size is
                  20mb. Minimum dimension is 900px x 600px.
                </p>

                <input type="file" name="file_upload" className="hidden" />
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FirstStep;
