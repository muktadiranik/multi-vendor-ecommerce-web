import React from "react";
import Link from "next/link";
import Image from "next/image";
import map from "/public/images/map.png";
import editicon from "/public/images/material.png";
import calenderIcon from "/public/images/calender.png";
import timeicon from "/public/images/time.png";
import Close from "/public/images/close.png";
import { useSelector } from "react-redux";
import CartInformationSmall from "../components/CartInformationSmall";
import { useRouter } from "next/router";

const AddToCart = ({ setShowAddToCartModal }) => {
  const router = useRouter();

  const { cart } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.currency);

  const carts = cart?.carts?.edges[0]?.node?.cartitemSet?.edges;

  let price = 0;

  for (let i = 0; i < carts?.length; i++) {
    const currentRate = carts[i]?.node?.product.productrateSet.map((item) => {
      if (item.currency.id == currency.currency) {
        price += Number(item.rate * carts[i]?.node?.quantity);
      }
    });
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 ">
      <div className="grid grid-cols-12">
        <div className=" md:col-span-6 xl:col-span-8"></div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-4 bg-white pt-8 px-4 h-[100vh]">
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => setShowAddToCartModal(false)}>
            <Image src={Close} />
          </div>
          {/* <p className="text-2xl ml-2 font-medium mb-6">Add to cart</p> */}
          <div className="max-h-[65vh] overflow-auto hide-scrollbar">
            {cart?.carts?.edges[0]?.node?.cartitemSet?.edges?.map((item) => (
              <CartInformationSmall key={item?.node?.id} cartItem={item} />
            ))}
          </div>
          {/* <div className='flex justify-between mb-3'>
            <p className='text-xl'>Security deposit fees</p>
            <p className='text-xl'>15 €</p>
          </div> */}
          {cart?.carts?.edges[0]?.node?.cartitemSet?.edges.length == 0 && (
            <p className="text-center text-2xl font-semibold text-green">
              Please Add a Bike
            </p>
          )}
          <div className="divider m-0 mt-10"></div>
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Subtotal</p>
            <p className="text-xl font-semibold">
              {price.toFixed(2)}{" "}
              {currency?.currencies?.map((item) => {
                if (item?.id == currency?.currency) {
                  return item?.code;
                }
              })}
            </p>
          </div>
          <button
            onClick={() => setShowAddToCartModal(false, router.push("/cart"))}
            disabled={
              cart?.carts?.edges[0]?.node?.cartitemSet?.edges.length == 0
            }
            className="flex justify-center items-center mt-9 border rounded-[10px] bg-common text-white text-base font-medium py-3 w-full">
            Go to cart
          </button>
          {/* <button className="flex justify-center items-center mt-4 border rounded-[10px] bg-blue text-white text-base font-medium py-3 w-full">
            Checkout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
