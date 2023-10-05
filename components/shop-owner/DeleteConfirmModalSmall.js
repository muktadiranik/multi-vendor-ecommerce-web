import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../common/queries/products";
import { DELETE_PRODUCT } from "../../redux/constants/productConstants";

const DeleteConfirmModalSmall = ({ data }) => {
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
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-medium text-xl  text-center mt-12 ">
            Are you sure you want to delete this item?
          </h3>
          <label
            htmlFor="my-modal-6"
            className=" text-2xl p-6 text-common absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-center mt-4 ">
            This item will get permanently removed <br /> from the platform.
          </h3>
          <div className="gap-2 justify-center flex">
            <label
              ref={closeRef}
              htmlFor="my-modal-6"
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
      </div>
    </div>
  );
};

export default DeleteConfirmModalSmall;
