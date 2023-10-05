import React from "react";

const RefundModal = () => {
  return (
    <div>
      <input
        type="checkbox"
        id="refund-modal"
        className="modal-toggle hidden"
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h1 className="font-medium">Payment</h1>
          <form className="mt-4">
            <div className="border border-[#E2E2E2] grid grid-cols-12 p-3 rounded-lg">
              <div className="col-span-12 xl:col-span-6">
                <p className="font-medium text-lg">Order #1</p>
                <div className="grid grid-cols-12 gap-6 w-full mt-4">
                  <p className="col-span-8">Amount</p>
                  <p className="text-[#7F7F7F] text-sm mt-1 text-right">30€</p>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-2">
                  <p className="col-span-8">Security Deposit</p>
                  <p className="text-[#7F7F7F] text-sm mt-1 text-right">30€</p>
                </div>
                <div className="grid grid-cols-12">
                  <div className="divider col-span-10"></div>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <p className="col-span-8 font-medium">Total</p>
                  <p className="font-medium text-sm mt-1 text-right">35€</p>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-2">
                  <p className="col-span-8">Paid</p>
                  <p className="text-[#7F7F7F] text-sm mt-1 text-right">30€</p>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-6">
                <p className="font-medium text-lg">Individual Pricing</p>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className="font-medium ">Amount</span>
                      </label>
                      <input
                        type="text"
                        placeholder="30€"
                        className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                      />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className=" font-medium">Security Deposit </span>
                      </label>
                      <input
                        type="text"
                        placeholder="30€"
                        className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className="font-medium text-base">
                          Keep Security Deposit
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="30€"
                        className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                      />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className=" font-medium">Reason </span>
                      </label>
                      <input
                        type="text"
                        placeholder="30€"
                        className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className="font-medium ">Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="30€"
                        className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full "
                      />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <div className=" form-control rounded-[10px] w-full mt-4">
                      <label className="my-1">
                        <span className="font-medium ">Method </span>
                      </label>
                      <select className="py-4 px-6 border border-gray rounded-[10px] placeholder:text-[14px] w-full">
                        <option>Card</option>
                        <option>Paypal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="xl:modal-action flex justify-between lg:justify-start items-center mt-4 xl:mt-0">
            <label
              htmlFor="refund-modal"
              className="btn bg-transparent text-black normal-case font-normal hover:bg-common hover:text-white lg:mr-4 xl:mr-0">
              Back
            </label>
            <label className="btn bg-common text-white hover:bg-transparent hover:text-black normal-case font-normal">
              Request Refund
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
