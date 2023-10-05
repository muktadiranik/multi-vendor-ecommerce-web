import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/navbar/logo.png";
import userIcon from "/public/images/navbar/user.svg";
import buttonIcon from "/public/images/navbar/menu.svg";
import Menu from "/public/images/3dot.png";
import User from "/public/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { userStart, userSuccess, userFailure } from "redux/slice/userRedux";
import { useRouter } from "next/router";
import { client } from "graphql/apolloClient";
import { getCartByUserId } from "/common/queries/cart";
import { TbAlignRight } from "react-icons/tb";
import { GET_CART, RESET_CART } from "redux/constants/cartConstants";
import AddToCart from "../components/AddToCart";
import SideNavBar from "../components/SideNavBar";
import { getShopByUserId } from "../common/queries/shop";
import { getCurrencies } from "common/queries/home";
import { GET_SHOP, CLEAR_SHOP } from "redux/constants/shopConstants";
import { toast } from "react-toastify";
import {
  SET_CURRENCY,
  SET_CURRENCY_SYMBOL,
  GET_CURRENCIES,
} from "redux/constants/currencyConstants";

const Header = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);

  const [showDropdownMenu, setShowDropdownMenu] = useState(true);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, [user]);

  const handleLogout = () => {
    dispatch(userStart());
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/logout/`)
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("cartId");
        dispatch(userSuccess(null));
        dispatch({ type: RESET_CART, payload: null });
        localStorage.removeItem("userId");
        localStorage.removeItem("access_token");
        localStorage.removeItem("shopId");
        dispatch({ type: CLEAR_SHOP });
        toast.success("Log out successful");
        router.push("/");
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
    const getAllCurrencies = async () => {
      const { data } = await client.query({
        query: getCurrencies,
      });
      localStorage.setItem("currencies", data?.currencies[0]?.id);
      dispatch({
        type: GET_CURRENCIES,
        payload: data?.currencies,
      });
      dispatch({
        type: SET_CURRENCY_SYMBOL,
        payload: data?.currencies[0]?.symbol,
      });
      dispatch({
        type: SET_CURRENCY,
        payload: data?.currencies[0]?.id,
      });
      setCurrencies(data?.currencies);
    };
    getAllCurrencies();
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/user/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(userSuccess(data));
      })
      .catch((error) => dispatch(userFailure(error?.message)));
  }, []);

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
    <>
      {showAddToCartModal && (
        <AddToCart setShowAddToCartModal={setShowAddToCartModal} />
      )}
      {open ? (
        <SideNavBar setOpen={setOpen} />
      ) : (
        <div>
          <header className="bg-white shadow-md py-[18px] lg:py-6">
            <div className="container ">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-9 xl:col-span-5 justify-self-start  flex items-center lg:space-x-8">
                  <Link className="mr-12 xl:mr-2" href="/">
                    <Image src={logo} className="" alt="" />
                  </Link>
                  <div className="justify-self-start  flex items-center mr-7 xl:mr-11 xl:space-x-8">
                    <div className="grid grid-cols-4">
                      <Link
                        className={
                          open
                            ? "hidden"
                            : "mr-[6px] xl:mr-3  text-[15px] col-span-3 xl:col-span-4 whitespace-nowrap"
                        }
                        href="/rent-bike">
                        Rent a Bike
                      </Link>
                      <h1
                        className={
                          open
                            ? "hidden"
                            : "flex xl:hidden col-span-1  justify-center items-center"
                        }>
                        {/* <svg
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24">
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg> */}

                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className=" ">
                            <svg
                              className="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24">
                              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                          </label>
                          <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                              <Link className="mr-8 text-[15px]" href="/about">
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="mr-8 text-[15px]"
                                href="/contact">
                                Contact
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </h1>
                    </div>
                    <Link
                      className="mr-8 text-[15px] hidden xl:block"
                      href="/about">
                      About Us
                    </Link>
                    <Link
                      className="mr-8 text-[15px] hidden xl:block"
                      href="/contact">
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="col-span-3 xl:col-span-7 justify-self-end flex items-center">
                  <div className="mr-4 xl:mr-8">
                    <div className=" hidden md:block lg:block" tabIndex={0}>
                      <select
                        className="py-2 bg-white rounded-[10px] placeholder:text-[14px]"
                        onChange={(event) => {
                          localStorage.setItem("currency", event.target.value);
                          dispatch({
                            type: SET_CURRENCY,
                            payload: event.target.value,
                          });
                          dispatch({
                            type: SET_CURRENCY_SYMBOL,
                            payload: currencies?.find(
                              (currency) => currency?.id === event.target.value
                            )?.symbol,
                          });
                        }}>
                        {currencies?.map((currency) => (
                          <option value={currency?.id} key={currency?.id}>
                            {currency?.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="mr-2 xl:mr-6">
                    <div className=" hidden md:block lg:block" tabIndex={0}>
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
                  <label
                    onClick={() => setShowAddToCartModal(!showAddToCartModal)}
                    className="btn btn-ghost btn-circle mr-3 lg:mr-6  flex">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="rounded-full text-white badge-sm indicator-item bg-common ">
                        {cart?.carts?.edges[0]?.node?.cartitemSet?.edges
                          ?.length > 0
                          ? cart?.carts?.edges[0]?.node?.cartitemSet?.edges
                              ?.length
                          : "0"}
                      </span>
                    </div>
                  </label>
                  {!userId ? (
                    <div className="">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setOpen(!open)}
                          className={
                            open
                              ? "hidden"
                              : "md:hidden flex justify-end text-2xl"
                          }>
                          <TbAlignRight />
                        </button>
                      </div>
                      <div className="hidden md:flex space-x-4">
                        <button
                          onClick={() => router.push("/login")}
                          className={
                            router.asPath == "/login"
                              ? "bg-common border border-gray-600 rounded-[10px] lg:h-[50px] w-full md:w-auto px-7 text-white"
                              : "border border-gray-600 rounded-[10px] md:whitespace-nowrap h-9 lg:h-[50px]  lg:w-full md:w-auto px-3 lg:px-7"
                          }>
                          Log In
                        </button>
                        <button
                          onClick={() => router.push("/register")}
                          className={
                            router.asPath == "/register"
                              ? "bg-common border border-gray-600 rounded-[10px] h-[50px] px-7 border-common text-white"
                              : " border border-gray-600 rounded-[10px] md:whitespace-nowrap h-9 lg:h-[50px] px-3  lg:px-7  text-black"
                          }>
                          Register
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button className="hidden md:block dropdown dropdown-end  border border-gray-600 rounded-lg">
                        <div
                          className="flex items-center gap-4"
                          onClick={() => setShowDropdownMenu(true)}>
                          <div className="pl-4 cursor-pointer">
                            <Image src={Menu} alt="" />
                          </div>
                          <label className="bg-gray p-2.5 m-1 cursor-pointer rounded-lg">
                            <Image src={User} alt="" />
                          </label>
                        </div>
                        {showDropdownMenu && (
                          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {shop?.shop?.shops?.edges[0]?.node?.id && (
                              <li
                                onClick={() =>
                                  router.push(
                                    "/shopowner/my-shop",
                                    setShowDropdownMenu(false)
                                  )
                                }>
                                <a className="active:bg-white">My Shop</a>
                              </li>
                            )}
                            {userId && (
                              <li
                                onClick={() =>
                                  router.push(
                                    "/my-bookings",
                                    setShowDropdownMenu(false)
                                  )
                                }>
                                <a className="active:bg-white">My Bookings</a>
                              </li>
                            )}
                            <li
                              onClick={() =>
                                router.push(
                                  "/user-profile",
                                  setShowDropdownMenu(false)
                                )
                              }>
                              <a className="active:bg-white">Profile</a>
                            </li>
                            <li
                              onClick={() =>
                                router.push(
                                  "/user-profile/personal-information",
                                  setShowDropdownMenu(false)
                                )
                              }>
                              <a className="active:bg-white">Settings</a>
                            </li>
                            <li
                              onClick={() =>
                                handleLogout(setShowDropdownMenu(false))
                              }>
                              <a className="active:bg-white">Log out</a>
                            </li>
                          </ul>
                        )}
                      </button>
                      <button className="block md:hidden dropdown dropdown-end  border border-gray-600 rounded-lg">
                        <div
                          className="flex items-center gap-4"
                          onClick={() => setOpen(true)}>
                          <div className="pl-4 cursor-pointer">
                            <Image
                              src={buttonIcon}
                              className="w-2 h-2"
                              alt=""
                            />
                          </div>
                          <label className="bg-gray p-2.5 m-1 cursor-pointer rounded-lg">
                            <Image src={userIcon} alt="" />
                          </label>
                        </div>
                      </button>
                    </div>
                  )}
                  <div className="hidden" tabIndex={0}>
                    <div className="p-1 border border-gray-600 rounded-[10px] flex">
                      <Image className="mr-4 ml-3" src={buttonIcon} alt="" />
                      <Image src={userIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
};

export default Header;
