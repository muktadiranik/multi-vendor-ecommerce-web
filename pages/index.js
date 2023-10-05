import { Inter } from "@next/font/google";
import React, { useRef, useState, useEffect } from "react";
import buttonIcon from "/public/images/Ellipse.png";
import buttonIcon2 from "/public/images/Arrow-right.png";
import buttonPause from "/public/images/Pause.svg";
import searchIcon from "/public/images/Vector.png";
import calenderIcon from "/public/images/calender.png";
import Image from "next/image";
import Card from "../components/Card";
import RecentProductCard from "../components/RecentProductCards";
import { useRouter } from "next/router";
import Carousel from "../components/RecentBikeHiresCarousel";
import {
  eventTypes,
  getProductTypeProductRateRecentHiresGoVeloWorks,
} from "common/queries/home";
import { client } from "/graphql/apolloClient";
import { useDispatch } from "react-redux";
import {
  UPDATE_FILTER_FIELDS,
  CLEAR_FILTER_FIELDS,
} from "redux/constants/filterConstants";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ allData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const videoRef = useRef();

  const [control, setControl] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [productRateTypeId, setProductRateTypeId] = useState("");
  const [riders, setRiders] = useState(0);
  const [eventTypesData, setEventTypesData] = useState([]);

  const play = () => {
    setControl(true);
    videoRef.current.play();
  };

  const pause = () => {
    setControl(false);
    videoRef.current?.pause();
  };
  useEffect(() => {
    const eventTypesData = async () => {
      const { data } = await client.query({
        query: eventTypes,
      });
      setEventTypesData(data?.eventTypes);
    };
    eventTypesData();
  });
  const onSubmit = (event) => {
    event.preventDefault();
    let filterFieldsValues = [
      searchLocation,
      productTypeId,
      productRateTypeId,
      riders,
    ];
    let filterFieldsNames = [
      "searchLocation",
      "productTypeId",
      "productRateTypeId",
      "riders",
    ];
    for (let i = 0; i < filterFieldsValues.length; i++) {
      dispatch({
        type: UPDATE_FILTER_FIELDS,
        payload: {
          field: filterFieldsNames[i],
          value: filterFieldsValues[i],
        },
      });
    }
    router.push("/rent-bike");
  };

  useEffect(() => {
    dispatch({ type: CLEAR_FILTER_FIELDS });
  }, []);

  const fakeData = [
    {
      id: "1",
      picture: "  https://i.ibb.co/ch3JPy1/cycle.png",
      name: "Hire of mountain bikes",
    },
    {
      id: "2",
      picture: "https://i.ibb.co/rxZrpHR/img3.png ",
      name: "hire of city bikes",
    },
    {
      id: "3",
      picture: "https://i.ibb.co/qJ1PctN/img2.png",
      name: "Race bike hire for event",
    },
  ];

  return (
    <div className="mb-5">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full col-span-full object-cover h-[698px] md:h-[435px] xl:h-[656px]"
          src="Video/bike.mp4"></video>
        <div className="absolute top-36 xl:top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
          {!control ? (
            <button onClick={play} className="">
              <Image className="w-16" src={buttonIcon} alt="image" />
              <Image
                className="absolute left-6 top-5 w-5"
                src={buttonIcon2}
                alt="image"
              />
            </button>
          ) : (
            <button onClick={pause} className="">
              <Image className="w-16" src={buttonIcon} alt="image" />{" "}
              <Image
                className="absolute left-[22px] top-[22px] w-5"
                src={buttonPause}
                alt="image"
              />
            </button>
          )}
        </div>
        <h1
          className="absolute top-4 md:top-14 xl:top-28 whitespace-normal md:whitespace-nowrap  
         left-1/2  -translate-x-2/4  font-semibold text-2xl 
        md:text-3xl xl:text-6xl text-black text-center min-w-[250px] md:min-w-full">
          Rent a bike anywhere in the world
        </h1>
        <div className="2xl:container">
          <div className="container absolute bottom-0 w-full">
            <form
              className="grid grid-cols-12 md:grid-cols-6 xl:grid-cols-16 gap-0 md:gap-4 xl:gap-0 xl:space-x-4 bg-white border border-[#FEBB02] px-4 py-4 md:py-5 md:px-6 xl:px-10 xl:py-8 rounded-tr-[10px] rounded-tl-[10px] mt-0 xl:mt-20"
              onSubmit={onSubmit}>
              <div className="col-span-12 md:col-span-2 xl:col-span-3">
                <p className="text-base font-medium mb-1">Location</p>
                <div className="flex items-center justify-center h-12 xl:h-14 px-4 border border-gray-200 rounded-[10px]">
                  <Image
                    className="mr-3 w-4 h-4 xl:w-5 xl:h-5"
                    src={searchIcon}
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="Where to ride?"
                    className="placeholder:text-base border-none outline-none w-full"
                    value={searchLocation}
                    onChange={(event) => {
                      setSearchLocation(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 xl:col-span-3">
                <p className="text-base font-medium mb-1 lg:mt-0">
                  Date of travel
                </p>
                <div className="flex items-center justify-center h-12 xl:h-14 px-4 border border-gray-200 rounded-[10px]">
                  <Image
                    className="mr-3 w-4 h-4 xl:w-5 xl:h-5"
                    src={calenderIcon}
                    alt=""
                  />
                  <input
                    type="date"
                    placeholder="Mon 24 Oct - Thu 27 Oct"
                    className="placeholder:text-base border-none outline-none w-full"
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 xl:col-span-3">
                <p className="text-base font-medium"> Type of Bike</p>
                <div className="flex items-center px-4 h-12 xl:h-14  border border-gray-200 rounded-[10px] mt-1">
                  <select
                    className="bg-transparent border-none outline-none text-[#7F7F7F] text-base w-full"
                    value={productTypeId}
                    onChange={(event) => {
                      setProductTypeId(event.target.value);
                    }}>
                    {allData?.productTypes?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 xl:col-span-3">
                <p className="text-base font-medium">Type for Events</p>
                <div className="flex items-center px-4 h-12 xl:h-14  border border-gray-200 rounded-[10px] mt-1">
                  <select
                    className="bg-transparent border-none outline-none text-[#7F7F7F] text-base w-full"
                    value={productRateTypeId}
                    onChange={(event) => {
                      setProductRateTypeId(event.target.value);
                    }}>
                    {eventTypesData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 xl:col-span-3">
                <p className="text-base font-medium mb-1">How many riders</p>
                <div className="flex items-center h-12 xl:h-14 px-4 border border-gray-200 rounded-[10px]">
                  <select
                    className="bg-transparent border-none outline-none text-[#7F7F7F] text-base w-full"
                    value={riders}
                    onChange={(event) => {
                      setRiders(event.target.value);
                    }}>
                    <option disabled>How many riders</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-1 xl:col-span-1">
                <p className="opacity-0 mb-1">Button</p>
                <button
                  type="submit"
                  className="text-white bg-common font-normal text-md h-12 xl:h-14 w-full  rounded-[10px] ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="container relative">
          <p className="font-semibold mt-10 xl:mt-[100px] mb-4 md:mb-6 lg:mb-9 text-xl md:text-2xl lg:text-5xl">
            Recent bike hires
          </p>
          {allData?.latestOrder?.length == 0 && (
            <div className="hidden md:grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {fakeData.map((data) => (
                <RecentProductCard key={data.id} data={data} />
              ))}
            </div>
          )}
          {allData?.latestOrder?.length == 1 && (
            <div className="hidden md:grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {allData?.latestOrder?.map((data) => (
                <Card key={data.id} data={data} />
              ))}
              <div>
                <Image
                  width={412}
                  height={294}
                  className="w-full h-full rounded-t-xl"
                  src={fakeData[0].picture}
                  alt=""
                />
                <div className="flex items-center justify-between px-4 py-2 bg-[#FEBA02] rounded-b-xl">
                  <h1 className="text-xl font-semibold text-white">
                    {fakeData[0].name}
                  </h1>
                </div>
              </div>
              <div>
                <Image
                  width={412}
                  height={294}
                  className="w-full h-full rounded-t-xl"
                  src={fakeData[1].picture}
                  alt=""
                />
                <div className="flex items-center justify-between px-4 py-2 bg-[#FEBA02] rounded-b-xl">
                  <h1 className="text-xl font-semibold text-white">
                    {fakeData[1].name}
                  </h1>
                </div>
              </div>
            </div>
          )}
          {allData?.latestOrder?.length == 2 && (
            <div className="hidden md:grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {allData?.latestOrder?.map((data) => (
                <Card key={data.id} data={data} />
              ))}
              <div>
                <Image
                  width={412}
                  height={294}
                  className="w-full h-full rounded-t-xl"
                  src={fakeData[0].picture}
                  alt=""
                />
                <div className="flex items-center justify-between px-4 py-2 bg-[#FEBA02] rounded-b-xl">
                  <h1 className="text-xl font-semibold text-white">
                    {fakeData[0].name}
                  </h1>
                </div>
              </div>
            </div>
          )}
          {allData?.latestOrder?.length == 3 && (
            <div className="hidden md:grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {allData?.latestOrder?.map((data) => (
                <Card key={data.id} data={data} />
              ))}
            </div>
          )}

          <div className="block md:hidden">
            <Carousel data={allData?.latestOrder} />
          </div>
        </div>
        <div className="w-full h-[320px] bg-custom-black bg-[url('../public/images/Intersect.png')] mt-[-150px] -z-50"></div>
      </div>
      <div className="w-full mx-auto container  text-center mt-10 lg:mt-24 mb-4 lg:mb-6 xl:mb-9">
        <p className="text-xl lg:text-2xl xl:text-5xl font-semibold">
          How Go Velo Works
        </p>
      </div>
      <div
        className="grid grid-clos-1 md:grid-cols-12 lg:grid-cols-12 mx-auto container mb-10 md:mb-20 xl:mb-[100px] 
      gap-4 lg:gap-8 align-middle justify-items-center">
        {allData?.workFlow?.map((data) => (
          <div
            key={data?.id}
            className="col-span-4 p-7 shadow-lg rounded-xl w-full">
            <div className=" rounded-lg">
              <img className="w-25 h-25" src={`${data?.icon}`} alt="image" />
            </div>
            <p className="mt-4 text-2xl font-semibold ">{data?.title}</p>
            <p className="mt-2 text-[#7F7F7F]">{data?.description} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getProductTypeProductRateRecentHiresGoVeloWorks,
  });
  return {
    props: {
      allData: data,
    },
  };
}

export default Home;
