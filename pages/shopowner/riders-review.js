import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "/public/images/shop-owner/Cover.svg";
import shopimage from "/public/images/shop-owner/cycling.png";
import frameicon from "/public/images/shop-owner/Frame.png";
import phoneicon from "/public/images/Vector2.png";
import locationicon from "/public/images/shop-owner/location-marker.png";
import calenderIcon from "/public/images/uim_calender.png";
import staricon from "/public/images/shop-owner/Star.png";
import editicon from "/public/images/shop-owner/white-edit.png";
import Link from "next/link";
import ReviewCards from "../../components/shop-owner/ReviewCard";
import { getAllProducts } from "../../common/queries/products";
import { client } from "/graphql/apolloClient";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviewByShopId,
  getShopByUserId,
} from "../../common/queries/shop";
import { shopSuccess } from "/redux/slice/shopRedux";
import CoverImage from "../../public/images/Cover.png";
import { useRouter } from "next/router";
import MyShop from "../../components/shop/MyShop";
import { GET_SHOP } from "../../redux/constants/shopConstants";
import PaginatedItems from "../../components/Pagination";

const Ridersreview = ({ allProducts }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const shop = useSelector((state) => state.shop);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const getReviewByShopId = async () => {
      const { data } = await client.query({
        query: getProductReviewByShopId,
        variables: {
          shopId: shop?.shop?.shops?.edges[0]?.node?.id,
        },
      });
      setReviews(data.getProductReviewsByShopId);
    };
    getReviewByShopId();
  }, []);

  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (pageCount - currentPage == 1) {
      setCurrentPage(currentPage);
    } else if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const size = 5;

    if (reviews) {
      const count = reviews?.length;
      const page = Math.ceil(count / 5);
      setPageCount(page);
      const x = currentPage * size;
      const y = x + size;

      if (page || size) {
        const slicedData = reviews?.slice(x, y);
        setCurrentData(slicedData);
      } else {
        setCurrentData(reviews);
      }
    }
  }, [reviews, currentPage]);

  return (
    <div className="container mt-4 xl:mt-6">
      <MyShop />

      <div className="grid grid-cols-12  mt-4 md:mt-6">
        <div className="col-span-full"></div>
      </div>
      <div className="grid grid-cols-12">
        {reviews && (
          <div className="col-span-full">
            {reviews?.map((data) => (
              <ReviewCards key={data.id} data={data} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-[26px] mb-[50px] md:mt-9 md:mb-[114px] xl:mt-[42px] xl:mb-[150px]">
        <PaginatedItems
          itemsPerPage={5}
          getCurrentItems={getCurrentItems}
          items={reviews}
        />
      </div>
      {/* <div className="mt-[34px] lg:mt-12 xl:mt-[38px]  mb-12 lg:mb-28 flex justify-center items-center">
        <button
          onClick={handlePrevious}
          type="button"
          className=" text-base font-bold m-2">
          <span className="">Prev</span>
        </button>
        {reviews &&
          [...Array(pageCount).keys()].map((number) => (
            <button
              onClick={() => setCurrentPage(number)}
              className={`m-2${
                currentPage === number
                  ? "btn btn-sm btn-active text-white bg-common rounded-md mx-[6px]"
                  : "btn btn-sm text-[#C3C3C3] border border-[#C3C3C3] mx-[6px] rounded-md"
              }`}>
              {number + 1}
            </button>
          ))}
        <button
          onClick={handleNext}
          type="button"
          className="m-2 text-base font-bold">
          <span className="">Next</span>
        </button>
      </div> */}
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAllProducts,
  });
  return {
    props: {
      allProducts: data,
    },
  };
}

export default Ridersreview;
