import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { client } from "/graphql/apolloClient";
import {
  getAllProductTypesAndRates,
  getProductsByFilter,
} from "../../common/queries/products";
import { eventTypes } from "../../common/queries/home";
import ProductCard from "../../components/ProductCard";
import MapComponent from "./map-component";
import { useSelector } from "react-redux";
import searchicon from "/public/images/Vector.png";
import calenderIcon from "/public/images/calender.png";
import ridersIcon from "../../public/images/riders.png";
import { useDispatch } from "react-redux";
import { UPDATE_FILTER_FIELDS } from "redux/constants/filterConstants";
import {
  SET_FILTER_PRODUCTS,
  CLEAR_FILTER_PRODUCTS,
} from "redux/constants/filterProductConstants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonDesign from "../../components/SkeletonDesign";
import PaginatedItems from "../../components/Pagination";
import result from "../../public/images/result.png";
// import "../../common/styles/Map/mapbox.css";

const RentBike = ({}) => {
  const filter = useSelector((state) => state.filter);
  const currency = useSelector((state) => state.currency);

  const accessToken =
    "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState();
  const [eventTypesData, setEventTypesData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [allProductTypesAndRates, setAllProductTypesAndRates] = useState(null);
  const [skeleton, setSkeleton] = useState(true);
  const [bbox, setBbox] = useState([]);

  const getFilterProducts = async (a, b, c, d) => {
    setSkeleton(true);
    const { data } = await client.query({
      query: getProductsByFilter,
      variables: {
        shopLocation: a,
        productTypeId: b,
        productRateTypeId: c,
        riders: d,
        latMin: bbox[1],
        latMax: bbox[3],
        lonMin: bbox[0],
        lonMax: bbox[2],
      },
    });
    if (!data) {
      setSkeleton(true);
    } else {
      setSkeleton(false);
      setFilterData(data);
      dispatch({ type: SET_FILTER_PRODUCTS, payload: data });
    }
  };

  const getAllProductTypesAndRatesData = async () => {
    const { data } = await client.query({
      query: getAllProductTypesAndRates,
    });
    setAllProductTypesAndRates(data);
  };
  useEffect(() => {
    getFilterProducts(
      filter?.filterFields?.searchLocation,
      filter?.filterFields?.productTypeId,
      filter?.filterFields?.productRateTypeId,
      filter?.filterFields?.riders
    );
    getAllProductTypesAndRatesData();
  }, []);
  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
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
    getFilterProducts(
      filter?.filterFields?.searchLocation,
      filter?.filterFields?.productTypeId,
      filter?.filterFields?.productRateTypeId,
      filter?.filterFields?.riders
    );
  };

  const geocoderContainerRef = useRef(null);
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    const geocoder = new MapboxGeocoder({
      accessToken,
      placeholder: "Enter Location",
      types: "country,region,place,postcode,locality,neighborhood",
    });

    geocoder?.addTo(geocoderContainerRef.current);

    geocoder?.on("result", (e) => {
      setBbox(e.result.bbox);
      resultsContainerRef.current.innerText = JSON.stringify(e.result, null, 2);
    });

    geocoder.on("clear", () => {
      resultsContainerRef.current.innerText = "";
    });
  }, []);

  return (
    <div className="container mx-auto mt-16">
      {/* <div className="col-span-4 mt-8 mb-7">
        <div className="text-sm breadcrumbs">
          <ul>
            <li className="text-common">
              <Link href="/">Home</Link>
            </li>
            <li className="text-common">
              <Link href="">product</Link>
            </li>
            <li className="text-[#7F7F7F]">Search results</li>
          </ul>
        </div>
      </div> */}
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-12 md:col-span-4">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-11">
              {filter && (
                <form className="card bg-yellow" onSubmit={onSubmit}>
                  <div className="p-4 xl:px-4 xl:py-6">
                    <div className="form-control">
                      <p className="font-medium text-xl">Search</p>
                      <label className="label">
                        <span
                          className="label-text text-sm font-medium"
                          disabled>
                          Location
                        </span>
                      </label>
                      <div className="w-full">
                        {/* <div className="relative" ref={geocoderContainerRef}>
                          <input
                            type="text"
                            placeholder="Enter Location"
                            className="input w-full mt-1 pr-3 pl-11 rounded-xl placeholder:text-xs"
                            value={filter?.filterFields?.searchLocation}
                            onChange={(e) => {
                              dispatch({
                                type: UPDATE_FILTER_FIELDS,
                                payload: {
                                  field: "searchLocation",
                                  value: e.target.value,
                                },
                              });
                            }}
                          />
                          <Image
                            className="absolute top-5 h-5 ml-4 left-1 w-5"
                            src={searchicon}
                            alt=""
                          />
                        </div> */}
                        <div
                          className="my-css form-control"
                          ref={geocoderContainerRef}
                          style={{
                            zIndex: 1,
                          }}></div>
                        <pre
                          id="result"
                          ref={resultsContainerRef}
                          className="hidden h-0"
                        />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm font-medium">
                          Date of Travel
                        </span>
                      </label>
                      <div className="w-full">
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            placeholder="Enter Date of Travel"
                            className="input w-full mt-1 pr-3 pl-11 rounded-xl placeholder:text-xs"
                          />
                          <Image
                            className="absolute top-5 h-5 ml-4 left-1 w-5"
                            src={calenderIcon}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-full">
                        <label className="label">
                          <span className="label-text text-sm font-medium">
                            Type of Bike
                          </span>
                        </label>
                        <select
                          className="select w-full rounded-xl text-[#7F7F7F] font-normal placeholder:text-sm"
                          value={filter?.filterFields?.productTypeId}
                          onChange={(e) => {
                            dispatch({
                              type: UPDATE_FILTER_FIELDS,
                              payload: {
                                field: "productTypeId",
                                value: e.target.value,
                              },
                            });
                          }}>
                          {allProductTypesAndRates?.productTypes?.map(
                            (item) => (
                              <option key={item?.id} value={item?.id}>
                                {item?.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="w-full">
                        <label className="label">
                          <span className="label-text text-sm font-medium">
                            Type for Events
                          </span>
                        </label>
                        <select
                          className="select w-full rounded-xl text-[#7F7F7F] font-normal placeholder:text-sm"
                          value={filter?.filterFields?.productRateTypeId}
                          onChange={(e) => {
                            dispatch({
                              type: UPDATE_FILTER_FIELDS,
                              payload: {
                                field: "productRateTypeId",
                                value: e.target.value,
                              },
                            });
                          }}>
                          {eventTypesData?.map((item) => (
                            <option key={item?.id} value={item?.id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-full relative">
                      <label className="label">
                        <span className="label-text text-sm font-medium">
                          How many riders
                        </span>
                      </label>
                      <select
                        className="select w-full rounded-xl text-[#7F7F7F] font-normal placeholder:text-sm pl-12"
                        value={filter?.filterFields?.riders}
                        onChange={(e) => {
                          {
                            dispatch({
                              type: UPDATE_FILTER_FIELDS,
                              payload: {
                                field: "riders",
                                value: e.target.value,
                              },
                            });
                          }
                        }}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                      <Image
                        className="absolute top-12 h-5 ml-4 left-1 w-5"
                        src={ridersIcon}
                        alt=""
                      />
                    </div>
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        className="text-white rounded-md py-3.5 bg-common normal-case font-normal">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <MapComponent />
        </div>
        <div className="col-span-12 md:col-span-8 mt-3">
          <div className="flex items-center justify-between mb-4 xl:mb-6">
            <h1 className="text-sm xl:text-2xl font-medium ">
              {filterData?.products?.edges?.length > 0
                ? filterData?.products?.edges?.length
                : "0"}{" "}
              rent bike hires found
            </h1>
          </div>
          {currentData?.map((data) => (
            <ProductCard key={data?.node?.id} productItem={data} />
          ))}
          {skeleton &&
            [...Array(5).keys()].map(() => (
              <Skeleton enableAnimation={true} wrapper={SkeletonDesign} />
            ))}
          {filterData?.products?.edges.length == 0 && !skeleton && (
            <div className="flex flex-col justify-center items-center mt-8">
              <Image className="" src={result} alt="" />
              <h1 className="text-2xl font-semibold">No Results Found</h1>
            </div>
          )}
          <div className="mt-[26px] mb-[50px] md:mt-9 md:mb-10 xl:mt-10 xl:mb-[110px]">
            <PaginatedItems
              itemsPerPage={5}
              getCurrentItems={getCurrentItems}
              items={filterData?.products?.edges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentBike;
