import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import successicon from "/public/images/Success.png";

const index = () => {
  const { query } = useRouter();

  const router = useRouter();

  useEffect(() => {
    if (query.key) {
      const data = {
        key: query.key,
      };
      fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/account-confirm-email/${query.key}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then((result) => {
          if (result?.detail == "ok") {
            toast.success("Email Verified Successfully");
            router.push("/login");
          }
        })
        .catch((err) => {
          toast.error("Email Verified Failed");
        });
    }
  }, [query]);

  return (
    <div>
      <div className="flex justify-center items-center py-6 xl:pb-40 xl:pt-10 bg-white border border-gray rounded-md mt-8 ">
        <div>
          <Image
            className="mx-auto mt-8 mb-4 w-[65px] lg:w-[85px] xl:w-[100px]"
            src={successicon}
            alt=""
          />
          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-8">
              <p className="font-medium text-base xl:text-2xl text-center">
                Thank you! You have successfully opened your account on Go Velo
                platform
              </p>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
