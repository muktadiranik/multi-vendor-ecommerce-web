import Image from "next/image";
import React from "react";
import AccountSettingLayout from "/components/AccountSettingLayout";
import icon1 from "../../public/images/icon-1.png";
import icon2 from "../../public/images/icon2.png";
import icon3 from "../../public/images/cardicono3.png";
import icon4 from "../../public/images/card4.svg";
import icon5 from "../../public/images/icon5.png";
import icon6 from "../../public/images/card6.png";
import paypal from "../../public/images/paypal.svg";

const Account = () => {
  return (
    <AccountSettingLayout>
      <div>
        <div className="border border-[#E2E2E2] container mt-20 p-4 rounded-lg">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-2">
              <p className="font-medium">Payment Method</p>
            </div>
            <div className="col-span-12 xl:col-span-10">
              <p className="text-sm text-[#7F7F7F]">
                Your payment method is used to pay for your rentals. It can be a
                credit card or PayPal account. Please pick a payment method
              </p>
            </div>
          </div>
          <form className=" mt-4 ">
            <div className="p-4 border border-[#E2E2E2] rounded-t-lg">
              <div className="flex gap-2 flex-wrap">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-common checked:bg-common w-5 h-5"
                />
                <div className="mt-[5px]">
                  <Image className="h-3 border " src={icon1} alt="" />
                </div>
                <div className="mt-[5px]">
                  <Image className="h-3 border" src={icon2} alt="" />
                </div>
                <div className="mt-[5px]">
                  <Image className="h-4 border " src={icon3} alt="" />
                </div>
                <div className="mt-[5px]">
                  <Image className="h-4 border " src={icon4} alt="" />
                </div>
                <div className="mt-[5px]">
                  <Image className="h-4 border ml-5" src={icon5} alt="" />
                </div>
                <div className="mt-[5px]">
                  <Image className="h-4 border " src={icon6} alt="" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-normal text-[#7F7F7F]">
                    Debit/Credit Card
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-[#F5F5F5] rounded-b-xl">
              <div className="form-control p-4">
                <label className="label">
                  <span className="font-medium">Cardholder name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your cardholder name"
                  className="input input-bordered placeholder:text-sm focus:outline-none "
                />
              </div>
              <div className="form-control px-4">
                <label className="label">
                  <span className="font-medium">Credit Card Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your credit card number"
                  className="input input-bordered focus:outline-none placeholder:text-sm "
                />
              </div>
              <div className="grid grid-cols-12 gap-2 p-4">
                <div className="col-span-6 md:col-span-3 whitespace-nowrap xl:col-span-4 form-control">
                  <label className="label">
                    <span className="font-medium">Expiration Date </span>
                  </label>
                  <input
                    type="month"
                    placeholder="MM"
                    className="input focus:outline-none input-bordered placeholder:text-sm "
                  />
                </div>
                <div className="col-span-6 md:col-span-3 xl:col-span-4 form-control mt-6">
                  <label className="label"></label>
                  <input
                    type="text"
                    placeholder="YY"
                    className="input focus:outline-none input-bordered placeholder:text-sm "
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4 form-control">
                  <label className="label">
                    <span className="font-medium">CVV/CVC Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="000 / 0000"
                    className="input focus:outline-none input-bordered placeholder:text-sm "
                  />
                </div>
              </div>
            </div>
            <div className="flex border border-[#E2E2E2] bg-white mt-4 p-2 rounded-lg">
              <input
                type="radio"
                name="radio-1"
                className="radio radio-common checked:bg-common w-5 h-5 mt-2"
              />
              <div className="mt-[5px]">
                <Image className=" border ml-3" src={paypal} alt="" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-normal text-[#7F7F7F] mt-2">
                  Paypal
                </p>
              </div>
            </div>
            <button className="btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full mt-6 ">
              Update Payment Method
            </button>
          </form>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-10 border border-[#E2E2E2] rounded-lg p-4 mb-10 md:mb-20 xl:mb-[100px]">
          <div className="col-span-12 xl:col-span-3 ">
            <p className="font-medium">Deactivate / Close Account</p>
          </div>
          <div className="col-span-12 xl:col-span-9 ">
            <p className="text-sm text-[#7F7F7F] mt-1">
              Here you can deactivate your Go Velo account. This step can not be
              undone.
            </p>
          </div>
          <div className="col-span-12 mt-6 ">
            <button className="btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full ">
              Deactivate / Close Account
            </button>
          </div>
        </div>
      </div>
    </AccountSettingLayout>
  );
};

export default Account;
