import React, { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import dropIcon from "/public/images/drop.png";
import user from "/public/images/user-big.png";
import Image from "next/image";
import Success from "./Success";
import { useMutation } from "@apollo/client";
import { createShopMutation } from "../../common/queries/shop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { client } from "/graphql/apolloClient";

const CreateShop = () => {
  const [createShop, { data, loading, error }] =
    useMutation(createShopMutation);
  const accessToken =
    "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";
  const [shopImage, setShopImage] = useState(null);
  const [shopCover, setShopCover] = useState(null);

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
      .then((data) => setAddress(data.features));
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

  console.log(country, state, city, street, zip);

  const onSubmit = (data) => {
    if (
      (data.shopImage[0].type == "image/jpeg" ||
        data.shopImage[0].type == "image/png" ||
        data.shopImage[0].type == "image/jpg") &&
      (data.shopCover[0].type != "image/jpeg" ||
        data.shopCover[0].type != "image/png" ||
        data.shopCover[0].type != "image/jpg")
    ) {
      createShop({
        variables: {
          userId:
            localStorage.getItem("userId") && localStorage.getItem("userId"),
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
      }).then((res) => {});
    } else {
      toast.error("Please select a valid photo");
      return;
    }
  };

  return (
    <>
      <input type="checkbox" id="create-shop-modal" className="modal-toggle" />
      <label htmlFor="create-shop-modal" className="modal">
        <label htmlFor="" className="modal-box relative max-w-3xl">
          {data?.createShop?.success ? (
            <Success />
          ) : (
            <div>
              <h1 className="text-2xl font-medium">Create your Rental Shop</h1>
              <div className="grid grid-cols-12 mt-5">
                <div className="col-span-full">
                  <div>
                    <h2 className="sr-only">Steps</h2>
                    <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                      <ol className="relative z-10 flex justify-around text-sm font-medium text-gray-500">
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
                        <li className="flex justify-center items-center">
                          <div className="w-[40px] lg:w-[235px] border-[1px] border-[#DADADA] bg-[#DADADA] h-[2px]"></div>
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
                            BrandShop Name<span className="text-red">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your bike shop name"
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
                            Legal Entity<span className="text-red">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your legan entity name"
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
                            Phone Number<span className="text-red">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter your phone number"
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("number")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.number?.message}
                        </p>
                      </div>
                      <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
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
                            Street and Number
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your street and number"
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
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("zipCode")}
                        />
                        <p className="text-red mt-1.5">
                          {errors?.zipCode?.message}
                        </p>
                      </div>
                    </div> */}
                    <div className="grid grid-cols-12 gap-4 my-4">
                      {/* <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">City</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter City name"
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
                      {/* <div
                        ref={mapContainer}
                        style={{ height: "20vh", width: "20vw" }}
                      /> */}
                      {/* <div className=" form-control rounded-[10px] w-full col-span-12 xl:col-span-6">
                        <label className="label">
                          <span className="font-medium mb-1 ">Country</span>
                        </label>
                        <select
                          placeholder="Country"
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                          {...register("country")}>
                          {countries?.map((country) => {
                            return (
                              <option key={country?.id}>{country.name}</option>
                            );
                          })}
                        </select>
                        <p className="text-red mt-1.5">
                          {errors?.country?.message}
                        </p>
                      </div> */}
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
                        <h3 className="font-medium  mt-4 mb-1 ">
                          Shop Profile Picture
                        </h3>
                        <label>
                          <div className=" p-4 transition bg-white border border-gray rounded-md appearance-none cursor-pointer">
                            <div className="py-5">
                              {shopImage ? (
                                <img
                                  className="w-[80px] h-[80px] rounded-full"
                                  src={shopImage}
                                  alt=""
                                />
                              ) : (
                                <Image
                                  className=" mt-4 mb-4"
                                  src={user}
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
                              {...register("shopImage", {
                                onChange: (e) => {
                                  const url = URL.createObjectURL(
                                    e.target.files[0]
                                  );
                                  setShopImage(url);
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
                            <div className="py-5 my-4 bg-gray">
                              {shopCover ? (
                                <img
                                  className="h-[80px] mx-auto"
                                  src={shopCover}
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
                                  setShopCover(url);
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
                        htmlFor="create-shop-modal"
                        className="py-2 px-3.5 border rounded-md text-center flex  text-custom-black cursor-pointer">
                        Cancel
                      </label>
                      <button
                        className="py-2 px-3.5 bg-common border border-common text-white rounded-md  cursor-pointer"
                        type="submit">
                        Next
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

export default CreateShop;
