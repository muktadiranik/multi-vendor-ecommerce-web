import { useMutation } from "@apollo/client";
import React, { useState, useRef } from "react";
import BikeModalDetails from "./BikeModalDetails";
import ListYourBikeModal2 from "./ListYourBikeModal2";
import ListYourBikeModal3 from "./ListYourBikeModal3";
import { createProductMutation } from "/common/queries/products";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT } from "redux/constants/shopConstants";
import { toast } from "react-toastify";

const ListYourBikeModal = ({ productSizes }) => {
  const dispatch = useDispatch();

  const closeRef = useRef(null);

  const shop = useSelector((state) => state.shop);

  const [bikeDetails, setBikeDetails] = useState(null);
  const [image, setImage] = useState(null);

  const getbikeDetials = (data) => {
    data && setBikeDetails(data);
  };

  const getImage = (data) => {
    setImage(data);
  };

  const [createProduct, { data, loading, error }] = useMutation(
    createProductMutation
  );

  const getLastModalData = (data, deposit) => {
    createProduct({
      variables: {
        brand: bikeDetails?.brand,
        model: bikeDetails?.model,
        productType: bikeDetails?.bikeType,
        shop: shop?.shop?.shops?.edges[0]?.node?.id,
        description: bikeDetails?.description,
        stock: parseInt(bikeDetails?.stock),
        deposit: deposit,
        size: bikeDetails?.bikeSize,
        condition: bikeDetails?.conditions,
        image: image,
        prices: data,
      },
    })
      .then((res) => {
        dispatch({ type: ADD_PRODUCT, payload: res.data.createProduct });
        if (res?.data?.createProduct?.success) {
          toast.success("Product Added Successfully");
        } else {
          toast.error("Product Not Added");
        }
      })
      .then(() => {
        closeRef?.current?.click();
      })
      .then(() => {
        setBikeDetails(null);
        setImage(null);
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="list-your-bike-modal"
        className="modal-toggle"
      />
      <label htmlFor="list-your-bike-modal" className="modal">
        <label
          htmlFor=""
          className="modal-box rounded-xl relative p-4 xl:p-6 max-w-[856px]">
          {!bikeDetails && !image && (
            <BikeModalDetails
              getbikeDetials={getbikeDetials}
              productSizes={productSizes}
            />
          )}
          {bikeDetails && !image && (
            <ListYourBikeModal2
              getImage={getImage}
              setBikeDetails={setBikeDetails}
            />
          )}
          {image && (
            <ListYourBikeModal3
              getLastModalData={getLastModalData}
              closeRef={closeRef}
              setImage={setImage}
            />
          )}
        </label>
      </label>
    </div>
  );
};

export default ListYourBikeModal;
