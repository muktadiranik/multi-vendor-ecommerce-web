import React from "react";
import RentCard from "../../components/RentCard";

const BikeRent = () => {
  const fakedata = [
    {
      id: "2",
      picture: "https://i.ibb.co/pf9D6Kj/image-76.png",
      name: "Handbrake Bike",
      location: "Laboni point,Beach Road,Cox's Bazar, Bangladesh",
      deadline:
        "This property has no availabillity on our site from 29 Oct to 29 Nov.",
      button: "Show on map",
      map: "1.5 miles from center",
      review: "Review score",
      totalView: "2,023 review",
      rating: "6.0",
    },
  ];

  return (
    <div className="mb-24">
      <div className="grid grid-cols-12 w-full mt-10 mb-12 container">
        <div className="col-span-full">
          <div>
            <h2 className="sr-only">Steps</h2>
            <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
              <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                <li className="flex gap-2 items-center bg-white p-2">
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
                  <span className="text-black font-semibold">
                    {" "}
                    Your selection{" "}
                  </span>
                </li>
                <li className="flex gap-2 items-center bg-white p-2">
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
                  <span className="text-black font-semibold">
                    {" "}
                    Your details
                  </span>
                </li>
                <li className="flex gap-2 items-center bg-white p-2 ">
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
                  <span className=""> Final step</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full container">
        <div className="col-span-4 border">
          <aside className="w-full p-6 sm:w-60">
            <nav className="space-y-8 text-sm">
              <div className="space-y-2">
                <h2 className="text-xl mb-4 font-semibold tracking-widest ">
                  Your booking details
                </h2>
                <div className="flex flex-col space-y-1 text-[#7F7F7F]">
                  <p className="mb-2">Pick-up</p>
                  <p>Sat 29 Oct 2022</p>
                  <p>14:00 - 21:00</p>
                  <p className="mt-4 mb-2">Drop-off</p>
                  <p>Tue 29 Nov 2022</p>
                  <p>03:00 - 11:00</p>
                </div>
                <div className="divider w-72 mx-auto mt-5 mb-5"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-widest ">
                  You selected
                </h2>
                <div className="flex flex-col space-y-1">
                  <p className="mt-5 mb-6 text-[#7F7F7F]">1 Single hand bike</p>
                </div>
              </div>
            </nav>
          </aside>
        </div>
        <div className="col-span-8 ml-8">
          {fakedata.map((data) => (
            <RentCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeRent;
