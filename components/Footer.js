import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "/public/images/navbar/logo.png";
import Image from "next/image";
import ListYourBikeModal from "./shop-owner/ListYourBikeModal";
import playStore from "../public/images/play-store.png";
import appleStore from "../public/images/app-store.png";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div>
      <ListYourBikeModal></ListYourBikeModal>
      <div className=" bg-common h-20 p-4 flex items-center justify-center">
        <Link
          href="/contact"
          className="border border-white py-[10px] px-7 rounded-[10px] text-white font-normal cursor-pointer">
          Rent with us
        </Link>
      </div>
      <footer className="container grid sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 mt-5 lg:mt-10 xl:mt-24">
        <div className="col-span-4">
          <Link href="/">
            <Image src={logo} alt="" className="inline" />
          </Link>
          <div className="hidden md:block">
            <p className="font-semibold md:mt-[22px] mt-12 mb-5">
              Your all-in-one rental app
            </p>
            <div className="flex gap-2">
              <Image
                width={500}
                height={0}
                className="w-[74px] md:w-[80px] lg:w-32 "
                src={appleStore}
                alt=""
              />
              <Image
                width={500}
                height={0}
                className="w-[80px] md:w-[80px] lg:w-32 "
                src={playStore}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block col-span-8 mt-5 md:mt-0">
          <span className="text-black font-bold ">Company</span>
          <div className=" grid grid-cols-12 gap-4 xl:gap-8 text-sky-500 mt-5 md:mt-9 lg:mt-12">
            <div className="col-span-3 xl:col-span-4">
              <Link href="/about" className="link link-hover text-common">
                About us
              </Link>
            </div>
            <div className="col-span-4 xl:col-span-4">
              <Link href="/contact" className="link link-hover text-common">
                Contact
              </Link>
            </div>
            <div className="col-span-5 xl:col-span-4">
              <Link
                href="/privacy-policy"
                className="link link-hover text-common">
                Privacy and Policy
              </Link>
            </div>
            <div className="col-span-3 xl:col-span-4">
              <Link href="/giving-back" className="link link-hover text-common">
                Giving back
              </Link>
            </div>
            <div className="col-span-4 xl:col-span-4">
              <Link
                href="/terms-and-condition"
                className="link link-hover text-common">
                Terms and Conditions
              </Link>
            </div>
            <div className="col-span-5 xl:col-span-4">
              <Link href="/report-bug" className="link link-hover text-common">
                Report bug or Request Feature
              </Link>
            </div>
          </div>
        </div>
        <div className="block md:hidden col-span-8 mt-5 md:mt-0">
          <span className="text-black font-bold ">Company</span>
          <div className=" grid grid-cols-12 gap-y-4 text-sky-500 mt-5 md:mt-9 lg:mt-12">
            <div className="col-span-4">
              <Link href="/about" className="link link-hover text-common">
                About us
              </Link>
            </div>
            <div className="col-span-8">
              <Link
                href="/terms-and-condition"
                className="link link-hover text-common">
                Terms and Conditions
              </Link>
            </div>

            <div className="col-span-4">
              <Link href="/giving-back" className="link link-hover text-common">
                Giving back
              </Link>
            </div>
            <div className="col-span-8">
              <Link
                href="/privacy-policy"
                className="link link-hover text-common">
                Privacy and Policy
              </Link>
            </div>
            <div className="col-span-4">
              <Link href="/contact" className="link link-hover text-common">
                Contact
              </Link>
            </div>
            <div className="col-span-8">
              <Link href="/report-bug" className="link link-hover text-common">
                Report bug or Request Feature
              </Link>
            </div>
          </div>
        </div>
        <div className="block md:hidden mt-10">
          <p className="font-bold text-sm  mb-[10px]">
            Your all-in-one rental app
          </p>
          <div className="flex gap-2">
            <Image
              width={500}
              height={0}
              className="w-[74px] md:w-[80px] lg:w-32 "
              src={appleStore}
              alt=""
            />
            <Image
              width={500}
              height={0}
              className="w-[80px] md:w-[80px] lg:w-32 "
              src={playStore}
              alt=""
            />
          </div>
        </div>

        <div className="col-span-2"></div>
      </footer>
      <div className="container md:mt-10 lg:mt-16">
        <div className="divider my-0"></div>
      </div>
      <div>
        <p className="text-[#7F7F7F] text-center pb-8 pt-4">
          © {year ? year : ""} Go Velo All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
