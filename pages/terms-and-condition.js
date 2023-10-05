import React from "react";
import NestedLayout from "../components/NestedLayout";
import { getTermsAndCondations } from "../common/queries/termsAndConditions";
import { client } from "/graphql/apolloClient";
import { createMarkup } from "../common/hooks/createMarkup";

const TermsAndCondition = ({ termsAndConditions }) => {
  return (
    <NestedLayout>
      <div>
        <div className="grid grid-cols-12 mb-24">
          <div className="col-span-full">
            <div className="col-span-full">
              <h1 className="text-4xl">Terms and conditions</h1>
              <div
                className="mt-10 text-[#7F7F7F]"
                dangerouslySetInnerHTML={createMarkup(
                  termsAndConditions?.termsAndConditions[0]?.content
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
    query: getTermsAndCondations,
  });
  return {
    props: {
      termsAndConditions: data,
    },
  };
}

export default TermsAndCondition;
