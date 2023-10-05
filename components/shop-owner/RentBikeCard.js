import Image from "next/image";
import React from "react";

const RentBikeCard = ({ data }) => {
  return (
    <div className="border border-[#DADADA]">
      <div className="p-4">
        <Image
          width={200}
          height={200}
          src={data?.node?.image}
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
  );
};

export default RentBikeCard;
