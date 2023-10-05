import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "graphql/apolloClient";
import { getProductRateType } from "/common/queries/products";
import { getCurrencies } from "common/queries/home";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ListYourBikeModal3 = ({ getLastModalData, closeRef, setImage }) => {
  const [rateType, setRateType] = useState([]);
  const [deposit, setDeposit] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [mix, setMix] = useState(null);

  useEffect(() => {
    const getRateType = async () => {
      const { data } = await client.query({
        query: getProductRateType,
      });
      setRateType(data?.productRateTypes);
    };
    getRateType();
    const getAllCurrencies = async () => {
      const { data } = await client.query({
        query: getCurrencies,
      });
      setCurrencies(data?.currencies);
    };
    getAllCurrencies();
  }, []);

  useEffect(() => {
    if (currencies?.length > 0 && rateType?.length > 0) {
      var a = [];
      currencies.forEach((element) => {
        rateType.forEach((rate) => {
          a.push({
            id: uuidv4(),
            rateTypeId: rate?.id,
            rateTypeName: rate?.name,
            currencyId: element?.id,
            currencyName: element?.name,
          });
        });
      });
      setMix(a);
    }
  }, [currencies, rateType]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    let deposit = [];
    for (const key in data) {
      for (let i = 0; i < currencies.length; i++) {
        if (key === currencies[i].id) {
          deposit.push({
            currency: currencies[i].id,
            deposit: parseFloat(data[key]),
          });
          if (data[key] == null || data[key] == "") {
            toast.error("Deposit is required", { toastId: "GO Velo" });
            return;
          }
        }
      }
    }
    delete data.deposit;
    var a = [];
    for (let i = 0; i < mix.length; i++) {
      for (const j in data) {
        if (mix[i].id === j) {
          a.push({
            rateType: mix[i].rateTypeId,
            rate: parseFloat(data[j]),
            currency: mix[i].currencyId,
          });
          if (data[j] == null || data[j] == "") {
            toast.error("Price is required", { toastId: "GO Velo" });
            return;
          }
        }
      }
    }
    if (deposit === undefined) {
      getLastModalData(a, 0);
    } else {
      getLastModalData(a, deposit);
    }
  };

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
                  <span className="rounded-full  bg-common p-1.5 text-white font-bold">
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
                  <span className="text-black font-medium text-xs xl:text-sm">
                    Pricing
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 xl:mt-9 text-base xl:text-xl font-medium text-left mb-4">
        Write Your Rent Bike Price You Charge & Refundable Security Deposits{" "}
      </p>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-[#E2E2E2] rounded-md p-4 min-h-[349px]">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-5 ">
              <div className="grid grid-cols-2 gap-2 xl:gap-0">
                {currencies?.length > 0 &&
                  currencies?.map((currency) => {
                    return (
                      <div className="col-span-1 xl:col-span-2 form-control rounded-[10px] mt-3">
                        <label className="label p-0">
                          <span className="font-medium mb-1 ">
                            Deposit in {currency?.name}
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px]"
                          {...register(currency?.id, {
                            required: {
                              value: false,
                              message: "Deposit is required",
                            },
                          })}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-span-12 xl:col-span-7">
              {mix?.length > 0 &&
                mix.map((rate) => {
                  return (
                    <div
                      className="grid grid-cols-2 gap-2 xl:gap-4 my-3"
                      key={rate.id}>
                      <div className="col-span-1 form-control rounded-[10px]">
                        <label className="label p-0">
                          <span className="font-medium mb-1 ">Rate Type</span>
                        </label>
                        <input
                          disabled
                          type="text"
                          value={rate?.rateTypeName}
                          className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] "
                        />
                      </div>
                      <div className="col-span-1 form-control rounded-[10px]">
                        <label className="label p-0">
                          <span className="font-medium mb-1 ">
                            Price in {rate?.currencyName}
                          </span>
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            placeholder="0"
                            className="py-4 px-6 border w-full border-gray rounded-[10px] placeholder:text-[14px]"
                            {...register(rate?.id, {
                              required: {
                                value: false,
                                message: "Price is required",
                              },
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-5 gap-4 xl:flex justify-end">
          <button
            onClick={() => {
              setImage(null);
            }}
            className="col-span-5 xl:col-span-3  btn bg-transparent hover:bg-common hover:text-white text-custom-black normal-case font-normal">
            Back
          </button>
          <label
            ref={closeRef}
            htmlFor="list-your-bike-modal"
            className="col-span-5 xl:col-span-3 btn bg-transparent hover:bg-common hover:text-white text-custom-black normal-case font-normal">
            cancel
          </label>
          <button
            type="submit"
            className="col-span-5 xl:col-span-3 btn hover:bg-transparent bg-common text-white hover:text-custom-black normal-case font-normal">
            List My Bike
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListYourBikeModal3;
