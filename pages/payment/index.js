import React from "react";
import icon1 from "/public/images/icon-1.png";
import icon2 from "/public/images/icon-2.png";
import icon3 from "/public/images/icon-3.png";
// import icon4 from "/public/images/icon-4.png";
import editicono from "/public/images/edit-blue.svg";
import mapicono from "/public/images/mapicon.png";
import Image from "next/image";
import Link from "next/link";
const Payment = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-12 mt-16 mb-5">
        <div className="col-span-6 ">
          <p className="text-2xl font-medium">Rent your bike</p>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                <li className="flex gap-2 items-center bg-white p-2">
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

                  <span className="text-black font-semibold">
                    {" "}
                    Rider Information
                  </span>
                </li>

                <li className="flex gap-2 items-center bg-white p-2">
                  <span className="rounded-full  bg-common  p-1.5 text-white font-bold">
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

                  <span className="text-black font-semibold"> Payment</span>
                </li>

                <li className="flex gap-2 items-center bg-white p-2 ">
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

                  <span className="text-black font-semibold">Summary</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="col-span-6"></div>
      </div>
      <div className="grid grid-cols-12 mt-7">
        <div className="col-span-6 border rounded-xl p-2 w-full h-[85%] ">
          <p className="text-xl font-medium mb-2">Payment Method</p>
          <div className="flex rounded-lg p-1">
            <input
              type="radio"
              name="radio-1"
              className="radio radio-common checked:bg-common w-5 h-5"
            />
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon1} alt="" />
            </div>
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon2} alt="" />
            </div>
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon3} alt="" />
            </div>
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon1} alt="" />
            </div>
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon1} alt="" />
            </div>
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon1} alt="" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-normal text-[#7F7F7F]">
                Debit/Credit Card
              </p>
            </div>
          </div>
          <form className="mt-4 bg-[#F5F5F5] rounded-xl">
            <div className="form-control">
              <label className="label">
                <span className="font-medium">Cardholder name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your cardholder name"
                className="input input-bordered placeholder:text-sm focus:outline-none "
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="font-medium">Credit Card Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter your credit card number"
                className="input input-bordered focus:outline-none placeholder:text-sm "
              />
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 form-control">
                <label className="label">
                  <span className="font-medium">Expiration Date </span>
                </label>
                <input
                  type="month"
                  placeholder="MM"
                  className="input focus:outline-none input-bordered placeholder:text-sm "
                />
              </div>
              <div className="col-span-4 form-control mt-6">
                <label className="label"></label>
                <input
                  type="text"
                  placeholder="YY"
                  className="input focus:outline-none input-bordered placeholder:text-sm "
                />
              </div>
              <div className=" col-span-4 form-control">
                <label className="label">
                  <span className="font-medium">CVV/CVC Number</span>
                </label>
                <input
                  type="text"
                  placeholder="YY"
                  className="input focus:outline-none input-bordered placeholder:text-sm "
                />
              </div>
            </div>
          </form>
          <div className="mt-4 flex border bg-white p-2 rounded-lg">
            <input
              type="radio"
              name="radio-1"
              className="radio radio-common checked:bg-common w-5 h-5"
            />
            <div className="mt-[5px]">
              <Image className="h-3 border ml-5" src={icon1} alt="" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-normal text-[#7F7F7F]">Paypal</p>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <form className="rounded-xl ml-8 border p-3">
            <p className="text-xl font-normal mb-4">Booking Overview </p>
            <div className="flex justify-between">
              <p>Pick-up/ Drop-off</p>
              <Link href="" className="flex text-common">
                <Image className="w-3 h-3 mt-1 mr-1" src={editicono} alt="" />
                Edit
              </Link>
            </div>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Los Angeles, USA 92012"
                className="input w-full bg-[#F5F5F5]  text-center pr-3 pl-11 focus:outline-none rounded-lg placeholder:text-xs placeholder:text-black"
              />
              <Image
                className="absolute top-4 h-5 ml-20 left-24 w-5"
                src={mapicono}
                alt=""
              />
            </div>
            <div className="flex justify-between">
              <p className="mt-4">Pick-up/ Dropoff Date & Time</p>
              <Link href="" className="flex text-common mt-4">
                <Image className="w-3 h-3 mt-1 mr-1" src={editicono} alt="" />
                Edit
              </Link>
            </div>
            <div className="relative flex">
              <input
                type="text"
                placeholder="12/28/22, 11:00 am - 12/28/22, 11:00 am"
                className="input w-full bg-[#F5F5F5]  text-center pr-3 pl-11 focus:outline-none rounded-lg placeholder:text-xs placeholder:text-black"
              />
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl">Security deposit fees</p>
              <p className="text-xl">15 €</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Subtotal</p>
              <p className="text-xl font-semibold">30 €</p>
            </div>
            <div className="divider"></div>
            <Link href="" className="text-common">
              + Add voucher/discount card
            </Link>
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Total amount</p>
              <p className="text-xl font-semibold">35 €</p>
            </div>
            <button className="normal-case font-normal btn bg-common w-full mt-3 mb-6 hover:bg-transparent hover:text-black">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
