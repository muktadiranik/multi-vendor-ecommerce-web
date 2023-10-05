import React from "react";
import cycleimage from "/public/images/shop-owner/cycle.png";

import plusIcon from "/public/images/shop-owner/PlusCircle.png";
import Image from "next/image";
import ProductsCard from "../../components/shop-owner/ProductsCard";
const Products = () => {
  const fakedata = [
    {
      id: "2",
      picture: "https://i.ibb.co/pf9D6Kj/image-76.png",
      name: "Handbrake Bike",
      location: "Camden, London",
      deadline:
        "This property has no availabillity on our site from 29 Oct to 29 Nov.",
      button: "Show on map",
      map: "1.5 miles from center",
      review: "Review score",
      totalView: "2,023 review",
      rating: "6.0",
    },
    {
      id: "2",
      picture: "https://i.ibb.co/pf9D6Kj/image-76.png",
      name: "Footbrake Bike",
      location: "Camden, London",
      deadline:
        "This property has no availabillity on our site from 29 Oct to 29 Nov.",
      button: "Show on map",
      map: "1.5 miles from center",
      review: "Review score",
      totalView: "2,023 review",
      rating: "6.0",
    },
    {
      id: "3",
      picture: "https://i.ibb.co/pf9D6Kj/image-76.png",
      name: "Footbrake Bike",
      location: "Camden, London",
      deadline:
        "This property has no availabillity on our site from 29 Oct to 29 Nov.",
      button: "Show on map",
      map: "1.5 miles from center",
      review: "Review score",
      totalView: "2,023 review",
      rating: "6.0",
    },
  ];

  return (
    <div>
      <Image src={cycleimage} alt="" />
      <div className="grid grid-cols-12">
        <div className="col-span-4"></div>
        <div className="col-span-5"></div>

        <button className="col-span-3  bg-common p-1 rounded-lg justify-center mt-5 flex w-full">
          <Image className="mr-3" src={plusIcon} alt="" />
          <p className="text-white mt-1">Add Product</p>
        </button>
      </div>
      <div className="mt-10">
        {fakedata.map((data) => (
          <ProductsCard key={data.id} data={data} />
        ))}
      </div>

      <div className="grid grid-cols-12 mt-14 w-full">
        <div className="col-span-4 ">
          <button className="btn bg-transparent w-56 font-normal normal-case text-black">
            Save for later
          </button>
        </div>
        <div className="col-span-4">
          <button className="btn w-56 bg-transparent font-normal normal-case text-black">
            Review draft version
          </button>
        </div>
        <div className="col-span-4">
          <button className="btn w-60 bg-common font-normal normal-case text-black">
            Submit and publish button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
