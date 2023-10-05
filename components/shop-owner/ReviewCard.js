import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import ReactStars from "react-stars";

const ReviewCards = ({ data }) => {
  return (
    <div>
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-2 md:col-span-1 xl:col-span-1">
          <Image
            width={500}
            height={500}
            alt=""
            className="w-14 xl:w-16 border rounded-full"
            src={data.user.userImage}
          />
        </div>
        <div className="col-span-10 md:col-span-7 xl:col-span-8 ml-3 xl:ml-0 flex-col w-full">
          <div className="flex mb-2 items-center gap-4">
            <p className="font-medium text-sm xl:text-base">
              {data?.user?.name}
            </p>
            <div className="flex">
              <ReactStars
                count={5}
                value={data?.rating}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <p className="text-xs xl:text-sm">{data?.review}</p>
        </div>
        <div className="col-span-4 md:col-span-4 xl:col-span-3 mt-2 md:mt-0 flex justify-end md:justify-end">
          <Link
            href={`/details/[id]?id=${data?.product?.id}`}
            className="text-common text-base xl:text-lg">
            Details
          </Link>
        </div>
      </div>
      <div className="divider mx-auto mt-1 mb-1"></div>
    </div>
  );
};

export default ReviewCards;
