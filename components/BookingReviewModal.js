import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { createProductReviewMutation } from "../common/queries/booking";
import { useRouter } from "next/router";

const BookingReviewModal = ({ productId, userId }) => {
  const router = useRouter();
  const [rating, setRating] = useState();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const schema = yup.object().shape({
    review: yup.string().required("Review is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createProductReview, { data, loading, error }] = useMutation(
    createProductReviewMutation
  );

  data && router.push("/");

  const onSubmit = (data) => {
    createProductReview({
      variables: {
        user: userId,
        product: productId,
        review: data?.review,
        rating: parseInt(rating),
      },
    });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="booking-review-modal"
        className="modal-toggle"
      />
      <label htmlFor="booking-review-modal" className="modal">
        <label htmlFor="" className="modal-box relative max-w-3xl">
          <h2 className="text-base font-medium mb-3">Your Rating</h2>

          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2={"#ffd700"}
            className="flex items-center gap-3"
          />

          <h3 className="text-base font-medium mt-7">
            What would you like to share with us?
          </h3>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="pt-4 pl-6 border border-gray rounded w-full mt-4 mb-8 resize-none h-28"
              placeholder="Write you review"
              {...register("review")}></textarea>
            <p className="text-red mt-1.5">{errors?.review?.message}</p>
            <div className="flex items-center gap-4">
              <label
                htmlFor="booking-review-modal"
                className="py-2 px-3.5 border rounded-md text-center flex  text-custom-black cursor-pointer">
                Cancel
              </label>
              <button
                className="py-2 px-3.5 bg-common border border-common text-white rounded-md  cursor-pointer"
                type="submit">
                Submit Review
              </button>
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

export default BookingReviewModal;
