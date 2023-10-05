import React from "react";
import mapimage from "/public/images/map-image.png";
import mapicon from "/public/images/mapicon.png";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getAllProductTypesAndRates } from "../../common/queries/products";
import { client } from "/graphql/apolloClient";

const MapComponent = ({ allProductsAndTypeAndRate }) => {
  const filter = useSelector((state) => state.filter);

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className=" mb-8 col-span-12 md:col-span-11">
          <div className="mt-4 relative flex items-center justify-center">
            <Image className="w-full h-full" src={mapimage} alt="" />
            <div className="absolute ">
              <Image
                className="ml-[60px] mr-[60px] mb-3"
                src={mapicon}
                alt=""
              />
              <Link
                href={"../location"}
                className="text-white rounded-md ml-6 mr-6 bg-common btn-sm normal-case font-normal">
                Show on map
              </Link>
            </div>
          </div>
          {/* <div className="border border-gray rounded mt-4 px-5 py-6">
            <div className="space-y-2 ">
              <h2 className="text-xl font-medium">Filter by:</h2>
              <form className="flex flex-col space-y-1">
                <p className="mt-5 mb-4 text-xl font-medium">Bike stock</p>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="mountain"
                    id="remember"
                    value="Mountain"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  text-[#7F7F7F] text-start ">
                    Mountain
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Road"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Road
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Gravel"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Gravel
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Commuter"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Commuter
                  </label>
                </div>
              </form>
              <div className="my-5">
                {" "}
                <div className="divider"></div>
              </div>
            </div>
            <div className="space-y-2 ">
              <h2 className="text-xl font-medium">Bike Available</h2>
              <div className="flex flex-col space-y-1">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="sizes"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  text-[#7F7F7F] text-start ">
                    Sizes
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Road"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm w-[830px] text-[#7F7F7F] text-start ">
                    Model
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Gravel"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Brand
                  </label>
                </div>
              </div>
              <div className="my-5">
                {" "}
                <div className="divider"></div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Options Include</h2>
              <div className="flex flex-col space-y-1">
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Mountain"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Helmets
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Road"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Pedals
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Gravel"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Lights
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Commuter"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Waterbottles
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Commuter"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Tools
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="checkbox"
                    name="Commuter"
                    id="remember"
                    aria-label="Remember me"
                    className="mr-1 rounded-sm"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm  w-[830px] text-[#7F7F7F] text-start ">
                    Spare iner tubes
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAllProductTypesAndRates,
  });

  return {
    props: {
      allProductsAndTypeAndRate: data,
    },
  };
}

// const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
//   variables: { breed },
// });

export default MapComponent;
