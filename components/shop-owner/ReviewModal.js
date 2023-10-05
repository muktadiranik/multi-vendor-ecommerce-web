import React from "react";

const ReviewModal = () => {
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <form className='modal-box'>
          <h3 className='font-medium mb-3'>Your Rating</h3>
          <div className='rating mb-6'>
            <input
              type='radio'
              name='rating-2'
              className='mask mask-star-2 bg-[#FAB803]'
              checked
            />
            <input
              type='radio'
              name='rating-2'
              className='mask mask-star-2 bg-[#FAB803] '
            />
            <input
              type='radio'
              name='rating-2'
              className='mask mask-star-2 bg-[#FAB803]'
            />
            <input
              type='radio'
              name='rating-2'
              className='mask mask-star-2 bg-[#FAB803]'
            />
            <input
              type='radio'
              name='rating-2'
              className='mask mask-star-2 bg-[#FAB803]'
            />
          </div>
          <p className='font-semibold'>What would you like to share with us?</p>
          <textarea
            className='textarea textarea-bordered  w-full h-24 placeholder:text-sm'
            placeholder=' Write you review'></textarea>
          <p className='font-semibold  mt-6'>Your renting bike link</p>
          <input
            type='text'
            placeholder='Paste your item link here...'
            className='input input-bordered w-full placeholder:text-sm'
          />

          <div className='modal-action flex justify-start'>
            <label
              htmlFor='my-modal'
              className='btn bg-transparent hover:bg-transparent text-black normal-case font-normal'>
              Cancel
            </label>
            <button className='btn bg-common hover:bg-common text-white normal-case font-normal'>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
