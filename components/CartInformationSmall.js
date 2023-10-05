import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import minusIcon from "/public/images/minus.png";
import plusIcon from "/public/images/plus.png";
import { useMutation } from "@apollo/client";
import CloseBlack from "/public/images/close-black.png";
import {
  addToCartMutation,
  removeFromCartMutation,
} from "../common/queries/cart";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../redux/constants/cartConstants";

const CartInformationSmall = ({ cartItem }) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);

  const [addToCart] = useMutation(addToCartMutation);
  const [removeFromCart] = useMutation(removeFromCartMutation);

  const minusBtn = () => {
    removeFromCart({
      variables: {
        userId: String(JSON.parse(localStorage.getItem("userId"))),
        productId: cartItem?.node?.product?.id,
        quantity: 1,
      },
    }).then((res) => {
      dispatch({ type: REMOVE_FROM_CART, payload: res });
    });
  };

  const plusBtn = () => {
    addToCart({
      variables: {
        userId: String(JSON.parse(localStorage.getItem("userId"))),
        productId: cartItem?.node?.product?.id,
        quantity: 1,
      },
    }).then((res) => {
      dispatch({ type: ADD_TO_CART, payload: res });
    });
  };

  const removeItemFromAddToCart = () => {
    removeFromCart({
      variables: {
        userId: String(JSON.parse(localStorage.getItem("userId"))),
        productId: cartItem?.node?.product?.id,
        quantity: cartItem?.node?.quantity,
      },
    }).then((res) => {
      dispatch({ type: REMOVE_FROM_CART, payload: res });
    });
  };

  return (
    <div className="grid grid-cols-12 space-x-2 w-full border border-[#E2E2E2] rounded-[5px] my-4 p-4">
      <div className="col-span-4">
        {cartItem?.node?.product?.image ? (
          <img src={cartItem?.node?.product?.image} alt="cart item" />
        ) : (
          <p className="font-semibold flex justify-center items-center mt-5">
            No image
          </p>
        )}
      </div>
      <div className="col-span-8">
        <div className="flex items-center justify-between mb-4">
          {" "}
          <p className="font-semibold text-lg">
            {cartItem?.node?.product?.brand}
          </p>
          <Image
            onClick={() => removeItemFromAddToCart(cartItem)}
            src={CloseBlack}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={minusBtn}
              className=" border border-gray w-6 h-6 active:bg-common">
              <Image
                width={0}
                height={0}
                className="mx-auto"
                src={minusIcon}
                alt=""
              />
            </button>
            <p className=" ml-2 text-base font-semibold">
              {cartItem?.node?.quantity}
            </p>
            <button
              onClick={plusBtn}
              className=" ml-3 border border-gray w-6 h-6 active:bg-common ">
              <Image
                width={0}
                height={0}
                className="mx-auto"
                src={plusIcon}
                alt=""
              />
            </button>
          </div>
          <div>
            {/* {cartItem?.node?.product?.productrateSet?.map((rate) => (
              <p key={rate.id} className="text-xl font-semibold">
                {rate.rate} €
              </p>
            ))} */}
            <p className="text-xs md:text-xl font-semibold">
              {cartItem.node.product.productrateSet.map(
                (item) =>
                  item?.currency?.id == currency?.currency && (
                    <p className="l">
                      {item?.rate} {item?.currency?.code} /{" "}
                      {item?.rateType?.name}
                    </p>
                  )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInformationSmall;
