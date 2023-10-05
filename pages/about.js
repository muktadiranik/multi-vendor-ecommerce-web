import React from "react";
import { client } from "/graphql/apolloClient";
import NestedLayout from "../components/NestedLayout";
import { getAboutUs } from "../common/queries/about";
import { createMarkup } from "../common/hooks/createMarkup";

const About = ({ aboutUs }) => {
  return (
    <NestedLayout>
      <div>
        <div className="grid grid-cols-12  mb-24">
          <div className="col-span-full">
            <div className="col-span-full">
              <h1 className="text-4xl mb-8">About Go Velo</h1>

              <div
                className="mt-10 text-[#7F7F7F]"
                dangerouslySetInnerHTML={createMarkup(
                  aboutUs?.aboutUs[0]?.content
                )}></div>
            </div>
          </div>
        </div>
      </div>
    </NestedLayout>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAboutUs,
  });
  return {
    props: {
      aboutUs: data,
    },
  };
}

export default About;
