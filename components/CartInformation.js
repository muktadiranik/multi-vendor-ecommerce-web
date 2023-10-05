import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import minusIcon from "/public/images/minus.png";
import plusIcon from "/public/images/plus.png";
import { useMutation } from "@apollo/client";
import {
  addToCartMutation,
  removeFromCartMutation,
} from "../common/queries/cart";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../redux/constants/cartConstants";

const CartInformation = ({ cartItem }) => {
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
    <div className="grid grid-cols-12 space-x-6 w-full border border-[#E2E2E2] rounded-[5px] my-4">
      <div className="col-span-full xl:col-span-5 rounded-lg">
        {cartItem?.node?.product?.image ? (
          <img
            className="h-full rounded-md"
            src={cartItem?.node?.product?.image}
            alt="cart item"
          />
        ) : (
          <p className="font-semibold flex justify-center items-center h-full">
            No image
          </p>
        )}
      </div>
      <div className="xl:col-span-7 lg:col-span-full col-span-full flex justify-between  ">
        <div className="py-6">
          <p className="font-semibold text-xl ">
            {cartItem?.node?.product?.brand}
          </p>
          <p className="">{cartItem?.node?.product?.brand}</p>
          <p className="mt-2">{cartItem?.node?.product?.description}</p>
          <button
            className="text-sm text-[#7F7F7F] mt-16 md:mt-16 xl:mt-16"
            onClick={() => removeItemFromAddToCart(cartItem)}>
            x Remove
          </button>
        </div>
        <div className="py-6 pr-6">
          {/* {cartItem?.node?.product?.productrateSet?.map((rate) => (
            <p key={rate.id} className="text-2xl font-semibold">
              {rate.rate} € / {rate.rateType.name}{" "}
            </p>
          ))} */}
          <p className="text-2xl font-semibold">
            {cartItem.node.product.productrateSet.map(
              (item) =>
                item?.currency?.id == currency?.currency && (
                  <p className="ftext-xl font-semibol">
                    {item?.rate}{" "}
                    {currency?.currencies?.map((item) => {
                      if (item?.id == currency?.currency) {
                        return item?.code;
                      }
                    })}{" "}
                    / {item?.rateType?.name}
                  </p>
                )
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={minusBtn}
              className="mt-24 border w-7 h-7 active:bg-common">
              <Image
                width={0}
                height={0}
                className="mx-auto"
                src={minusIcon}
                alt=""
              />
            </button>
            <p className="mt-24 ml-2 text-lg font-semibold">
              {cartItem?.node?.quantity}
            </p>
            <button
              onClick={plusBtn}
              className="mt-24 ml-3 border w-7 h-7 active:bg-common ">
              <Image
                width={0}
                height={0}
                className="mx-auto"
                src={plusIcon}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInformation;
