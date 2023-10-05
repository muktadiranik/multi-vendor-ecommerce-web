import Image from "next/image";
import React from "react";
import iconSuccess from "/public/images/Success.png";
const OrderRecivedModal = () => {
  return (
    <div>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mt-10 text-center'>
            Your order has been received
          </h3>
          <Image className='mx-auto mt-6' src={iconSuccess} alt='' />
          <p className='py-4 text-center font-medium'>
            Thanks you for your purchase!
          </p>
          <p className=' text-center font-medium'>
            Your order ID is : hu5494sk
          </p>
          <p className=' text-center font-medium text-[#7F7F7F] text-sm'>
            You will receive an order confirmation email <br /> with details of
            your order
          </p>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn bg-common normal-case hover:bg-transparent hover:text-black mx-auto '>
              Continue Renting
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRecivedModal;
