import React from "react";
import icon1 from "../public/images/icon-1.png";
import icon2 from "../public/images/icon2.png";
import icon3 from "../public/images/cardicono3.png";
import icon4 from "../public/images/card4.svg";
import icon5 from "../public/images/icon5.png";
import icon6 from "../public/images/card6.png";
import paypal from "../public/images/paypal.svg";
import Image from "next/image";

const shopOwnerAccount = () => {
  return (
    <shopOwnerInfoLayout>
      <div>
        <div className='border container mt-20 p-4 rounded-lg'>
          <div className='grid grid-cols-12'>
            <div className='col-span-3'>
              <p className='font-medium'>Payment Method</p>
            </div>
            <div className='col-span-9'>
              <p className='text-sm text-[#7F7F7F]'>
                Your payment method is used to pay for your rentals. It can be a
                credit card or PayPal account. Please pick a payment method
              </p>
            </div>
          </div>
          <form className=' mt-4 '>
            <div className='p-4 border rounded-lg'>
              <div className='flex'>
                <input
                  type='radio'
                  name='radio-1'
                  className='radio radio-common checked:bg-common w-5 h-5'
                />
                <div className='mt-[5px]'>
                  <Image className='h-3 border ml-5' src={icon1} alt='' />
                </div>
                <div className='mt-[5px]'>
                  <Image className='h-3 border ml-5' src={icon2} alt='' />
                </div>
                <div className='mt-[5px]'>
                  <Image className='h-4 border ml-5' src={icon3} alt='' />
                </div>
                <div className='mt-[5px]'>
                  <Image className='h-4 border ml-5' src={icon4} alt='' />
                </div>
                <div className='mt-[5px]'>
                  <Image className='h-4 border ml-5' src={icon5} alt='' />
                </div>
                <div className='mt-[5px]'>
                  <Image className='h-4 border ml-5 ' src={icon6} alt='' />
                </div>
                <div className='ml-5'>
                  <p className='text-sm font-normal text-[#7F7F7F]'>
                    Debit/Credit Card
                  </p>
                </div>
              </div>
            </div>
            <div className=' bg-[#F5F5F5] rounded-xl'>
              <div className='form-control'>
                <label className='label'>
                  <span className='font-medium'>Cardholder name</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter your cardholder name'
                  className='input input-bordered placeholder:text-sm focus:outline-none '
                />
              </div>
              <div className='form-control mt-4'>
                <label className='label'>
                  <span className='font-medium'>Credit Card Number</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter your credit card number'
                  className='input input-bordered focus:outline-none placeholder:text-sm '
                />
              </div>
              <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-4 form-control'>
                  <label className='label'>
                    <span className='font-medium'>Expiration Date </span>
                  </label>
                  <input
                    type='month'
                    placeholder='MM'
                    className='input focus:outline-none input-bordered placeholder:text-sm '
                  />
                </div>
                <div className='col-span-4 form-control mt-6'>
                  <label className='label'></label>
                  <input
                    type='text'
                    placeholder='YY'
                    className='input focus:outline-none input-bordered placeholder:text-sm '
                  />
                </div>
                <div className=' col-span-4 form-control'>
                  <label className='label'>
                    <span className='font-medium'>CVV/CVC Number</span>
                  </label>
                  <input
                    type='text'
                    placeholder='000 / 0000'
                    className='input focus:outline-none input-bordered placeholder:text-sm '
                  />
                </div>
              </div>
            </div>
            <div className='mt-4 flex border bg-white p-2 rounded-lg'>
              <input
                type='radio'
                name='radio-1'
                className='radio radio-common checked:bg-common w-5 h-5 mt-2'
              />
              <div className='mt-[5px]'>
                <Image className=' border ml-3' src={paypal} alt='' />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-normal text-[#7F7F7F] mt-2'>
                  Paypal
                </p>
              </div>
            </div>
            <button className='btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full mt-6 '>
              Update Payment Method
            </button>
          </form>
        </div>
        <div className='grid grid-cols-12 mt-10 border rounded-lg p-4 mb-24'>
          <div className='col-span-full'>
            <div className='flex gap-6'>
              <p className='font-medium'>Deactivate / Close Account</p>
              <p className='text-sm text-[#7F7F7F] mt-1'>
                Here you can deactivate your Go Velo account. This step can not
                be undone.
              </p>
            </div>
            <button className='btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal w-full mt-6 '>
              Deactivate / Close Account
            </button>
          </div>
        </div>
      </div>
    </shopOwnerInfoLayout>
  );
};

export default shopOwnerAccount;
