import React from "react";
import location from "/public/images/mapicon.png";
import { useMutation } from "@apollo/client";
import { addToCartMutation } from "../common/queries/cart";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "/redux/constants/cartConstants";
import Image from "next/image";
import CustomRating from "./CustomRating";
import Link from "next/link";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ productItem, productId }) => {
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.currency);

  const [addToCart, { data, loading, error }] = useMutation(addToCartMutation);

  const [src, setSrc] = React.useState("https://i.imgur.com/gf3TZMr.jpeg");

  const add = (id) => {
    addToCart({
      variables: {
        userId:
          localStorage.getItem("userId") &&
          String(JSON.parse(localStorage.getItem("userId"))),
        productId: id,
        quantity: 1,
      },
    }).then((res) => {
      dispatch({ type: ADD_TO_CART, payload: res.data.addToCart });
      toast.success("Added to cart");
    });
  };

  let { defaultSrc } = productItem;

  const alt = "No image";

  return (
    <div className="grid grid-cols-12 card-side bg-base-100  w-full border border-gray p-4 xl:p-5 rounded mb-3 ">
      <div className="col-span-12 grid grid-cols-12 gap-3">
        <div
          className={
            productId
              ? "lg:col-span-2 md:col-span-4 col-span-full"
              : "col-span-12 md:col-span-6 xl:col-span-3 flex justify-center items-center"
          }>
          <Link
            href={`/details/[id]?id=${productItem?.node?.id}`}
            as={`/details/${productItem?.node?.id}`}>
            {productItem?.node?.image ? (
              <img
                src={productItem?.node?.image}
                alt={alt}
                className="h-[200px] w-[311px] lg:w-[311px]  md:w-[200px] md:h-[200px] xl:h-[167px]"
                onError={(e) => {
                  e.target.src = defaultSrc;
                }}
              />
            ) : (
              "No image"
            )}
          </Link>
        </div>
        <div
          className={
            productId
              ? "col-span-12 xl:col-span-10 grid grid-cols-12 lg:col-span-10 md:col-span-8"
              : "col-span-12 md:col-span-6 xl:col-span-9 grid grid-cols-12"
          }>
          <div
            className={
              productId
                ? "col-span-6 md:col-span-6"
                : "col-span-6 md:col-span-12 xl:col-span-6"
            }>
            <Link
              href={`/details/[id]?id=${productItem?.node?.id}`}
              as={`/details/${productItem?.node?.id}`}>
              <p className="font-semibold  md:text-xl xl:text-3xl">
                {productItem?.node?.brand}
              </p>
            </Link>
            <div className="">
              <div className="my-[10px] md:my-1 xl:my-4 flex items-center gap-4">
                <p className="text-xs xl:text-base whitespace-nowrap">
                  {productItem?.node?.productType?.name}{" "}
                </p>
                <p className="w-1 h-1 rounded-full bg-gray-deep "></p>
                <p className="text-xs xl:text-base ">
                  Bike Size: {productItem?.node?.size?.productSize}
                </p>
              </div>
              <div className="flex items-center gap-2 my-[10px] md:my-0 text-xs xl:text-base">
                Booking Status:{" "}
                {productItem?.node?.isAvailable ? (
                  <button className="bg-green rounded-full text-[10px] xl:text-sm text-white py-0.5 px-1">
                    Available
                  </button>
                ) : (
                  <button className="bg-red rounded-full text-[10px] xl:text-sm text-white py-0.5 px-1">
                    Not Available
                  </button>
                )}
              </div>
              <div className="flex items-center mt-4 xl:mt-4 w-full ">
                <p className="bg-common w-5 h-5 xl:w-7 xl:h-7 flex items-center justify-center  text-xs rounded-lg text-white">
                  {productItem?.node?.rating.toFixed(1)}{" "}
                </p>
                <CustomRating value={productItem?.node?.rating} />
                <p className="text-gray-400 ml-1 mt-[-3] text-sm">
                  {`(${productItem?.node?.totalReviews})`}
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              productId
                ? "col-span-6 md:col-span-6 xl:col-span-6 flex flex-col items-end md:items-end  xl:items-end"
                : "col-span-6 md:col-span-12 xl:col-span-6 flex flex-col items-end md:items-start  xl:items-end"
            }>
            <div className="flex  gap-3 text-right mt-[10px] xl:mt-0 p-1">
              <Image src={location} alt="" className="w-2 h-4 xl:w-4 xl:h-6" />
              <p className="text-[10px] xl:text-base md:text-sm text-common  font-normal  capitalize inline-block">
                {productItem?.node?.shop?.state},{" "}
                {productItem?.node?.shop?.country}
              </p>
            </div>
            <div className="my-[10px] md:my-1 xl:my-4 flex flex-col text-right xl:items-end">
              <div key={productItem?.node?.productrateSet[0]?.rate?.id}>
                {productItem?.node?.productrateSet.map(
                  (item) =>
                    item?.currency?.id == currency?.currency && (
                      <p className="font-semibold text-sm xl:text-2xl md:text-2xl">
                        {item?.rate} {item?.currency?.code} /{" "}
                        {item?.rateType?.name}
                      </p>
                    )
                )}
              </div>
            </div>
            <button
              className="text-white whitespace-nowrap bg-common px-3 py-[6px] xl:px-[30px] xl:py-[11px] font-medium text-sm rounded-md"
              onClick={() => add(productItem?.node?.id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
