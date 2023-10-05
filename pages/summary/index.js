import Image from "next/image";
import Link from "next/link";
import React from "react";
import editicono from "/public/images/edit-blue.svg";
import mapicono from "/public/images/mapicon.png";
import editicon from "/public/images/material.png";
import OrderCard from "/components/summary/OrderCards";
import OrderRecivedModal from "/components/summary/OrderRecivedModal";

const Summary = () => {
  const fakedata = [
    {
      id: "1",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Super73 - RX",
      title: "E-Touring Bike",
      price: " 30 ",
      size: "Bike Size: Unisize",
    },
  ];

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
                  <span className="text-black  font-semibold">Summary</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="col-span-6"></div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-6 mt-6">
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-6 border p-2 rounded-lg">
              <div className="flex justify-between">
                <p className="text-lg font-medium">Rider Information</p>
                <button className="flex">
                  <Image className="w-3 h-3 mt-[6px]" src={editicon} alt="" />{" "}
                  Edit
                </button>
              </div>
              <p className="text-[#7F7F7F] text-lg mt-6">John Doe</p>
              <p className="text-[#7F7F7F] text-lg mt-1">
                Yacht Club Drive Northeast 11 32548 United States
              </p>
              <p className="text-[#7F7F7F] text-lg mt-1">
                Yacht Club Drive Northeast 11 32548 United States
              </p>
            </div>
            <div className="col-span-6 border p-2 rounded-lg">
              <div className="flex justify-between">
                <p className="text-lg font-medium">Payment</p>
                <button className="flex">
                  <Image className="w-3 h-3 mt-[6px]" src={editicon} alt="" />{" "}
                  Edit
                </button>
              </div>
              <div className="flex mt-10 bg-[#F5F5F5] p-3 rounded-xl">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-common checked:bg-common w-5 h-5 mr-4"
                />
                <p className="text-[#7F7F7F] text-sm">John Doe</p>
              </div>
            </div>
          </div>
          <p className="text-lg font-medium mt-8 mb-4">Order Details</p>
          <div>
            {fakedata.map((data) => (
              <OrderCard key={data.id} data={data} />
            ))}
          </div>
        </div>
        <div className="col-span-6">
          <form className="mt-6 ml-8 border rounded-xl p-3">
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
            <label
              htmlFor="my-modal"
              className="normal-case font-normal btn bg-common w-full mt-3 mb-6 hover:bg-transparent hover:text-black">
              Continue
            </label>
            <OrderRecivedModal />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Summary;
