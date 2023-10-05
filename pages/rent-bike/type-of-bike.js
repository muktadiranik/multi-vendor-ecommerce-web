import React, { useEffect, useState } from "react";
import { client } from "/graphql/apolloClient";
import { getProductTypes } from "../../common/queries/search-component";

const TypeOfBike = () => {
  const [typeOfBikes, setTypeOfBikes] = useState();

  useEffect(() => {
    const fetchBikeTypes = async () => {
      const { data } = await client.query({
        query: getProductTypes,
      });
      setTypeOfBikes(data);
    };
    fetchBikeTypes();
  }, []);

  return (
    <div>
      <div className='w-full'>
        <label className='label'>
          <span className='label-text  text-sm font-medium'>Type of Bike</span>
        </label>
        <select
          className='select w-full rounded-xl text-[#7F7F7F] font-normal  placeholder:text-sm'
          defaultValue={typeOfBikes?.productTypes?.[0]}>
          {typeOfBikes?.productTypes.map((data) => (
            <option key={data.id}>{data.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TypeOfBike;
