import React from "react";

const Carousel = () => {
  return (
    <div>
      <div className='carousel w-full h-[400px] rounded-lg'>
        <div id='slide1' className='carousel-item relative w-full'>
          <img
            src='https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            className='w-full'
            alt=''
          />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide4' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide2' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide2' className='carousel-item relative w-full'>
          <img
            src='https://images6.alphacoders.com/549/549198.jpg'
            className='w-full'
            alt=''
          />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide1' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide3' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide3' className='carousel-item relative w-full'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHE4Zz8zMM9kO56pt5IBAvdyK5Jmv0BMEhx6GAR4hCd1YJybUENjGCppHOk6yiZVm97o&usqp=CAU'
            className='w-full'
            alt=''
          />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide2' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide4' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide4' className='carousel-item relative w-full'>
          <img
            src='https://i.pinimg.com/originals/c8/cc/e1/c8cce1044c5ca866ccc11cb651d9886e.jpg'
            className='w-full'
            alt=''
          />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide3' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide1' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
