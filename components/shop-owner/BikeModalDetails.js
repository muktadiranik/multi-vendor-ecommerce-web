import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "graphql/apolloClient";
import { getProductSizesAndTypes } from "/common/queries/products";
import { toast } from "react-toastify";

const BikeModalDetails = ({ getbikeDetials }) => {
  const [productSizes, setProductSizes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const getBikeSizes = async () => {
      const { data } = await client.query({
        query: getProductSizesAndTypes,
      });
      setProductSizes(data?.productsSizes);
      setProductTypes(data?.productTypes);
    };
    getBikeSizes();
  }, []);

  const schema = yup.object().shape({
    brand: yup.string().required("Brand is required").max(50).min(1),
    model: yup.string().required("Model is required").max(50).min(1),
    description: yup
      .string()
      .required("Description is required")
      .max(500, "Description must be between 1 and 500 characters.")
      .min(1, "Description must be between 1 and 500 characters."),
    conditions: yup.string().required("Conditions is required").max(100).min(1),
    bikeSize: yup.string().required("Bike size is required"),
    bikeType: yup.string().required("Bike type is required"),
    stock: yup.string().required("Stock is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error(
        "You must log in first, then go to your profile and create a shop.",
        { toastId: "jibon" }
      );
      return;
    }
    data && getbikeDetials(data);
  };

  const productSize =
    productSizes?.length > 0 &&
    productSizes?.map((item) => {
      return (
        <option key={item?.id} value={item?.id}>
          {item?.productSize}
        </option>
      );
    });

  const productType =
    productTypes?.length > 0 &&
    productTypes?.map((item) => {
      return (
        <option key={item?.id} value={item?.id}>
          {item?.name}
        </option>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">List your bike</h1>
      </div>
      <div className="grid grid-cols-12 mt-[18px]">
        <div className="col-span-full">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 flex justify-between items-center text-sm font-medium text-gray-500">
                <li className="flex gap-2 items-center bg-white">
                  <span className="rounded-full bg-common p-1.5 text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden md:inline-block text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Bike Details
                  </span>
                  <span className="block md:hidden text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Details
                  </span>
                </li>
                <div className="divider divider-vertical w-[18px] md:w-[41px] xl:w-[200px]"></div>
                <li className="flex gap-2 items-center bg-white">
                  <span className="rounded-full  bg-[#6E6E6E] p-1.5 text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden md:inline-block text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Default Image
                  </span>
                  <span className="block md:hidden text-black font-medium text-xs xl:text-sm">
                    {" "}
                    Image
                  </span>
                </li>
                <div className="divider divider-vertical w-[18px] md:w-[80px] xl:w-[200px]"></div>
                <li className="flex gap-2 items-center bg-white ">
                  <span className="rounded-full bg-[#6E6E6E] p-1.5 text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-black font-medium text-xs xl:text-sm">
                    Pricing
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 xl:mt-9 text-base xl:text-xl font-medium text-left">
        Write Your Rent Bike Price You Charge & Refundable Security Deposits{" "}
      </p>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="border rounded-xl">
          <div className="  p-4  ">
            <div className="">
              <div className="grid grid-cols-2 gap-1 xl:gap-4">
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Brand <span className="text-red">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your bike brand name"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                    {...register("brand")}
                  />
                  <p className="text-red mt-1.5">{errors?.brand?.message}</p>
                </div>
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Model <span className="text-red">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your bike model name"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                    {...register("model")}
                  />
                  <p className="text-red mt-1.5">{errors?.model?.message}</p>
                </div>
              </div>
              <div>
                <div className=" form-control ">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Description <span className="text-red">*</span>
                    </span>
                  </label>
                  <textarea
                    className=" py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                    placeholder="Description (max. 500 characters)"
                    {...register("description")}></textarea>
                  <p className="text-red mt-1.5">
                    {errors?.description?.message}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 xl:gap-4">
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium ">
                      Conditions <span className="text-red">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Condition (max. 100 characters)"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                    {...register("conditions")}
                  />
                  <p className="text-red mt-1.5">
                    {errors?.conditions?.message}
                  </p>
                </div>
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Product Type <span className="text-red">*</span>
                    </span>
                  </label>
                  <select
                    placeholder="Rider height"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                    {...register("bikeType")}>
                    {productType}
                  </select>
                  <p className="text-red mt-1.5">{errors?.bikeType?.message}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 xl:gap-4">
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Bike Size <span className="text-red">*</span>
                    </span>
                  </label>
                  <select
                    placeholder="Rider height"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full"
                    {...register("bikeSize")}>
                    {productSize}
                  </select>
                  <p className="text-red mt-1.5">{errors?.bikeSize?.message}</p>
                </div>
                <div className="col-span-2 xl:col-span-1 form-control rounded-[10px] w-full mt-4">
                  <label className="label">
                    <span className="font-medium mb-1 ">
                      Stock <span className="text-red">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your stock number"
                    className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                    {...register("stock")}
                  />
                  <p className="text-red mt-1.5">{errors?.stock?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start xl:justify-end mt-8 gap-4">
          <label
            htmlFor="list-your-bike-modal"
            className="col-span-3 btn btn-xl bg-transparent hover:bg-common hover:text-white text-custom-black normal-case font-normal ">
            Cancel
          </label>
          <button
            type="submit"
            className="col-span-3 btn btn-xl hover:bg-transparent bg-common text-white hover:text-custom-black normal-case font-normal ">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BikeModalDetails;
