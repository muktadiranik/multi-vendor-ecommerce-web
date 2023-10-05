import React from "react";
import dropIcon from "/public/images/drop.png";
import usericon from "/public/images/userrounded.png";
import Image from "next/image";

const shopOwnerInformation = () => {
  return (
    <shopOwnerInfoLayout>
      <div className=" mt-20 mb-4">
        <div>
          <form className="border rounded-md p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <p className="font-medium">Profile Picture</p>
                <div className="border rounded-md p-4">
                  <Image className="w-[68px]" src={usericon} alt="" />
                  <p className="mt-4 text-[#7F7F7F] text-sm">
                    Please upload only formats as jpg, jpeg, png. Maximum size
                    is 20mb. Minimum dimension is 80px x 80px.
                  </p>
                  <input type="file" name="file_upload" className="hidden" />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Street and Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your street and number"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">City</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City name"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="font-medium">Cover Photo</p>
                <div className="border rounded-md p-4">
                  <div className="bg-[#F0F0F0] p-4 ">
                    <Image className="mx-auto" src={dropIcon} alt="" />
                  </div>
                  <p className="mt-4 text-[#7F7F7F] text-sm">
                    Please upload only formats as jpg, jpeg, png. Maximum size
                    is 20mb. Minimum dimension is 900px x 600px.
                  </p>
                  <input type="file" name="file_upload" className="hidden" />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Zip Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
                <div className=" form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">Country</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Country name"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
              </div>
            </div>
            <button className="btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full mt-6 ">
              Update Profile
            </button>
          </form>
          <form className="border rounded-md p-4 mt-10 mb-24">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <div className=" form-control rounded-[10px] w-full">
                  <label className="label">
                    <span className="font-medium mb-1 "> New Password </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your new password"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className=" form-control rounded-[10px] w-full">
                  <label className="label">
                    <span className="font-medium mb-1 ">Confirm Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="confirm your password"
                    className="input input-bordered placeholder:text-[14px] "
                  />
                </div>
              </div>
            </div>
            <button className="btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full mt-6 ">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </shopOwnerInfoLayout>
  );
};

export default shopOwnerInformation;
