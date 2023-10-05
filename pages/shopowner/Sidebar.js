import React from "react";
import userIcon from "/public/images/shop-owner/user.png";
import location from "/public/images/shop-owner/location.png";
import time from "/public/images/shop-owner/time.png";
import phone from "/public/images/Vector2.png";
import briefcase from "/public/images/shop-owner/Briefcase@2x.png";

const Sidebar = () => {
  return (
    <div className=''>
      <aside className='w-full p-6 '>
        <nav className='space-y-8 text-sm'>
          <div className='space-y-2 border bg-[#EBF3FF] rounded-xl p-2'>
            <h2 className='text-xl font-medium'>Shop Profile</h2>
            <div className='flex flex-col space-y-1'>
              <div className='flex'>
                <img className='w-4 h-4 mr-3' src={userIcon} alt='' />
                <p className='text-sm'>
                  Owner Name: <span className='font-semibold'>Tutul Mea</span>
                </p>
              </div>
              <div className='flex'>
                <img className='w-4 h-4 mr-3' src={briefcase} alt='' />
                <p className='text-sm'>
                  Shop Name: <span className='font-semibold'>Velo Bikers</span>
                </p>
              </div>
              <div className='flex'>
                <img className='w-4 h-4 mr-3' src={location} alt='' />
                <p className='text-sm'>
                  Shop Location:{" "}
                  <span className='font-semibold'>Camden, London </span>
                </p>
              </div>
              <div className='flex'>
                <img className='w-4 h-4 mr-3' src={time} alt='' />
                <p className='text-sm'>
                  Opening hours:{" "}
                  <span className='font-semibold'> 9am - 6pm </span>
                </p>
              </div>
              <div className='flex'>
                <img className='w-4 h-4 mr-3' src={phone} alt='' />
                <p className='text-sm'>
                  Contact Number:{" "}
                  <span className='font-semibold'> +5266 214 5121 </span>
                </p>
              </div>
            </div>
          </div>
          <div className='border'>
            <div className='space-y-2 ml-5 mt-6'>
              <h2 className='text-xl font-medium'>Filter by:</h2>
              <div className='flex flex-col space-y-1'>
                <p className='mt-5 mb-4 text-xl font-medium'>Bike stock</p>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Mountain'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  text-[#7F7F7F] text-start '>
                    Mountain
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Road'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Road
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Gravel'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Gravel
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Commuter'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Commuter
                  </label>
                </div>
              </div>
              <div className='divider w-64 mx-auto'></div>
            </div>
            <div className='space-y-2 ml-5 mt-6'>
              <h2 className='text-xl font-medium'>Bike Available</h2>
              <div className='flex flex-col space-y-1'>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='sizes'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  text-[#7F7F7F] text-start '>
                    Sizes
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Road'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm w-[830px] text-[#7F7F7F] text-start '>
                    Model
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Gravel'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Brand
                  </label>
                </div>
              </div>
              <div className='divider w-64 mx-auto mt-5 mb-5'></div>
            </div>
            <div className='space-y-2 ml-5 mt-6 mb-24'>
              <h2 className='text-xl font-medium'>Options Include</h2>
              <div className='flex flex-col space-y-1'>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Mountain'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Helmets
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Road'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Pedals
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Gravel'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Lights
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Commuter'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Waterbottles
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Commuter'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Tools
                  </label>
                </div>
                <div className='flex'>
                  <input
                    type='checkbox'
                    name='Commuter'
                    id='remember'
                    aria-label='Remember me'
                    className='mr-1 rounded-sm'
                  />
                  <label
                    for='remember'
                    className='text-sm  w-[830px] text-[#7F7F7F] text-start '>
                    Spare iner tubes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
