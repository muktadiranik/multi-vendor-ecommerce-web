// import React, { useEffect, useState } from "react";
// import { getBikeTypes } from "../common/queries/type-of-bike";
// import { client } from "/graphql/apolloClient";

// const TypeOfBikes = () => {
//   const [typeOfBikes, setTypeOfBikes] = useState();

//   useEffect(() => {
//     const fetchBikeTypes = async () => {
//       const { data } = await client.query({
//         query: getBikeTypes,
//       });
//       setTypeOfBikes(data);
//     };
//     fetchBikeTypes();
//   }, []);

//   return (
//     <div className="flex items-center px-4 h-14  border border-gray-200 rounded-[10px] mt-1">
//       <select className="bg-transparent border-none outline-none text-[#7F7F7F] text-base w-full">
//         {typeOfBikes?.productTypes?.map((type) => (
//           <option key={type.id}>{type.name}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default TypeOfBikes;
