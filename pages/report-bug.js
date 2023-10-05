import React from "react";
import Image from "next/image";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NestedLayout from "../components/NestedLayout";
import { getAllReportType, mutationReport } from "../common/queries/reportBugs";
import user from "/public/images/user.png";
import { client } from "/graphql/apolloClient";
import { useMutation } from "@apollo/client";

const ReportBug = ({ allReportType }) => {
  const reportTypesList = allReportType?.reportTypes.map(
    (report) => report?.id
  );

  const schema = yup.object().shape({
    reportTypes: yup
      .string()
      .required()
      .oneOf(reportTypesList)
      .label("Report types"),
    title: yup
      .string()
      .required("Title is required")
      .matches(/^[a-zA-Z\s]*$/, "Title can only contain letters."),
    reson: yup.string().required("Reson is required"),
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

  const [createReport, { data, loading, error }] = useMutation(mutationReport);

  const onSubmit = (data) => {
    createReport({
      variables: {
        title: data?.title,
        name: data?.name,
        reason: data?.reson,
        reportType: data?.reportTypes,
      },
    });
    reset();
  };

  const reportsList =
    allReportType?.reportTypes.length > 0 &&
    allReportType?.reportTypes.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    });

  return (
    <NestedLayout>
      <div>
        <div className='grid grid-cols-12 mb-24'>
          <div className='col-span-full'>
            <div className='col-span-full'>
              <h1 className='text-4xl mb-10'>Report bug or Request feature</h1>
              <div className='bg-[#FEBA02] border rounded-xl p-3'>
                <p className='mt-7 text-start text-2xl mb-8 '>
                  Please choose your option and share your valuable opinion,It’s
                  very helpful for us!{" "}
                </p>
                <form className='' onSubmit={handleSubmit(onSubmit)}>
                  <select
                    className='select w-full rounded-xl h-14 text-[#7F7F7F] font-normal text-base capitalize'
                    {...register("reportTypes")}>
                    <option disabled selected>
                      Select an option
                    </option>
                    {reportsList}
                  </select>
                  <p className='text-red mt-1.5'>
                    {errors?.reportTypes?.message.slice(0, 47)}
                  </p>
                  <input
                    type='text'
                    placeholder='Enter your title'
                    className='input w-full mt-6'
                    {...register("title")}
                  />
                  <p className='text-red mt-1.5'>{errors?.title?.message}</p>
                  <textarea
                    className='textarea border-0 w-full h-24 mt-6 placeholder:text-base'
                    placeholder='Type your reson'
                    {...register("reson")}></textarea>
                  <p className='text-red mt-1.5'>{errors?.reson?.message}</p>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Enter your name'
                      className='input w-full mt-6 pr-3 pl-9'
                      {...register("name")}
                    />
                    <Image
                      className='absolute top-10 h-4 ml-4 left-1 w-4'
                      src={user}
                      alt=''
                    />
                  </div>
                  <p className='text-red mt-1.5'>{errors?.name?.message}</p>
                  <button
                    type='submit'
                    className='text-white text-base font-medium mt-4 border bg-common h-14 rounded-[10px] mx-auto mb-4 w-full'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='col-span-3'></div>
        </div>
      </div>
    </NestedLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAllReportType,
  });
  return {
    props: {
      allReportType: data,
    },
  };
}

export default ReportBug;
