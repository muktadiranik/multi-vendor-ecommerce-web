import React from "react";
import Image from "next/image";

const Card = (data) => {
  return (
    <div className="col-span-1 rounded-xl ">
      <Image
        width={412}
        height={294}
        className="w-full h-full rounded-t-xl"
        src={data?.data?.picture}
        alt=""
      />
      <div className="flex items-center justify-between px-4 py-2 bg-[#FEBA02] rounded-b-xl">
        <h1 className="text-xl font-semibold text-white">{data?.data?.name}</h1>
      </div>
    </div>
  );
};

export default Card;
