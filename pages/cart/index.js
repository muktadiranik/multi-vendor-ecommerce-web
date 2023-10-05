import React, { useState, useEffect } from "react";
import editIcon from "/public/images/edit-blue.svg";
import Link from "next/link";
import CartInformation from "../../components/CartInformation";
import Map from "/public/images/map-black.svg";
import { useSelector } from "react-redux";
import Image from "next/image";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import CheckOutRidersInfo from "../../components/CheckOutRiderInfo";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Cart = () => {
  const router = useRouter();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bookingOverview, setBookingOverview] = useState(false);
  const [deposit, setDeposit] = useState(0);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState(null);

  const { cart } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.currency);

  const handleDateChange = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  let diffDays = 0;
  const date1 = startDate;
  const date2 = endDate;

  if (startDate && endDate) {
    const diffTime = Math.abs(date2 - date1);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    diffDays = 1;
  }
  useEffect(() => {
    let price = 0;
    for (
      let i = 0;
      i < cart?.carts?.edges[0]?.node?.cartitemSet?.edges?.length;
      i++
    ) {
      for (
        let j = 0;
        j <
        cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
          ?.productrateSet.length;
        j++
      ) {
        if (
          cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
            ?.productrateSet[j]?.currency?.id == currency?.currency
        ) {
          price +=
            Number(
              cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
                ?.productrateSet[j]?.rate
            ) *
            Number(
              cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.quantity
            ) *
            diffDays;
        }
      }
    }
    setPrice(Number(price).toFixed(2));
  }, [currency, cart, diffDays]);

  useEffect(() => {
    let deposit = 0;
    for (
      let i = 0;
      i < cart?.carts?.edges[0]?.node?.cartitemSet?.edges?.length;
      i++
    ) {
      for (
        let j = 0;
        j <
        cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
          ?.productdepositSet.length;
        j++
      ) {
        if (
          cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
            ?.productdepositSet[j]?.currency?.id == currency?.currency
        ) {
          deposit += Number(
            cart?.carts?.edges[0]?.node?.cartitemSet?.edges[i]?.node?.product
              ?.productdepositSet[j]?.deposit
          );
        }
      }
    }
    setDeposit(deposit.toFixed(2));
  }, [currency, cart]);

  if (cart?.carts?.edges[0]?.node?.cartitemSet?.edges.length == 0) {
    router.push("/");
  }

  useEffect(() => {
    setTotal(Number(Number(price) + Number(deposit)).toFixed(2));
  }, [price, deposit]);

  const handleBookingOverView = (e) => {
    e.preventDefault();
    if (!location) {
      toast.error("Please enter your location");
    } else if (!startDate && !endDate) {
      toast.error("Please select Pick-up/Drop off date");
    } else {
      setBookingOverview(true);
    }
  };

  if (!bookingOverview) {
    return (
      <>
        <div className="mb-10 md:mb-24 bg-white">
          <div className="grid grid-cols-12 mx-auto w-full container mt-4 md:mt-16">
            <div className="col-span-full md:col-span-6 xl:col-span-7 w-full">
              <p className="text-2xl font-medium">
                Your Order Cart Information
              </p>
              <p className="text-[#7F7F7F] mb-6">
                {cart?.carts?.edges[0]?.node?.cartitemSet?.edges?.length} rent
                bike
              </p>
              <div className="w-full">
                {cart?.carts?.edges[0]?.node?.cartitemSet?.edges?.map(
                  (item) => (
                    <CartInformation key={item?.node?.id} cartItem={item} />
                  )
                )}
              </div>
            </div>
            <form
              onSubmit={handleBookingOverView}
              className="col-span-full md:col-span-6 xl:col-span-5 mt-0 md:mt-[80px] ml-0 md:ml-8 border border-[#E2E2E2] rounded-[5px] p-6">
              <p className="text-xl font-semibold mb-4">Booking Summary</p>
              {/* <div className="flex justify-between mb-1">
                <p>Pick-up/ Drop-off</p>
              </div> */}
              <div className="relative ">
                {/* <div className="py-4 bg-gray-light rounded-[10px] placeholder:text-[14px] w-full flex items-center justify-center gap-3">
                  <Image src={Map} alt="" />
                  <p className="text-custom-black">Los Angeles, USA 92012</p>
                </div> */}
                <p className="mb-1">Location</p>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your pick-up location"
                    className="input w-full bg-[#F5F5F5]  pr-3 pl-11 focus:outline-none rounded-lg placeholder:text-xs"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between mb-1">
                <p className="mt-4">Pick-up/ Drop off Date</p>
              </div>
              <div className="relative flex py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full">
                <DatePicker
                  className="w-full text-center border-none"
                  selectsRange={true}
                  timePicker={true}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select date"
                  onChange={handleDateChange}
                  dateFormat="dd MMM yyyy "
                />
              </div>
              <div className="divider py-2"></div>
              {/* <div className='flex justify-between mb-3'>
              <p className='text-xl'>Security deposit fees</p>
              <p className='text-xl'>15 €</p>
            </div> */}
              <div className="flex justify-between mt-3">
                <p className="text-base xl:text-xl font-semibold">Subtotal</p>
                <p className="text-base xl:text-xl font-semibold">
                  {price}{" "}
                  {currency?.currencies?.map((item) => {
                    if (item?.id == currency?.currency) {
                      return item?.code;
                    }
                  })}
                </p>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between mt-3">
                <p className="text-base xl:text-xl font-normal xl:font-semibold">
                  Security deposit fees
                </p>
                <p className="text-base xl:text-xl font-normal xl:font-semibold">
                  {deposit}{" "}
                  {currency?.currencies?.map((item) => {
                    if (item?.id == currency?.currency) {
                      return item?.code;
                    }
                  })}
                </p>
              </div>
              <div className="divider"></div>
              {/* <Link href="" className="text-common">
              + Add voucher/discount card
            </Link> */}
              {/* <div className="divider"></div> */}
              <div className="flex justify-between">
                <p className="text-base xl:text-xl font-semibold">
                  Total amount
                </p>
                <p className="text-base xl:text-xl font-semibold">
                  {total}{" "}
                  {currency?.currencies?.map((item) => {
                    if (item?.id == currency?.currency) {
                      return item?.code;
                    }
                  })}
                </p>
              </div>
              <button className="flex justify-center items-center mt-9 border rounded-[10px] bg-common text-white text-base font-medium h-14 w-full">
                Rent Now
              </button>
            </form>
            <div></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <CheckOutRidersInfo
          price={price}
          total={total}
          startDate={startDate}
          endDate={endDate}
          duration={diffDays}
          depositAmount={deposit}
          location={location}
        />
      </div>
    );
  }
};

export default Cart;
