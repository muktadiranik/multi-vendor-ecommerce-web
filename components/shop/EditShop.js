import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import dropIcon from "/public/images/drop.png";
import user from "/public/images/user-big.png";
import Image from "next/image";
import Success from "./Success";
import { useMutation } from "@apollo/client";
import {
  createShopMutation,
  updateShopByOwnerId,
} from "../../common/queries/shop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SHOP } from "../../redux/constants/shopConstants";
import { client } from "/graphql/apolloClient";
import { toast } from "react-toastify";

const EditShop = () => {
  const [updateShop, { data }] = useMutation(updateShopByOwnerId);
  const accessToken =
    "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [shopImagePreview, setShopImagePreview] = useState(null);
  const [shopCoverPreview, setShopCoverPreview] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const closeRef = useRef();

  const schema = yup.object().shape({
    name: yup.string().required("BrandShop name is required"),
    entity: yup.string().required("Legalentity is required"),
    number: yup
      .string()
      .required("Phone number is required")
      .max(13, "Maximum 13 characters"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    // street: yup.string().required("Street is required"),
    // zipCode: yup.string().required("Zipcode is required"),
    // city: yup.string().required("City is required"),
    // country: yup.string().required("Country is required"),
    openingTime: yup.string().required("OpeningTime is required"),
    closingTime: yup.string().required("ClosingTime is required"),
    shopImage: yup.mixed().required("shopImage is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [address, setAddress] = useState([]);

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapContainer = useRef(null);
  const [markerCoords, setMarkerCoords] = useState([0, 0]);
  const [currentGeo, setCurrentGeo] = useState(null);
  const [markerEvent, setMarkerEvent] = useState(null);
  const [newCoords, setNewCoords] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

    const initializedMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: markerCoords,
      zoom: 13,
    });

    setMap(initializedMap);
  }, []);

  useEffect(() => {
    if (map) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      });

      map.addControl(geocoder);

      geocoder.on("result", (event) => {
        const { center } = event?.result?.center;
        console.log(event.result);
        setAddress(event.result.context);
        setNewCoords(event.result.center);

        if (marker) {
          marker.setLngLat(markerCoords);
        } else {
          const newMarker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat(event.result.center)
            .addTo(map);
          setMarker(newMarker);
        }
      });
    }
  }, [map]);

  useEffect(() => {
    if (marker) {
      marker.on("dragend", (event) => {
        // resultsContainerRef.current.innerText = "";
        setNewCoords([
          event.target.getLngLat().lng,
          event.target.getLngLat().lat,
        ]);

        const { lng, lat } = event.target.getLngLat();
        setMarkerCoords(marker.getLngLat().toArray());
      });
    }
  }, [marker]);
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${markerCoords[0]},${markerCoords[1]}.json?types=country,region,postcode,district,place,locality,neighborhood,address,poi&access_token=pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "DATA");
        setAddress(data.features);
      });
  }, [markerCoords]);
  // console.log(currentGeo, "Before drag");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    for (let i = 0; i < address.length; i++) {
      const element = address[i];
      if (element.id.split(".")[0] == "country") {
        setCountry(element.text);
        continue;
      }
      if (element.id.split(".")[0] == "region") {
        setState(element.text);
        continue;
      }
      if (element.id.split(".")[0] == "district") {
        setCity(element.text);
        continue;
      }
      if (element.id.split(".")[0] == "address") {
        setStreet(element.text);
        continue;
      }
      if (element.id.split(".")[0] == "postcode") {
        setZip(element.text);
        continue;
      }
    }
  }, [address]);

  console.log(newCoords, "New coords");

  const onSubmit = (data) => {
    updateShop({
      variables: {
        id: shop?.shop?.shops?.edges[0]?.node?.id,
        name: data.name,
        legalEntity: data.entity,
        phone: data.number,
        email: data.email,
        street: street,
        zipCode: zip,
        city: city,
        country: country,
        longitude: newCoords[0],
        latitude: newCoords[1],
        state: state,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        shopImage: data.shopImage[0],
        shopCover: data.shopCover[0],
      },
    }).then((res) => {
      dispatch({
        type: UPDATE_SHOP,
        payload: res,
      });
      closeRef.current.click();
      toast.success("Shop update successful", { toastId: "GOVELO" });
    });
  };

  return (
    <>
      <input type="checkbox" id="edit-shop-modal" className="modal-toggle" />
      <label htmlFor="edit-shop-modal" className="modal">
        <label htmlFor="" className="modal-box relative max-w-3xl">
          {data?.createShop?.success ? (
            <Success />
          ) : (
            <div>
              <h1 className="text-2xl font-medium">Edit your Rental Shop</h1>
              <div className="grid grid-cols-12 mt-5">
                <div className="col-span-full">
                  <div>
                    <h2 className="sr-only">Steps</h2>
                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                      <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                        <li className="flex gap-2 items-center bg-white ">
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
                          <span className="text-black font-semibold text-sm">
                            {" "}
                            Shop Details
                          </span>
                        </li>
                        <li className="flex gap-2 items-center bg-white ">
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
                          <span className="text-black font-semibold">
                            Confirmation
                          </span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="mt-8 text-lg font-medium text-left">
                  Write Your Rental Bike Shop General Information.
                </p>
                <form
                  className="mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data">
                  <div className="border border-gray rounded-xl pt-6 pb-4 px-4">
                    <div className="grid grid-cols-12 gap-4">
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Brand Shop Name
                            <span className="text-common">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your bike shop name"
                          defaultValue={shop?.shop?.shops?.edges[0]?.node?.name}
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("name")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.name?.message}
                        </p>
                      </div>
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Legal Entity<span className="text-common">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your legal entity name"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.legalEntity
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("entity")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.entity?.message}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Phone Number<span className="text-common">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your phone number"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.phone
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("number")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.number?.message}
                        </p>
                      </div>
                      <div className="form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.email
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("email")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.email?.message}
                        </p>
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-12 gap-4">
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Street Number
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your street and number"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.street
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("street")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.street?.message}
                        </p>
                      </div>
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">Zip Code</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter zip code"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.zipCode
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("zipCode")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.zipCode?.message}
                        </p>
                      </div>
                    </div> */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">City</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter City name"
                          defaultValue={shop?.shop?.shops?.edges[0]?.node?.city}
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("city")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.city?.message}
                        </p>
                      </div> */}
                      <div
                        className="col-span-12"
                        ref={mapContainer}
                        style={{ width: "100%", height: "200px" }}></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Opening Hours
                          </span>
                        </label>
                        <input
                          type="time"
                          placeholder="09:00 am"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.openingTime
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          step="2"
                          {...register("openingTime")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.openingTime?.message}
                        </p>
                      </div>
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">
                            Closing Hours
                          </span>
                        </label>
                        <input
                          type="time"
                          placeholder="06:00 pm"
                          defaultValue={
                            shop?.shop?.shops?.edges[0]?.node?.closingTime
                          }
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          step="2"
                          {...register("closingTime")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.closingTime?.message}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <h3 className="font-medium  mt-4 mb-1">
                          Shop Profile Picture
                        </h3>
                        <label>
                          <div className=" p-4 transition bg-white border border-gray rounded-md appearance-none cursor-pointer">
                            {shop?.shop?.shops?.edges[0]?.node?.shopImage &&
                            !shopImagePreview ? (
                              <Image
                                className=" mt-4 mb-4"
                                width={80}
                                height={80}
                                src={
                                  shop?.shop?.shops?.edges[0]?.node?.shopImage
                                }
                                alt=""
                              />
                            ) : shopImagePreview ? (
                              <img
                                className="w-[80px] h-[80px] mt-4 mb-4"
                                src={shopImagePreview}
                                alt=""
                              />
                            ) : (
                              <Image className=" mt-4 mb-4" src={user} alt="" />
                            )}

                            <p className="text-[#7F7F7F] text-sm">
                              Please upload only formats as jpg, jpeg, png.
                            </p>

                            <input
                              type="file"
                              name="file_upload"
                              className="hidden"
                              {...register("shopImage", {
                                onChange: (e) => {
                                  const url = URL.createObjectURL(
                                    e.target.files[0]
                                  );
                                  setShopImagePreview(url);
                                },
                              })}
                            />
                          </div>
                        </label>
                      </div>
                      <div className="col-span-6">
                        <h3 className="font-medium mt-4 mb-1">Cover Photo</h3>
                        <label>
                          <div className=" p-4 transition bg-white border border-gray rounded-md appearance-none cursor-pointer">
                            <div className="py-4 bg-gray ">
                              {shop?.shop?.shops?.edges[0]?.node?.shopCover &&
                              !shopCoverPreview ? (
                                <img
                                  className="h-[80px] mx-auto"
                                  src={
                                    shop?.shop?.shops?.edges[0]?.node?.shopCover
                                  }
                                  alt=""
                                />
                              ) : shopCoverPreview ? (
                                <img
                                  className="h-[80px] mx-auto"
                                  src={shopCoverPreview}
                                  alt=""
                                />
                              ) : (
                                <Image
                                  className="h-[80px] mx-auto"
                                  src={dropIcon}
                                  alt=""
                                />
                              )}
                            </div>

                            <p className="text-[#7F7F7F] text-sm">
                              Please upload only formats as jpg, jpeg, png.
                            </p>
                            <input
                              type="file"
                              name="file_upload"
                              className="hidden"
                              {...register("shopCover", {
                                onChange: (e) => {
                                  const url = URL.createObjectURL(
                                    e.target.files[0]
                                  );
                                  setShopCoverPreview(url);
                                },
                              })}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start xl:justify-end mt-4 ">
                    <div className="flex items-center gap-4">
                      <label
                        ref={closeRef}
                        htmlFor="edit-shop-modal"
                        className="py-2 px-3.5 border rounded-md text-center flex  text-custom-black cursor-pointer">
                        Cancel
                      </label>
                      <button
                        className="py-2 px-3.5 bg-common border border-common text-white rounded-md  cursor-pointer"
                        type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </label>
      </label>
    </>
  );
};

export default EditShop;
