import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Carousel({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[297px] w-full m-auto relative group">
      <div
        style={{
          backgroundImage: `url(${data[currentIndex]?.product?.image})`,
        }}
        className="w-full h-full rounded-t-xl bg-center bg-cover duration-500"></div>
      <div className="flex items-center justify-between px-4 py-2 bg-[#FEBA02] rounded-bl-xl rounded-br-xl">
        <h1 className="text-xl font-semibold text-white">
          Hire of {data[currentIndex]?.product?.brand}
        </h1>
      </div>
      <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[-15px] text-2xl rounded-full p-2 bg-gray bg-opacity-70 text-black cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] right-[-15px] text-2xl rounded-full p-2 bg-gray bg-opacity-70 text-black cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {data.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl text-common cursor-pointer ${
              slideIndex === currentIndex ? "text-common" : "text-white"
            }`}>
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
