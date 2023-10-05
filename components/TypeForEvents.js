import React from "react";

const TypeForEvents = () => {
  const fakeData = [
    { id: 1, name: "Homer" },
    { id: 2, name: "Marge" },
    { id: 3, name: "Bart" },
  ];
  return (
    <div className='flex items-center px-4 h-14  border border-gray-200 rounded-[10px] mt-1'>
      <select className='bg-transparent border-none outline-none text-[#7F7F7F] text-base w-full'>
        {fakeData.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeForEvents;
