import { useMutation } from "@apollo/client";
import React, { useState, useRef } from "react";
import UpdateBikeModalDetails from "./UpdateBikeModalDetails";
import UpdateListYourBikeModal2 from "./UpdateListYourBikeModal2";
import UpdateListYourBikeModal3 from "./UpdateListYourBikeModal3";
import { updateProductMutation } from "/common/queries/products";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT,
} from "redux/constants/productConstants";
import { toast } from "react-toastify";

const UpdateListYourBikeModal = ({}) => {
  const dispatch = useDispatch();

  const { updateProduct } = useSelector((state) => state.product);

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

  const [update, { data, loading, error }] = useMutation(updateProductMutation);

  const getLastModalData = (data, deposit) => {
    update({
      variables: {
        id: updateProduct?.products?.edges[0]?.node?.id,
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
        dispatch({ type: UPDATE_PRODUCT, payload: null });
        if (res?.data?.updateProduct?.success) {
          toast.success("Product Updated Successfully");
        } else {
          toast.error("Product Not Updated");
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
        id="update-list-your-bike-modal"
        className="modal-toggle"
      />
      <label htmlFor="update-list-your-bike-modal" className="modal">
        <label
          htmlFor=""
          className="modal-box rounded-xl relative max-w-[856px]">
          {!bikeDetails && !image && (
            <UpdateBikeModalDetails getbikeDetials={getbikeDetials} />
          )}
          {bikeDetails && !image && (
            <UpdateListYourBikeModal2
              getImage={getImage}
              setBikeDetails={setBikeDetails}
            />
          )}
          {image && (
            <UpdateListYourBikeModal3
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

export default UpdateListYourBikeModal;
