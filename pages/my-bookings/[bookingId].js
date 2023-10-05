import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import shopimage from "/public/images/shop-image.png";
import Image from "next/image";
import Review from "/public/images/booking-details.png";
import { getBookingsItems } from "../../common/queries/booking";
import { client } from "/graphql/apolloClient";
import BookingReviewModal from "../../components/BookingReviewModal";
import { MdOutlineRateReview } from "react-icons/md";

const BookingDetails = ({ bookingItems }) => {
  const [productId, setProductId] = useState("");
  const [userId, setuserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setuserId(userId);
  }, []);

  return (
    <>
      <div className="container mt-10 mb-24">
        <div className="grid grid-cols-12">
          <div className="col-span-8 md:col-span-4 flex lg:flex-row">
            <p className="text-sm md:text-2xl whitespace-nowrap font-medium">
              My Booking Details
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-full">
            <div className="overflow-x-auto w-full h-full">
              <table className="table w-full">
                <thead>
                  <tr className="">
                    <th className="font-normal normal-case text-sm">Bike</th>
                    <th className="font-normal normal-case text-sm">Shop</th>

                    <th className="font-normal normal-case text-sm">
                      Quantity
                    </th>
                    <th className="font-normal normal-case text-sm">
                      Write Review
                    </th>
                  </tr>
                </thead>

                {bookingItems?.map((data) => (
                  <tbody key={data.id} className="bg-[#E2E2E2]">
                    <tr>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center gap-2">
                            <div className="font-bold">
                              {" "}
                              {data?.product?.image ? (
                                <Image
                                  src={data?.product?.image}
                                  alt={data?.product?.brand}
                                  width={80}
                                  height={80}
                                  className="rounded-full mr-3"
                                />
                              ) : (
                                <p className="whitespace-normal  rounded-full border p-1 mr-3 font-semibold text-center">
                                  No image
                                </p>
                              )}
                            </div>
                            <div className="">{data?.product?.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            {data?.product?.shop?.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">{data?.quantity}</div>
                        </div>
                      </td>

                      <td>
                        <label
                          onClick={() => setProductId(data?.product?.id)}
                          htmlFor="booking-review-modal"
                          className="flex items-center space-x-3 cursor-pointer">
                          <MdOutlineRateReview className="text-2xl" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <BookingReviewModal productId={productId} userId={userId} />
    </>
  );
};

export async function getServerSideProps(context) {
  const orderId = context?.query;

  const { data } = await client.query({
    query: getBookingsItems,
    variables: {
      orderId: orderId?.bookingId,
    },
  });
  return {
    props: {
      bookingItems: data?.orderItemByOrderId,
    },
  };
}

export default BookingDetails;
