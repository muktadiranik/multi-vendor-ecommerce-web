import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { deleteProduct } from "../../common/queries/products";
import { client } from "/graphql/apolloClient";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT } from "../../redux/constants/productConstants";

const DeleteModal = ({ data }) => {
  const dispatch = useDispatch();

  const closeRef = useRef(null);

  const [deleteProductById, { deleteData, loading, error }] =
    useMutation(deleteProduct);
  const handleDelete = async (id) => {
    deleteProductById({
      variables: {
        productId: id,
      },
    })
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT,
        });
      })
      .then(() => {
        closeRef.current.click();
      });
  };

  return (
    <div className="">
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label
        htmlFor="my-modal-3"
        className="modal modal-bottom md:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="my-modal-3"
            className=" text-2xl text-common absolute right-2 top-2">
            ✕
          </label>
          <h3 className="font-medium text-xl  text-center mt-12 ">
            Are you sure you want to delete this item?
          </h3>
          <h3 className="text-center mt-4 ">
            This item will get permanently removed <br /> from the platform.
          </h3>
          <div className="gap-2 justify-center flex">
            <label
              ref={closeRef}
              htmlFor="my-modal-3"
              className="btn hover:bg-common normal-case font-medium mt-5 bg-transparent hover:text-white text-black  ">
              Cancel
            </label>

            <button
              onClick={() => handleDelete(data?.node?.id)}
              className="btn bg-common normal-case font-medium mt-5 text-white hover:bg-transparent hover:text-black   ">
              Delete
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default DeleteModal;
