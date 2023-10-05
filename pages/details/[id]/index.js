import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllProductTypesAndRates,
  getProductById,
} from "../../../common/queries/products";
import { client } from "/graphql/apolloClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCartMutation } from "../../../common/queries/cart";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "/redux/constants/cartConstants";
import ProductDetails from "../../../components/ProductDetails";
import ProductCard from "../../../components/ProductCard";
import { toast } from "react-toastify";
import PaginatedItems from "../../../components/Pagination";

const index = () => {
  const router = useRouter();

  const { id } = router.query;

  const [addToCart, { data, loading, error }] = useMutation(addToCartMutation);

  const dispatch = useDispatch();

  const [currentData, setCurrentData] = useState([]);
  const [productId, setProductId] = useState(false);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      setProductId(true);
    }
  }, []);

  const add = (id) => {
    addToCart({
      variables: {
        userId:
          localStorage.getItem("userId") &&
          String(JSON.parse(localStorage.getItem("userId"))),
        productId: id,
        quantity: 1,
      },
    }).then((res) => {
      dispatch({ type: ADD_TO_CART, payload: res.data.addToCart });
      toast.success("Added to cart");
    });
  };
  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await client.query({
        query: getAllProductTypesAndRates,
      });
      setProducts(data);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getProductDetails = async () => {
      const { data } = await client.query({
        query: getProductById,
        variables: {
          id: String(id),
        },
      });
      setProduct(data?.products?.edges[0]);
    };
    getProductDetails();
  }, [id]);

  return (
    <div className="mt-6">
      <ProductDetails productItem={product} add={add} />
      <div className="bg-[#FAFAFA]">
        <div className="container">
          <h1 className="lg:text-2xl md:text-base font-semibold pt-10 pb-6">
            More similar bikes for rent
          </h1>
          {currentData?.map((productItem) => (
            <ProductCard
              key={productItem?.node?.id}
              productItem={productItem}
              productId={productId}
            />
          ))}
        </div>

        <div className="mt-[26px] mb-[50px] md:mt-9 md:mb-[114px] xl:mt-[42px] xl:mb-[150px]">
          <PaginatedItems
            itemsPerPage={5}
            getCurrentItems={getCurrentItems}
            items={products?.products?.edges}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
