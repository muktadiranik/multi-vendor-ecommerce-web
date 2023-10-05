import React from "react";

const CreateNewPassWord = () => {
  return (
    <div className='container'>
      <div className='mt-24 grid grid-cols-12'>
        <div className='col-span-3'></div>
        <div className='col-span-6'>
          <p className='text-center text-2xl font-medium mb-4'>
            Create new password
          </p>
          <p className='text-[#7F7F7F] text-sm text-center mb-10'>
            your new password must be different from previous used passwords.
          </p>
          <form></form>
        </div>
        <div className='col-span-3'></div>
      </div>
    </div>
  );
};

export default CreateNewPassWord;
