import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import editicono from "/public/images/edit-blue.svg";
import mapicono from "/public/images/mapicon.png";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { createOrderMutation } from "../../common/queries/order";
import { RESET_CART } from "../../redux/constants/cartConstants";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

const CheckOutRidersInfo = () => {
  const [address, setAddress] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [areaCode, setAreaCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  const { cart } = useSelector((state) => state.cart);

  const carts = cart?.carts?.edges[0]?.node?.cartitemSet?.edges;

  let price = 0;

  for (let i = 0; i < carts?.length; i++) {
    price += Number(carts[i]?.node?.price * carts[i]?.node?.quantity);
  }

  const buttonRef = useRef(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const [createOrder] = useMutation(createOrderMutation);

  const placeOrderOnSuccess = (details, data) => {
    createOrder({
      variables: {
        cartId: localStorage.getItem("cartId"),
        paymentMethod: data.paymentSource,
        isPaid: true,
        isDelivered: false,
        address: address,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        areaCode: areaCode,
        country: country,
        phone: phone,
        createTime: details.create_time,
        updateTime: details.update_time,
        paymentId: details.id,
        paymentOrderId: data.orderID,
        intent: details.intent,
        payerCountryCode: details.payer.address.country_code,
        payerEmail: details.payer.email_address,
        payerId: details.payer.payer_id,
        payerName:
          details.payer.name.given_name + " " + details.payer.name.surname,
        purchaseAmount: details.purchase_units[0].amount.value,
        purchaseCurrencyCode: details.purchase_units[0].amount.currency_code,
        purchaseUnitsReferenceId: details.purchase_units[0].reference_id,
        purchaseShippingAddress: JSON.stringify(
          details.purchase_units[0].shipping.address
        ),
        purchaseShippingName: details.purchase_units[0].shipping.name.full_name,
        status: details.status,
      },
    }).then(() => {
      dispatch({ type: RESET_CART, payload: null });
      router.push("/rent-bike");
    });
  };

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AXigRnB2unIsxPcJI29_S4TJrTz-KiV4WeMqNHnPHMBkH7enP06efw0peuVvlLij_M4jq8OPepBmXQQl";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-6 mt-16 mb-5">
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
                    Shipping Information
                  </span>
                </li>
                <li className="flex gap-2 items-center bg-white p-2">
                  <span className="rounded-full bg-[#6E6E6E]  p-1.5 text-white font-bold">
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
          <form className="border w-full mt-6 p-3 rounded-xl">
            <div className="flex w-full gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Address <span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="input w-full focus:outline-none  input-bordered  rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Street and Number<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your street"
                      className="input w-full input-bordered focus:outline-none   rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    City <span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your city name"
                      className="input w-full focus:outline-none input-bordered  rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    State<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your state name"
                      className="input w-full focus:outline-none  input-bordered  rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Phone<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter your phobe number"
                      className="input w-full focus:outline-none  input-bordered  rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    ZIP Code<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your zip code"
                      className="input w-full input-bordered focus:outline-none   rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Area Code<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your area code"
                      className="input w-full focus:outline-none  input-bordered  rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setAreaCode(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Country<span className="text-common">*</span>
                  </span>
                </label>
                <div className="w-full ">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your country name"
                      className="input w-full input-bordered focus:outline-none   rounded-xl placeholder:text-xs"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    ref={buttonRef}
                    className="btn btn-primary w-full mt-4 hidden"></input>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-6 mb-32">
          <form
            className="mt-16 ml-8 border rounded-xl p-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <p className="text-xl font-normal mb-4">Booking Overview </p>
            <div className="flex justify-between">
              <p>Pick-up/ Drop-off</p>
              <Link href="" className="flex text-common">
                <Image
                  className="w-3 h-3 mt-1 mr-1"
                  src={editicono}
                  alt="editicono"
                />
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
                alt="mapicono"
              />
            </div>
            <div className="flex justify-between">
              <p className="mt-4">Pick-up/ Dropoff Date & Time</p>
              <Link href="" className="flex text-common mt-4">
                <Image
                  className="w-3 h-3 mt-1 mr-1"
                  src={editicono}
                  alt="editicono"
                />
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
              <p className="text-xl">0 €</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Subtotal</p>
              <p className="text-xl font-semibold">{price} €</p>
            </div>
            <div className="divider"></div>
            <Link href="" className="text-common">
              + Add voucher/discount card
            </Link>
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Total amount</p>
              <p className="text-xl font-semibold">{price} €</p>
            </div>
            <button
              className="normal-case font-normal btn bg-common hover:bg-common w-full mt-3 mb-6 hidden"
              onClick={() => {
                buttonRef.current.click();
              }}>
              Continue
            </button>
            {scriptLoaded ? (
              <PayPalButton
                amount={price}
                onSuccess={(details, data) =>
                  placeOrderOnSuccess(details, data)
                }
              />
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOutRidersInfo;
