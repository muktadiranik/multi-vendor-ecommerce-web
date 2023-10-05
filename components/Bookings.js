import Image from "next/image";
import React, { useEffect, useState } from "react";
import shopimage from "/public/images/shop-image.png";
import rightIcon from "/public/images/righticon.png";
import menubutton from "/public/images/menu-button.png";
import cancelicon from "/public/images/cancel icon.png";
import refund from "/public/images/refund.png";
import Booking from "/public/images/booking-details.png";
import RefundModal from "./RefundModal/RefundModal";
import { client } from "/graphql/apolloClient";
import { getBookingsMutation } from "../common/queries/booking";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { updateBooking } from "../common/queries/booking";
import PaginatedItems from "./Pagination";
import { useSelector } from "react-redux";

const Bookings = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(false);
  const [currentData, setCurrentData] = useState([]);

  const currency = useSelector((state) => state.currency);

  useEffect(() => {
    let arr = [];
    if (localStorage.getItem("userId")) {
      const getBookings = async () => {
        const { data } = await client.query({
          query: getBookingsMutation,
          variables: {
            userId:
              localStorage.getItem("userId") && localStorage.getItem("userId"),
          },
        });
        for (let i = 0; i < data?.orderByUserId?.length; i++) {
          arr.push({
            ...data?.orderByUserId[i],
            count: data?.orderByUserId?.length - i,
          });
        }
        setBookings(arr);
      };

      getBookings();
    } else {
      router.push("/login");
    }
  }, [status]);

  const [updateOrder, { data, loading, error }] = useMutation(updateBooking);

  const handleBookingStatus = (clue, data) => {
    setStatus(clue);
    if (clue === "CANCELLED") {
      updateOrder({
        variables: {
          id: data,
          isCancelled: true,
          refundRequested: false,
        },
      });
    } else if (clue === "REFUNDED") {
      updateOrder({
        variables: {
          id: data,
          isCancelled: false,
          refundRequested: true,
        },
      });
    }
  };

  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
  };

  return (
    <div className="container mt-10 ">
      <RefundModal />
      <div className="grid grid-cols-12">
        <div className="col-span-8 md:col-span-4 flex lg:flex-row">
          <div className="flex justify-center items-center">
            <p className="text-sm md:text-2xl whitespace-nowrap font-medium">
              My Booking
            </p>
          </div>
          {/* <select className="select select-bordered w-full max-w-xs mt-3 md:mt-4 ml-5">
            <option className="">All bookings</option>
            <option>Active bookings</option>
            <option>Past bookings</option>
            <option>Canceled booking</option>
          </select> */}
        </div>
      </div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-full">
          <div className="overflow-x-auto w-full h-[600px]">
            <table className="table w-full">
              <thead>
                <tr className="">
                  {/* <th>
                    <label>
                      <input type="checkbox" className="h-4 w-4 rounded-sm" />
                    </label>
                  </th> */}
                  <th className="font-normal normal-case text-sm">Order No</th>
                  <th className="font-normal normal-case text-sm">Status</th>
                  <th className="font-normal normal-case text-sm">Pickup</th>
                  <th className="font-normal normal-case text-sm">Dropoff</th>
                  <th className="font-normal normal-case text-sm">
                    Price ( Include Deposit)
                  </th>
                  <th className="font-normal normal-case text-sm">Action</th>
                </tr>
              </thead>
              {currentData?.map((data, index) => (
                <tbody key={data?.id} className="bg-[#E2E2E2]">
                  <tr>
                    {/* <th>
                      <label>
                        <input type="checkbox" className="h-4 w-4 rounded-sm" />
                      </label>
                    </th> */}
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="flex gap-1">
                          <div className="font-bold">
                            {" "}
                            <p>{data?.count}</p>
                          </div>
                          <div className="">{data?.Renter}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={
                          data?.status === "PENDING"
                            ? "bg-[#74CC20] rounded-full w-4 btn btn-xs outline-none text-white text-center px-8  hover:bg-[#74CC20]"
                            : data?.status === "PAST"
                            ? "bg-common rounded-full w-4 btn btn-xs outline-none text-white text-center px-6  hover:bg-common"
                            : data?.status === "CANCELLED"
                            ? "bg-[#F72D00] rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 hover:bg-[#F72D00]"
                            : data?.status === "REFUNDED"
                            ? "bg-yellow rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 "
                            : data?.status === "ACTIVE"
                            ? "bg-green rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 "
                            : data?.status === "DELIVERED"
                            ? "bg-[#00caf7] rounded-full w-4 btn btn-xs outline-none text-white text-center hover:bg-[#00caf7] px-10"
                            : ""
                        }>
                        <p className=" font-normal"> {data?.status}</p>
                      </div>
                    </td>
                    <td>
                      <div className="text-common flex gap-5">
                        <p>
                          {data?.deliveredAt ? (
                            data?.deliveredAt
                          ) : (
                            <p className="opacity-40 text-black">
                              Delivered Date
                            </p>
                          )}
                        </p>
                        <Image
                          className="w-6 h-4 mt-1"
                          src={rightIcon}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="">
                      {data?.returnedAt ? (
                        data?.returnedAt
                      ) : (
                        <p className="opacity-40">Returned Date</p>
                      )}{" "}
                    </td>
                    <td className="">
                      {data?.paymentinformationSet?.edges?.map((item) => {
                        return item?.node?.purchaseAmount;
                      })}{" "}
                      {data?.paymentinformationSet?.edges?.map((item) => {
                        return item?.node?.purchaseCurrencyCode;
                      })}
                    </td>
                    <td>
                      <div className="dropdown dropdown-left w-32 z-50">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost m-1 hover:bg-white">
                          <Image src={menubutton} alt="" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-50 menu p-2 shadow rounded-box bg-white">
                          {data?.status !== "CANCELLED" &&
                            data?.status !== "REFUNDED" &&
                            data?.status !== "PAST" && (
                              <li
                                onClick={() =>
                                  handleBookingStatus("CANCELLED", data?.id)
                                }>
                                <a className="flex">
                                  {" "}
                                  <Image src={cancelicon} alt="" /> Cancel
                                </a>
                              </li>
                            )}
                          {data?.status !== "REFUNDED" &&
                            data?.status !== "CANCELLED" && (
                              <li
                                onClick={() =>
                                  handleBookingStatus("REFUNDED", data?.id)
                                }>
                                {/* htmlFor="refund-modal" */}
                                <label className="">
                                  {" "}
                                  <a className="flex gap-3">
                                    <Image className="" src={refund} alt="" />{" "}
                                    Refund
                                  </a>
                                </label>
                              </li>
                            )}
                          <li
                            onClick={() =>
                              router.push(`/my-bookings/${data?.id}`)
                            }>
                            <a className="flex gap-3">
                              <Image className="" src={Booking} alt="" />{" "}
                              Booking Details
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="mt-0 mb-[50px] md:mt-0 md:mb-[110px] xl:mt-0 xl:mb-[110px]">
        <PaginatedItems
          itemsPerPage={5}
          getCurrentItems={getCurrentItems}
          items={bookings}
        />
      </div>
    </div>
  );
};

export default Bookings;
