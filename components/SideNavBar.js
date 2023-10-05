import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { client } from "graphql/apolloClient";
import { getCartByUserId } from "/common/queries/cart";
import { userStart, userSuccess, userFailure } from "redux/slice/userRedux";
import { SET_CURRENCY } from "redux/constants/currencyConstants";
import { getCurrencies } from "common/queries/home";
import logo from "/public/images/navbar/logo.png";
import { GET_CART, RESET_CART } from "redux/constants/cartConstants";
import Menu from "/public/images/3dot.png";
import User from "/public/images/user.png";
import { getShopByUserId } from "common/queries/shop";
import { GET_SHOP } from "redux/constants/shopConstants";

const SideNavBar = ({ setOpen }) => {
  const [currencies, setCurrencies] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, [user]);

  useEffect(() => {
    const getAllCurrencies = async () => {
      const { data } = await client.query({
        query: getCurrencies,
      });
      localStorage.setItem("currencies", data?.currencies[0]?.id);
      dispatch({
        type: SET_CURRENCY,
        payload: data?.currencies[0]?.id,
      });
      setCurrencies(data?.currencies);
    };
    getAllCurrencies();
  }, []);

  const handleLogout = () => {
    dispatch(userStart());
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/logout/`)
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("cartId");
        dispatch(userSuccess(null));
        dispatch({ type: RESET_CART, payload: null });
        localStorage.removeItem("userId");
        localStorage.removeItem("shopId");
      })
      .catch((error) => dispatch(userFailure(error?.message)));
  };

  useEffect(() => {
    const getAllCartItems = async () => {
      const { data } = await client.query({
        query: getCartByUserId,
        variables: {
          userId:
            localStorage.getItem("userId") &&
            String(JSON.parse(localStorage.getItem("userId"))),
        },
      });
      localStorage.setItem("cartId", data?.carts?.edges[0]?.node?.id);
      dispatch({ type: GET_CART, payload: data });
      return data;
    };
    if (localStorage.getItem("userId")) {
      getAllCartItems();
    }
  }, [cart, userId]);

  useEffect(() => {
    const getShop = async () => {
      const { data } = await client.query({
        query: getShopByUserId,
        variables: {
          ownerId:
            localStorage.getItem("userId") &&
            String(JSON.parse(localStorage.getItem("userId"))),
        },
      });
      dispatch({ type: GET_SHOP, payload: data });
    };
    if (localStorage.getItem("userId")) {
      getShop();
    }
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-50 ">
      <div className="grid grid-cols-12">
        <div className="col-span-12 bg-white pt-[18px] px-4 w-[100vw] h-[100vh]">
          <div className="flex justify-between">
            <Link className="mr-12 xl:mr-2 w-[80px]" href="/">
              <Image src={logo} alt="" />
            </Link>
            <div className=" text-2xl" onClick={() => setOpen(false)}>
              <RxCross2 />
            </div>
          </div>
          {userId ? (
            <div>
              <ul className="menu menu-compact dropdown-content mt-3 bg-base-100  w-52">
                {shop?.shop?.shops?.edges[0]?.node?.id && (
                  <li
                    onClick={() =>
                      router.push("/shopowner/my-shop", setOpen(false))
                    }>
                    <a className="active:bg-white px-0 pb-6">My Shop</a>
                  </li>
                )}
                <li onClick={() => router.push("/my-bookings", setOpen(false))}>
                  <a className="active:bg-white px-0 pb-6 pt-0">My Bookings</a>
                </li>
                <li
                  onClick={() => router.push("/user-profile", setOpen(false))}>
                  <a className="active:bg-white px-0 pb-6 pt-0">Profile</a>
                </li>
                <li
                  onClick={() =>
                    router.push("/personal-information", setOpen(false))
                  }>
                  <a className="active:bg-white px-0 pb-12 pt-0">Settings</a>
                </li>
              </ul>
              <button
                onClick={() => {
                  handleLogout(setOpen(false));
                }}
                className="bg-common border border-gray-600 rounded-[10px] h-[50px] w-full md:w-auto px-7 text-white">
                Log Out
              </button>
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-4">
              <button
                onClick={() => {
                  router.push("/login");
                  setOpen(false);
                }}
                className={`${
                  router.asPath == "/login"
                    ? "bg-common border border-gray-600 rounded-[10px] h-[50px] w-full md:w-auto px-7 text-white"
                    : "border border-gray-600 rounded-[10px] h-[50px]  w-full md:w-auto px-7"
                } `}>
                <p> Log In</p>
              </button>
              <button
                onClick={() => {
                  router.push("/register");
                  setOpen(false);
                }}
                className={
                  router.asPath == "/register"
                    ? "bg-common border border-gray-600 rounded-[10px] h-[50px] w-full md:w-auto px-7 text-white"
                    : "border border-gray-600 rounded-[10px] h-[50px]  w-full md:w-auto px-7"
                }>
                Register
              </button>
            </div>
          )}
          <div className="flex mt-6">
            <div className="mr-4 xl:mr-8">
              <div className="" tabIndex={0}>
                <select
                  className="py-2 bg-white rounded-[10px] placeholder:text-[14px]"
                  onChange={(event) => {
                    localStorage.setItem("currency", event.target.value);
                    dispatch({
                      type: SET_CURRENCY,
                      payload: event.target.value,
                    });
                  }}>
                  {currencies?.map((currency) => (
                    <option value={currency?.id} key={currency?.id}>
                      {currency?.symbol}
                    </option>
                  ))}
                </select>

                {/* <Link
                  href=""
                  className="flex items-center overflow-hidden text-gray-700 whitespace-nowrap rounded-[10px]">
                  <p className="text-[15px]">USD</p>
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Link> */}
              </div>
            </div>
            {/* <div className="mr-2 xl:mr-6">
              <div className="" tabIndex={0}>
                <Link
                  href=""
                  className="flex items-center text-gray-700 whitespace-nowrap rounded-[10px]">
                  <Image
                    width="20"
                    height="20"
                    className="w-8"
                    src="https://img.freepik.com/premium-vector/usa-flag-white-background-flat-style_601298-441.jpg?w=2000"
                    alt=""
                  />
                  <p className="text-[15px]">United Kingdom</p>
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideNavBar;
