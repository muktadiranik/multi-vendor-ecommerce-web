import { useMutation } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { accessTokenMutation } from "../../../../common/queries/user";
import {
  userSuccess,
  userFailure,
  userStart,
} from "../../../../redux/slice/userRedux";

const index = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const formData = new FormData();
  const router = useRouter();

  const [verifyToken, { data, loading, error }] =
    useMutation(accessTokenMutation);

  if (data?.verifyToken?.payload?.user_id) {
    localStorage.setItem("userId", data?.verifyToken?.payload?.user_id);
    dispatch(userSuccess(data.verifyToken.payload.user_id));
    router.push("/");
  }

  useEffect(() => {
    if (query.params == "google") {
      if (query?.code) {
        formData.append("code", query?.code);
        dispatch(userStart());
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/google/`, formData)
          .then((res) => {
            localStorage.setItem("access_token", res?.data?.access_token);
            dispatch(userSuccess(res?.data));
            verifyToken({
              variables: {
                token: res?.data?.access_token,
              },
            }).then((res) => {
              localStorage.setItem(
                "userId",
                res?.data?.verifyToken?.payload?.user_id
              );
            });
            toast.success("Logged In Successfully");
          });
      }
    } else {
      if (query?.code) {
        formData.append("code", query?.code);
        dispatch(userStart());
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/facebook/`, formData)
          .then((res) => {
            localStorage.setItem("access_token", res?.data?.access_token);
            dispatch(userSuccess(res?.data));
            verifyToken({
              variables: {
                token: res?.data?.access_token,
              },
            }).then((res) => {
              localStorage.setItem(
                "userId",
                res?.data?.verifyToken?.payload?.user_id
              );
            });
            toast.success("Logged In Successfully");
          });
      }
    }
  }, [query?.code]);
  return <div></div>;
};

export default index;
