import React, { useEffect } from "react";
import image from "/public/images/shop-owner/Cover.svg";
import frameicon from "/public/images/Frame.png";
import phoneicon from "/public/images/Vector2.png";
import locationicon from "/public/images/shop-owner/location-marker.png";
import staricon from "/public/images/shop-owner/Star.png";
import calenderIcon from "/public/images/calender.png";
import messageicon from "/public/images/messageicon.png";
import reviewicon from "/public/images/material.png";
import shopimage from "/public/images/shop-owner/cycling.png";
import timeicon from "/public/images/time.png";
import Image from "next/image";
import map from "/public/images/map.png";
import editicon from "/public/images/material.png";
import ReviewModal from "../../components/shop-owner/ReviewModal";
import Review from "../../components/shop-owner/Review";
import Link from "next/link";

const shopOwnerProfilePublicView = () => {
  const fakedata = [
    {
      id: "1",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Schwinn Handbrake Bike",
      title: "La bike tour",
      Details2: "Road Bike",
      Details3: "Bike Size: 155 - 165 cm",
      Details5: " Booking Status: ",
      place: " Los Angeles, United States",
      price: " 30 ",
      week: " 168 ",
    },
    {
      id: "2",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Schwinn Handbrake Bike",
      title: "La bike tour",
      Details2: "Road Bike",
      Details3: "Bike Size: 155 - 165 cm",
      Details5: " Booking Status: ",
      place: " Los Angeles, United States",
      price: " 30 ",
      week: " 168 ",
    },
    {
      id: "3",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Schwinn Handbrake Bike",
      title: "La bike tour",
      Details2: "Road Bike",
      Details3: "Bike Size: 155 - 165 cm",
      Details5: " Booking Status: ",
      place: " Los Angeles, United States",
      price: " 30 ",
      week: " 168 ",
    },
    {
      id: "4",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Schwinn Handbrake Bike",
      title: "La bike tour",
      Details2: "Road Bike",
      Details3: "Bike Size: 155 - 165 cm",
      Details5: " Booking Status: ",
      place: " Los Angeles, United States",
      price: " 30 ",
      week: " 168 ",
    },
    {
      id: "5",
      picture: "https://i.ytimg.com/vi/J3msSrYP_Dw/maxresdefault.jpg",
      name: "Schwinn Handbrake Bike",
      title: "La bike tour",
      Details2: "Road Bike",
      Details3: "Bike Size: 155 - 165 cm",
      Details5: " Booking Status: ",
      place: " Los Angeles, United States",
      price: " 30 ",
      week: " 168 ",
    },
  ];

  const reviewfakedata = [
    {
      id: "1",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U030W86V9PE-1ebb143ae2de-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
    {
      id: "2",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U03GYCBSTNW-d4c423fc113e-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
    {
      id: "3",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U040BQ4JX0U-24a3d1eee68d-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
    {
      id: "4",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U0464Q84AH0-d86e6d48d86e-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
    {
      id: "5",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U0402NFA37G-a4c849671dc8-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
    {
      id: "6",
      picture:
        "https://ca.slack-edge.com/T01M0714UAD-U02PH7F1FB3-928170af02fd-512",
      name: "Susan Deleo",
      ratings: "",
      Review:
        "The bike was fantastic. Super smooth, plenty of power, all the style.",
      bikelink: "E - Touring Electra Bike >",
    },
  ];

  return (
    <>
      <div className="drawer drawer-end fixed top-0 h-full   bottom-0">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-96 bg-base-100 text-base-content">
            <p className="text-2xl ml-2 font-medium">
              Add Pickup/Dropoff Location & Time
            </p>
            <div className="col-span-4 border bg-[#FEBA02] ml-2 w-full h-[724px] rounded-xl ">
              <p className="mt-8 text-3xl font-semibold ml-8">30 € / day</p>
              <p className="text-lg text-[#565656] ml-8">168 € / week</p>
              <div className="divider w-64 mx-auto divide-white"></div>
              <p className="mt-4 mb-2 text-white ml-6">Pick-up/ Dropoff</p>
              <div className="flex">
                <div className="flex mr-8 mb-4">
                  <Image className="ml-6 w-6 h-6 mr-1" src={map} alt="" />
                  <Link href="" className="text-sm underline">
                    Los Angeles,USA 92012
                  </Link>
                </div>
                <div>
                  <button className="text-sm flex">
                    <Image className="mr-1" src={editicon} alt="" /> Edit
                  </button>
                </div>
              </div>
              <form className="ml-6 mr-6 relative">
                <div className="">
                  <div className="form-control ">
                    <label className="label">
                      <p className="font-medium text-white mt-4">
                        Pickup Date & Time
                      </p>
                    </label>
                    <div className="w-full flex relative">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="12/28/2022"
                          className="input w-full   pr-3 pl-11 focus:outline-none rounded-none input-bordered  rounded-l-lg placeholder:text-xs"
                        />
                        <Image
                          className="absolute top-4 h-5 ml-4 left-1 w-5"
                          src={calenderIcon}
                          alt=""
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="11:00 am"
                          className="input w-full   pr-3 pl-11 focus:outline-none input-bordered rounded-none rounded-r-lg  placeholder:text-xs"
                        />
                        <Image
                          className="absolute top-4 h-5 ml-4 left-1 w-5"
                          src={timeicon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <p className="font-medium text-white mt-4">
                        Dropoff Date & Time
                      </p>
                    </label>
                    <div className="w-full flex relative">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="12/28/2022"
                          className="input w-full pr-3 pl-11 focus:outline-none rounded-none input-bordered  rounded-l-lg placeholder:text-xs"
                        />
                        <Image
                          className="absolute top-4 h-5 ml-4 left-1 w-5"
                          src={calenderIcon}
                          alt=""
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="11:00 am"
                          className="input w-full   pr-3 pl-11 focus:outline-none input-bordered rounded-none rounded-r-lg  placeholder:text-xs"
                        />
                        <Image
                          className="absolute z-0 top-4 h-5 ml-4 left-1 w-5"
                          src={timeicon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-control mt-4 ">
                    <label className="label"></label>
                    <div className="w-full flex relative shadow-lg">
                      <div className="">
                        <input
                          type="text"
                          placeholder="30 € x 1 day(s)"
                          className="input w-full focus:outline-none rounded-none rounded-l-lg placeholder:text-xs"
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          placeholder="30 €"
                          className="input w-full focus:outline-none  rounded-none rounded-r-lg  placeholder:text-xs placeholder:text-black placeholder:text-right placeholder:font-medium"
                        />
                      </div>
                    </div>
                    <p className="mt-3 mb-1">Security deposit Fees</p>
                  </div>
                  <div className="form-control">
                    <label className="label"></label>
                    <div className="w-full flex relative ">
                      <div className="">
                        <input
                          type="text"
                          placeholder="Total (Euro)"
                          className="input w-full focus:outline-none rounded-none rounded-l-lg placeholder:text-xs  placeholder:text-black"
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          placeholder="45 €"
                          className="input w-full focus:outline-none  rounded-none rounded-r-lg  placeholder:text-xs placeholder:text-black placeholder:text-right placeholder:font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn bg-common w-full mt-4 text-white normal-case font-normal mb-8 hover:bg-common">
                  Add to Cart
                </button>
              </form>
            </div>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-16 drawer-content">
        <div className="grid grid-cols-12 w-full relative ">
          <div className="col-span-full w-full -z-10">
            <Image
              width={300}
              height={300}
              className="w-full"
              src={image}
              alt=""
            />
          </div>
          <Image
            className="absolute left-4 top-14 w-20 h-20"
            src={shopimage}
            alt=""
          />
        </div>
        <div className="grid grid-cols-12 w-full bg-[#EBF3FF] p-3">
          <div className="col-span-0"></div>
          <div className="col-span-full w-full">
            <div className="grid grid-cols-12 justify-center w-full">
              <div className="col-span-4 mt-2 ">
                <div className="flex mb-6">
                  <p className="text-3xl font-medium">Cycling Severing Store</p>
                  <Image src={frameicon} alt="" />
                </div>
                <p className="text-[#147B11] font-medium mb-4">
                  Opening hours <span className="text-black">.9am - 6pm</span>
                </p>
                <div className="flex mb-10">
                  <Image src={phoneicon} alt="" />
                  <p className="ml-2">+5266 214 5121</p>
                </div>
                <div className="flex gap-6">
                  <p className="text-lg">Rent Bikes</p>
                  <p className="text-lg text-[#7F7F7F]">Reviews From Riders</p>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-7 mt-4">
                <div className="grid grid-cols-12 w-full gap-2">
                  <div className="col-span-3 flex w-full ">
                    <Image className="w-5 h-5" src={locationicon} alt="" />
                    <p className="text-sm ml-1">Camden, London</p>
                  </div>
                  <div className="col-span-3 flex w-full ">
                    <Image className="w-5 h-5" src={calenderIcon} alt="" />
                    <p className="text-sm ml-1">Joined Dec 2022</p>
                  </div>
                  <div className="col-span-5 flex w-full">
                    <div className="border bg-common rounded-xl p-1 w-7 h-7">
                      <p className="text-xs text-center text-white">4.8</p>
                    </div>
                    <Image className="w-5 h-5 ml-2" src={staricon} alt="" />
                    <p className="text-sm ml-1">Based on 19 Reviews</p>
                  </div>
                </div>
                <div className="grid grid-cols-12 mt-14">
                  <div className="col-span-4"></div>
                  <button className="col-span-3 w-full h-full mx-auto">
                    <div className="flex border bg-common  text-white p-2 w-32 rounded-xl">
                      <Image
                        className="h-[12.15px] w-[13.33px] mt-[3px] ml-2"
                        src={messageicon}
                        alt=""
                      />
                      <p className="text-xs ml-3 ">Chat Renter</p>
                    </div>
                  </button>
                  <label
                    htmlFor="my-modal"
                    className="col-span-4 w-36 h-full mx-auto flex border bg-transparent  hover:bg-common hover:text-white  p-2 rounded-xl btn btn-sm normal-case font-normal text-xs ml-3 text-black">
                    {" "}
                    <Image
                      className="h-[12.15px] w-[13.33px] mt-[3px] mr-2"
                      src={reviewicon}
                      alt=""
                    />
                    Write Review
                  </label>
                  <ReviewModal />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-0"></div>
        </div>
        <div className="grid grid-cols-12 w-full mt-10 mb-6">
          <div className="col-span-4">
            <p className="text-xl font-medium ">Bikes For Rent</p>
          </div>
        </div>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-full">
            {/* {fakedata.map((data) => (
              <shopOwnerProfileCard key={data.id} data={data} />
            ))} */}
            <nav
              aria-label="Pagination"
              className=" mb-16 flex items-center lg:space-y-2 text-xs justify-center lg:gap-5 lg:w-full w-32 mt-8 ">
              <button type="button" className=" text-base font-bold">
                <span className="">Prev</span>
              </button>
              <button
                type="button"
                aria-current="page"
                className="active active:bg-common inline-flex items-center px-4 py-2 text-sm font-semibold border ">
                1
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                2
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                3
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                4
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                5
              </button>
              <button type="button" className="">
                <span className="text-base font-bold">Next</span>
              </button>
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-12 mb-6">
          <div className="col-span-2">
            <p className="text-xl font-medium">Reviews From Riders</p>
          </div>
          <div className="col-span-8 w-full flex">
            <div className="border bg-common rounded-xl p-1 w-7 h-7">
              <p className="text-xs text-center text-white">4.8</p>
            </div>
            <Image
              width={300}
              height={300}
              className="w-4 h-4 ml-2 mt-1"
              src={staricon}
              alt=""
            />
            <p className="text-sm ml-1 mt-1">Based on 19 Reviews</p>
          </div>
        </div>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-full">
            {reviewfakedata?.map((data) => (
              <Review key={data.id} data={data} />
            ))}
            <nav
              aria-label="Pagination"
              className=" mb-16 flex items-center lg:space-y-2 text-xs justify-center lg:gap-5 lg:w-full w-32 mt-8 ">
              <button type="button" className=" text-base font-bold">
                <span className="">Prev</span>
              </button>
              <button
                type="button"
                aria-current="page"
                className="active active:bg-common inline-flex items-center px-4 py-2 text-sm font-semibold border ">
                1
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border active active:bg-common">
                2
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border active active:bg-common">
                3
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                4
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border  active active:bg-common">
                5
              </button>
              <button type="button" className="">
                <span className="text-base font-bold">Next</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default shopOwnerProfilePublicView;
