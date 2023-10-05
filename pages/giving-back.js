import Image from "next/image";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NestedLayout from "../components/NestedLayout";
import user from "/public/images/user.png";
import { client } from "/graphql/apolloClient";
import {
  getNominationTypes,
  mutationOfNomination,
} from "../common/queries/giving-back";
import { useMutation } from "@apollo/client";

const GivingBack = ({ nominationTypesData }) => {
  const nominationTypesList = nominationTypesData?.nominationTypes.map(
    (nomination) => nomination?.id
  );

  const schema = yup.object().shape({
    nominationTypesField: yup
      .string()
      .required()
      .oneOf(nominationTypesList)
      .label("Nomination types"),
    reason: yup.string().required("Reson is required"),
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters."),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createNomination, { data, loading, error }] =
    useMutation(mutationOfNomination);

  const onSubmit = (data) => {
    createNomination({
      variables: {
        name: data?.name,
        nominationType: data?.nominationTypesField,
        reason: data?.reason,
      },
    });
    reset();
  };

  const selectNominationTypes =
    nominationTypesData?.nominationTypes.length > 0 &&
    nominationTypesData?.nominationTypes.map((item, i) => {
      return (
        <option key={i} value={item.id} className="capitalize">
          {item.name}
        </option>
      );
    });

  return (
    <NestedLayout>

      <div className='grid grid-cols-12 mb-24'>
        <div className='col-span-full'>
          <div className='col-span-full'>
            <h1 className='text-4xl mb-10'>Giving Back</h1>
            <div className='bg-[#FEBA02] border rounded-xl p-3'>
              <p className='mt-7 text-start text-2xl mb-8 '>

                Nominate a bike shop/cycling project/cycling charity to receive
                a donation from us
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  className="select w-full rounded-xl h-14 text-[#7F7F7F] font-normal text-base capitalize"
                  {...register("nominationTypesField")}>
                  <option disabled selected>
                    Select type of nomination
                  </option>
                  {selectNominationTypes}
                </select>
                <p className="text-red mt-1.5">
                  {errors?.nominationTypesField?.message.slice(0, 52)}
                </p>
                <textarea
                  className="textarea border-0 w-full h-24 mt-6 placeholder:text-base"
                  placeholder=" Type your reason"
                  {...register("reason")}></textarea>
                <p className="text-red mt-1.5">{errors?.reason?.message}</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" Nominated person name"
                    className="input w-full mt-6 pr-3 pl-9"
                    {...register("name")}
                  />
                  <Image
                    className="absolute top-10 h-4 ml-4 left-1 w-4"
                    src={user}
                    alt=""
                  />
                </div>
                <p className="text-red mt-1.5">{errors?.name?.message}</p>
                <button
                  type="submit"
                  className="text-white text-base font-medium mt-4 border bg-common h-14 rounded-[10px] mx-auto mb-4 w-full cursor-pointer">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </NestedLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getNominationTypes,
  });
  return {
    props: {
      nominationTypesData: data,
    },
  };
}

export default GivingBack;
