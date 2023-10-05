import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { client } from "/graphql/apolloClient";
import { getAllProductTypesAndRates } from "../common/queries/products";
import { AiFillRightSquare, AiFillLeftSquare } from "react-icons/ai";
import MapBox from "../components/Map";
// import Map from "react-mapbox-gl";

const Location = () => {
  const [open, setOpen] = useState(false);
  const [allProductTypesAndRates, setAllProductTypesAndRates] = useState(null);
  useEffect(() => {
    const getAllProductTypesAndRatesData = async () => {
      const { data } = await client.query({
        query: getAllProductTypesAndRates,
      });
      setAllProductTypesAndRates(data);
    };
    getAllProductTypesAndRatesData();
  });

  return (
    <div className="container overflow-hidden">
      <div className="my-6 w-full h-[800px] relative">
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740908214!2d-118.69192340304039!3d34.020161299892294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1674741976179!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe> */}
        <MapBox />
        {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
        <div
          className={`absolute top-1 transition-all duration-500 ease-in-out ${
            open ? "right-[60%] xl:right-[30%]" : "right-0"
          }`}>
          <button className="text-4xl" onClick={() => setOpen(!open)}>
            {open ? <AiFillRightSquare /> : <AiFillLeftSquare />}
          </button>
        </div>

        <div
          className={`absolute top-0 bottom-10  xl:right-1  md:right-0 right-0 transition-all duration-500 ease-in-out bg-white ${
            open ? "left-[40%]  xl:left-[70%]" : "left-[100%]"
          }`}>
          <div className=" ml-5">
            <h3 className="text-custom-black mt-4 text-xl font-semibold">
              Bike Type
            </h3>
            <div className="flex items-center gap-3 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Road</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Mountain</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Cruiser</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Folding</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">ElliptiGO</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Fixed Gear</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Single Speed</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Hybrid</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Children's</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Cargo</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Tandem</label>
            </div>
            <div className="flex items-center gap-2.5 my-4">
              <input className="w-4" type="checkbox" name="" id="" />
              <label htmlFor="">Cyclocross</label>
            </div>
            <div className="divider mr-4"></div>
            <h3 className="text-custom-black mt-4 text-xl font-semibold">
              Bike Details
            </h3>
            <p>Price</p>
            <progress
              className="progress progress-yellow"
              value="0"
              max="100"></progress>
            <div className="flex items-center justify-between mr-4">
              <p>$1/day</p>
              <p>$∞/day</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 md:mb-20 xl:mb-[100px]">
        {allProductTypesAndRates?.products?.edges?.slice(0, 2)?.map((data) => (
          <ProductCard key={data?.node?.id} productItem={data} />
        ))}
      </div>
    </div>
  );
};

export default Location;
