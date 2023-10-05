import Image from "next/image";
import React, { useEffect, useState } from "react";
import shopimage from "/public/images/shop-image.png";
import rightIcon from "/public/images/righticon.png";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { useForm } from "react-hook-form";
import { getShopByUserId, orderItems } from "../../common/queries/shop";
import { client } from "/graphql/apolloClient";
import PaginatedItems from "../../components/Pagination";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import menubutton from "../../public/images/menu-button.png";
import { useMutation } from "@apollo/client";
import { updateBooking } from "../../common/queries/booking";

const MyOrders = () => {
  const router = useRouter();

  const currency = useSelector((state) => state.currency);
  const shop = useSelector((state) => state.shop);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const [orders, setOrders] = useState([]);
  const [shopId, setShopId] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const [status, setStatus] = useState(false);

  const [updateOrder, { data, loading, error }] = useMutation(updateBooking);

  useEffect(() => {
    setOrders([]);
    if (shop?.shop?.shops?.edges[0]?.node?.id) {
      const getOrders = async () => {
        const { data } = await client.query({
          query: orderItems,
          variables: {
            shopId: shop?.shop?.shops?.edges[0]?.node?.id,
          },
        });
        setOrders(data?.orderItems?.edges);
      };
      getOrders();
    }
  }, [status, shop?.shop?.shops?.edges[0]?.node?.id]);

  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
  };

  const handleBookingStatus = (clue, data) => {
    setStatus(clue);
    if (clue == "DELIVERED") {
      updateOrder({
        variables: {
          id: data,
          isDelivered: true,
        },
      });
    } else if (clue === "CANCELLED") {
      updateOrder({
        variables: {
          id: data,
          isCancelled: true,
          refundRequested: false,
        },
      });
    }
  };

  return (
    <div>
      <div className="container mt-10 ">
        <div className="grid grid-cols-12">
          <div className="col-span-8 lg:col-span-4 flex xl:flex-row">
            <div className="flex justify-center items-center">
              <p className="text-sm md:text-2xl whitespace-nowrap font-medium">
                My Orders
              </p>
            </div>
            {/* <select className="select select-bordered w-full max-w-xs mt-3 md:mt-4 ml-5 ">
              <option className="">All Orders</option>
              <option>Active Orders</option>
              <option>Past Orders</option>
              <option>Canceled Orders</option>
            </select> */}
          </div>
        </div>
        <div className="grid grid-cols-12 mt-[18px] lg:mt-6">
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
                    <th className="font-normal normal-case text-sm">
                      Order bikes
                    </th>
                    <th className="font-normal normal-case text-sm">Status</th>
                    <th className="font-normal normal-case text-sm">Pickup</th>
                    <th className="font-normal normal-case text-sm">Dropoff</th>
                    <th className="font-normal normal-case text-sm">Price</th>
                    <th className="font-normal normal-case text-sm">
                      Payment Status
                    </th>
                    <th className="font-normal normal-case text-sm">
                      Delivered
                    </th>
                  </tr>
                </thead>
                {currentData.map((data) => (
                  <tbody key={data?.node?.id} className="bg-[#E2E2E2]">
                    <tr>
                      {/* <th>
                        <label>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-sm"
                          />
                        </label>
                      </th> */}
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center gap-1">
                            <div className="font-bold">
                              {" "}
                              {data?.node?.product?.image ? (
                                <Image
                                  width={50}
                                  height={50}
                                  className="rounded-full"
                                  src={data?.node?.product?.image}
                                />
                              ) : (
                                <p className="whitespace-normal text-center font-semibold">
                                  No image
                                </p>
                              )}
                            </div>
                            <div className="">{data?.node?.product?.model}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className={
                            data?.node?.order?.status === "ACTIVE"
                              ? "bg-green rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 "
                              : data?.node?.order?.status === "PAST"
                              ? "bg-common rounded-full w-4 btn btn-xs outline-none text-white text-center px-6  hover:bg-common"
                              : data?.node?.order?.status === "CANCELLED"
                              ? "bg-[#F72D00] rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 hover:bg-[#F72D00]"
                              : data?.node?.order?.status === "PENDING"
                              ? "bg-[#f700b9] rounded-full btn btn-sm outline-none text-white text-center hover:bg-[#f700b9]"
                              : data?.node?.order?.status === "DELIVERED"
                              ? "bg-[#00caf7] rounded-full btn btn-sm outline-none text-white text-center hover:bg-[#00caf7]"
                              : data?.node?.order?.status === "REFUNDED"
                              ? "bg-yellow rounded-full w-4 btn btn-xs outline-none text-white text-center px-10 hover:bg-yellow"
                              : ""
                          }>
                          <p className="normal-case font-normal">
                            {" "}
                            {data?.node?.order?.status}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="text-common flex gap-5">
                          <p>{data?.node?.order?.deliveredAt}</p>
                          <Image
                            className="w-6 h-4 mt-1"
                            src={rightIcon}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="">{data?.node?.order?.returnedAt} </td>
                      <td className="">
                        {data?.node?.product?.productrateSet?.map((item) => {
                          if (item?.currency?.id == currency?.currency) {
                            return item?.rate;
                          }
                        })}{" "}
                        {data?.node?.product?.productrateSet?.map((item) => {
                          if (item?.currency?.id == currency?.currency) {
                            return item?.currency?.code;
                          }
                        })}
                        /
                        {data?.node?.product?.productrateSet?.map((item) => {
                          if (item?.currency?.id == currency?.currency) {
                            return item?.rateType?.name;
                          }
                        })}
                      </td>
                      <td>
                        <div
                          className={
                            data?.node?.order?.isPaid === true
                              ? "bg-[#74CC20] rounded-full w-4 btn btn-xs outline-none text-white text-center px-6  hover:bg-[#74CC20]"
                              : data?.node?.order?.isPaid === false
                              ? "bg-[#FF7632] rounded-full w-4 btn btn-xs outline-none text-white text-center px-8   hover:bg-common"
                              : ""
                          }>
                          <p className="normal-case font-normal">
                            {" "}
                            {data?.node?.order?.isPaid ? "Paid" : "Unpaid"}
                          </p>
                        </div>
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
                            className="dropdown-content z-50 menu p-2 shadow-xl rounded-box bg-white">
                            {data?.node?.order?.status !== "DELIVERED" &&
                              data?.node?.order?.status !== "CANCELLED" &&
                              data?.node?.order?.status !== "REFUNDED" && (
                                <li
                                  onClick={() =>
                                    handleBookingStatus(
                                      "DELIVERED",
                                      data?.node?.order?.id
                                    )
                                  }>
                                  <a className="flex"> Delivered</a>
                                </li>
                              )}
                            {data?.node?.order?.status !== "CANCELLED" &&
                              data?.node?.order?.status !== "DELIVERED" && (
                                <li
                                  onClick={() =>
                                    handleBookingStatus(
                                      "CANCELLED",
                                      data?.node?.order?.id
                                    )
                                  }>
                                  <a className="flex"> Cancel</a>
                                </li>
                              )}
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
        <div className="mt-9 mb-[50px] md:mt-12 md:mb-[110px] xl:mt-9 xl:mb-[110px]">
          <PaginatedItems
            itemsPerPage={5}
            getCurrentItems={getCurrentItems}
            items={orders}
          />
        </div>
        {/* <div className="mt-[34px] lg:mt-12 xl:mt-[38px]  mb-12 lg:mb-28 flex justify-center items-center">
          <button
            onClick={handlePrevious}
            type="button"
            className=" text-base font-bold m-2">
            <span className="">Prev</span>
          </button>
          {orders &&
            [...Array(pageCount).keys()].map((number) => (
              <button
                onClick={() => setCurrentPage(number)}
                className={`m-2${
                  currentPage === number
                    ? "btn btn-sm btn-active text-white bg-common rounded-md mx-[6px]"
                    : "btn btn-sm text-[#C3C3C3] border border-[#C3C3C3] mx-[6px] rounded-md"
                }`}>
                {number + 1}
              </button>
            ))}
          <button
            onClick={handleNext}
            type="button"
            className="m-2 text-base font-bold">
            <span className="">Next</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MyOrders;
