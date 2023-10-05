import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import editicono from "/public/images/edit-blue.svg";
import mapicono from "/public/images/mapicon.png";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { createOrderMutation } from "../common/queries/order";
import { RESET_CART } from "../redux/constants/cartConstants";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const CheckOutRidersInfo = ({
  price,
  total,
  startDate,
  endDate,
  depositAmount,
  duration,
  location,
}) => {
  const [address, setAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [areaCode, setAreaCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const currency = useSelector((state) => state.currency);

  const buttonRef = useRef(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const [createOrder] = useMutation(createOrderMutation);
  const placeOrderOnSuccess = (details, data) => {
    if (
      address == null &&
      street == null &&
      city == null &&
      state == null &&
      zipCode == null &&
      areaCode == null &&
      country == null &&
      phone == null
    ) {
      toast.error("Please fill this form properly", { toastId: "GO_VELO" });
    } else {
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
          deliveredAt: startDate.toISOString(),
          returnedAt: endDate.toISOString(),
          duration: duration,
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
          purchaseShippingName:
            details.purchase_units[0].shipping.name.full_name,
          status: details.status,
          totalPrice: total,
        },
      }).then(() => {
        dispatch({ type: RESET_CART, payload: null });
        router.push("/rent-bike");
      });
    }
  };

  const addPaypalScript = () => {
    setScriptLoaded(false);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?currency=${currency?.currencySymbol}&client-id=AXigRnB2unIsxPcJI29_S4TJrTz-KiV4WeMqNHnPHMBkH7enP06efw0peuVvlLij_M4jq8OPepBmXQQl`;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, [currency]);

  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-6 mt-9 md:mt-16 mb-5">
          <p className="text-2xl font-medium">Rent your bike</p>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="md:col-span-6 col-span-full">
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
                {/* <li className="flex gap-2 items-center bg-white p-2">
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
                </li> */}
                {/* <li className="flex gap-2 items-center bg-white p-2 ">
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
                </li> */}
              </ol>
            </div>
          </div>
          <form className="border border-[#E2E2E2] w-full mt-6 p-3 rounded-xl">
            <div className="xl:flex w-full gap-3">
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
                    Street Number<span className="text-common">*</span>
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
            <div className="xl:flex w-full gap-3">
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
            <div className="xl:flex w-full gap-3">
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
            <div className="xl:flex w-full gap-3">
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
        <div className="md:col-span-6 col-span-full mb-10 md:mb-32">
          <form
            className="mt-4 md:mt-16 md:ml-8 border border-[#E2E2E2] rounded-xl p-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <p className="text-xl font-normal mb-4">Booking Overview</p>
            <div className="flex justify-between">
              {/* <p>Pick-up/ Drop-off</p> */}
              <p className="mb-1">Location</p>
              {/* <Link href="" className="flex text-common">
                <Image
                  className="w-3 h-3 mt-1 mr-1"
                  src={editicono}
                  alt="editicono"
                />
                Edit
              </Link> */}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your pick-up location"
                value={location}
                disabled
                className="input w-full bg-[#F5F5F5]  pr-3 pl-11 focus:outline-none rounded-lg placeholder:text-xs"
              />
            </div>
            {/* <div className="relative flex">
              <input
                type="text"
                placeholder="Los Angeles, USA 92012"
                className="input w-full bg-[#F5F5F5]  text-center pr-3 pl-11 focus:outline-none rounded-lg placeholder:text-xs placeholder:text-black"
              />
              <Image
                className="absolute top-4 h-5 xl:ml-20 left-20 md:left-36  w-5"
                src={mapicono}
                alt="mapicono"
              />
            </div> */}
            <div className="flex justify-between">
              <p className="mt-4 mb-1">Pick-up/ Dropoff Date & Time</p>
              {/* <Link href="" className="flex text-common mt-4">
                <Image
                  className="w-3 h-3 mt-1 mr-1"
                  src={editicono}
                  alt="editicono"
                />
                Edit
              </Link> */}
            </div>
            <div className="relative flex py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full">
              <DatePicker
                className="w-full text-center border-none"
                startDate={startDate}
                endDate={endDate}
                disabled
                placeholderText={`${startDate?.toISOString().split("T")[0]}-${
                  endDate?.toISOString().split("T")[0]
                }`}
                dateFormat="dd MMM yyyy "
              />
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl">Security deposit fees</p>
              <p className="text-xl">
                {depositAmount}{" "}
                {currency?.currencies?.map((item) => {
                  if (item?.id == currency?.currency) {
                    return item?.code;
                  }
                })}
              </p>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Subtotal</p>
              <p className="text-xl font-semibold">
                {price}{" "}
                {currency?.currencies?.map((item) => {
                  if (item?.id == currency?.currency) {
                    return item?.code;
                  }
                })}
              </p>
            </div>
            {/* <Link href="" className="text-common">
              + Add voucher/discount card
            </Link> */}
            <div className="divider"></div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Total amount</p>
              <p className="text-xl font-semibold">
                {total}{" "}
                {currency?.currencies?.map((item) => {
                  if (item?.id == currency?.currency) {
                    return item?.code;
                  }
                })}
              </p>
            </div>
            <div className="divider"></div>
            <button
              className="normal-case font-normal btn bg-common hover:bg-common w-full mt-3 mb-6 hidden"
              onClick={() => {
                buttonRef.current.click();
              }}>
              Continue
            </button>
            {scriptLoaded ? (
              <PayPalButton
                currency={currency?.currencySymbol}
                amount={total}
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
