import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import user from "/public/images/user.png";
import rental from "/public/images/calender-2.png";
import email from "/public/images/email.png";
import Image from "next/image";
import NestedLayout from "../components/NestedLayout";
import {
  getContactTypes,
  mutationCreateContact,
} from "../common/queries/contact";
import { client } from "/graphql/apolloClient";
import { useMutation } from "@apollo/client";

const Contact = ({ contactReasons }) => {
  const contactTypesList = contactReasons?.contactTypes.map(
    (contact) => contact?.id
  );

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters."),
    rentalBooking: yup
      .string()
      .required(" Rental / Booking number is required"),

    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    reason: yup
      .string()
      .required("Reson is required")
      .oneOf(contactTypesList)
      .label("Contact types"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createContact, { data, loading, error }] = useMutation(
    mutationCreateContact
  );

  const onSubmit = (data) => {
    createContact({
      variables: {
        name: data?.name,
        rentalBooking: data?.rentalBooking,
        email: data?.email,
        contactType: data?.reason,
      },
    });
    reset();
  };

  const contactReasonsList =
    contactReasons?.contactTypes.length > 0 &&
    contactReasons?.contactTypes.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    });

  return (
    <NestedLayout>
      <div>
        <div className="grid grid-cols-12 mb-24">
          <div className="col-span-full">
            <div className="col-span-full">
              <h1 className="text-4xl mb-10">Contact</h1>
              <div className="bg-[#FEBA02] border rounded-xl p-3">
                <p className="mt-5 text-start text-2xl ">
                  I am a bike shop and I would like to rent on the platform
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-6 justify-center ">
                    <div className="w-full">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder=" Enter your name"
                          className="input w-full  mt-6 pr-3 pl-9 rounded-xl"
                          {...register("name")}
                        />
                        <Image
                          className="absolute top-10 h-4 ml-4 left-1 w-4"
                          src={user}
                          alt=""
                        />
                      </div>
                      <p className="text-red mt-1.5">{errors?.name?.message}</p>
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Rental / Booking number"
                          className="input w-full mt-6 pr-3 pl-9 rounded-xl"
                          {...register("rentalBooking")}
                        />
                        <Image
                          className="absolute top-10 h-4 ml-4 left-1 w-4"
                          src={rental}
                          alt=""
                        />
                      </div>
                      <p className="text-red mt-1.5">
                        {errors?.rentalBooking?.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 justify-center">
                    <div className="w-full">
                      <div className="relative">
                        <input
                          type="email"
                          placeholder=" Enter your email address"
                          className="input w-full  mt-6 pr-3 pl-9 rounded-xl"
                          {...register("email")}
                        />
                        <Image
                          className="absolute top-10 h-4 ml-4 left-1 w-4"
                          src={email}
                          alt=""
                        />
                      </div>
                      <p className="text-red mt-1.5">
                        {errors?.email?.message}
                      </p>
                    </div>

                    <div className="w-full">
                      <select
                        className="select w-full rounded-xl text-[#7F7F7F] font-normal text-base mt-6 capitalize"
                        {...register("reason")}>
                        <option disabled selected>
                          Details / Reason for contacting
                        </option>
                        {contactReasonsList}
                      </select>
                      <p className="text-red mt-1.5">
                        {errors?.reason?.message.slice(0, 49)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white text-base font-medium mt-6  border bg-common h-14 rounded-[10px] mx-auto mb-6 w-full">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </NestedLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getContactTypes,
  });
  return {
    props: {
      contactReasons: data,
    },
  };
}

export default Contact;
