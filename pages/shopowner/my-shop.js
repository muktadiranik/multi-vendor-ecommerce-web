import React, { useState, useEffect, useRef } from "react";
import grayditicon from "/public/images/shop-owner/edit-gray.png";
import menubuttonicon from "/public/images/shop-owner/menu-button.png";
import activeicon from "/public/images/shop-owner/activeicon.png";
import Deactivateicon from "/public/images/shop-owner/deactiveicon.png";
import deleteicon from "/public/images/shop-owner/Deleteicon.svg";
import clockicon from "/public/images/shop-owner/clockicon.png";
import addicon from "/public/images/shop-owner/add-icon.svg";
import AvailabilityModal from "../../components/shop-owner/AvailabilityModal";
import DeleteModal from "../../components/shop-owner/DeleteConfirmModal";
import ListYourBikeModal from "../../components/shop-owner/ListYourBikeModal";
import UpdateListYourBikeModal from "../../components/shop-owner/UpdateListYourBikeModal";
import Image from "next/image";
import { client } from "/graphql/apolloClient";
import { getShopByUserId } from "../../common/queries/shop";
import { getProductById } from "../../common/queries/products";
import { useSelector } from "react-redux";
import MyShop from "../../components/shop/MyShop";
import Link from "next/link";
import { AiFillFile } from "react-icons/ai";
import locationicon from "../../public/images/shop-owner/location-marker.png";
import { useDispatch } from "react-redux";
import { GET_SHOP } from "../../redux/constants/shopConstants";
import { UPDATE_PRODUCT } from "../../redux/constants/productConstants";
import PaginatedItems from "../../components/Pagination";
import { useRouter } from "next/router";
import DeleteConfirmModalSmall from "../../components/shop-owner/DeleteConfirmModalSmall";

const Inventory = () => {
  const { shop, updatedShop } = useSelector((state) => state.shop);
  const product = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const router = useRouter();

  const updateProductRef = useRef();
  const deleteProductRef = useRef();

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleteProductSmall, setDeleteProductSmall] = useState(null);
  const [shopProducts, setShopProducts] = useState();
  const [isActive, setIsActive] = useState();
  const [currentData, setCurrentData] = useState([]);

  const dispatch = useDispatch();

  const active = () => {
    setIsActive(false);
  };

  const deactive = () => {
    setIsActive(true);
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const getShopByOwnerId = async () => {
        const { data } = await client.query({
          query: getShopByUserId,
          variables: {
            ownerId: String(localStorage.getItem("userId")),
          },
        });
        dispatch({ type: GET_SHOP, payload: data });
      };
      getShopByOwnerId();
    } else {
      router.push("/login");
    }
  }, [product, updatedShop]);

  const getCurrentItems = (items) => {
    if (items) {
      setCurrentData(items);
    }
  };

  const getProductDetails = (id) => {
    const getProduct = async () => {
      const { data } = await client.query({
        query: getProductById,
        variables: {
          id: id,
        },
      });
      dispatch({ type: UPDATE_PRODUCT, payload: data });
    };
    getProduct().then(() => {
      updateProductRef.current.click();
    });
  };

  return (
    <div className="container mt-4 xl:mt-6 ">
      <MyShop />
      <div className="grid grid-cols-12 mt-4 md:mt-6">
        <div className="col-span-6 md:col-span-3 xl:col-span-2 whitespace-nowrap flex justify-start items-center">
          <p className="text-sm md:text-base xl:text-xl font-medium">
            List of My Bikes For Rent
          </p>
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-7"></div>
        <div className="col-span-12 md:col-span-5 xl:col-span-3 mt-4 md:mt-0 flex justify-start md:justify-end gap-4">
          <Link
            href="/my-orders"
            className="btn bg-white text-black hover:bg-common hover:text-white gap-3 flex justify-center items-center border py-2 xl:py-[10px] px-3 xl:px-5 rounded-xl">
            <button>
              <AiFillFile className="w-3 h-3" />
            </button>
            <p className=""> Orders</p>
          </Link>
          <label
            htmlFor="list-your-bike-modal"
            className="btn border-common bg-common text-white hover:text-black hover:bg-white rounded-xl py-2 xl:py-[10px] px-3 xl:px-5">
            <div className="  normal-case font-normal flex items-center gap-3 cursor-pointer">
              {" "}
              <Image width={15} className=" ml-2" src={addicon} alt="" />
              List a Bike
            </div>
          </label>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-12 mt-12 ">
        <div className="col-span-full ">
          <div className="overflow-x-auto w-full h-[600px]">
            <table className="table w-full">
              <thead>
                <tr className=" ">
                  <th className="bg-[#E2E2E2] normal-case">Bike</th>
                  <th className="bg-[#E2E2E2] normal-case">Brand</th>
                  <th className="bg-[#E2E2E2] normal-case">Model</th>
                  <th className="bg-[#E2E2E2] normal-case">Bike ID</th>
                  <th className="bg-[#E2E2E2] normal-case">Body Size</th>
                  <th className="bg-[#E2E2E2] normal-case">Price</th>
                  <th className="bg-[#E2E2E2] normal-case"></th>
                </tr>
              </thead>
              {currentData?.map((data) => (
                <tbody key={data?.node?.id}>
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 rounded">
                            {data?.node?.image ? (
                              <Image
                                width={200}
                                height={200}
                                src={data?.node?.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            ) : (
                              <p className="whitespace-normal text-center font-semibold">
                                No image
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.node?.brand}</td>
                    <td>{data?.node?.model}</td>
                    <td>{data?.node?.id}</td>
                    <td>{data?.node?.size?.productSize}</td>
                    <td>
                      {data?.node?.productrateSet?.map(
                        (item) =>
                          item?.currency?.id == currency?.currency && (
                            <div>
                              {item?.rate} {item?.currency?.code} /{" "}
                              {item?.rateType?.name}
                            </div>
                          )
                      )}
                    </td>
                    <td className="">
                      <div className="dropdown dropdown-end ">
                        <label tabIndex={0} className="z-0">
                          <Image src={menubuttonicon} alt="" />
                        </label>
                        <ul
                          tabIndex={1}
                          className=" dropdown-content z-50 bg-white menu shadow border w-36 text-[#7F7F7F]">
                          <li className="text-left ">
                            <a
                              onClick={() => {
                                getProductDetails(data?.node?.id);
                              }}>
                              <Image width={18} src={grayditicon} alt="" /> Edit
                            </a>
                          </li>
                          <label
                            htmlFor="update-list-your-bike-modal"
                            ref={updateProductRef}></label>
                          {/* <label htmlFor="my-modal" className="">
                              {" "}
                              <li className="">
                                <a>
                                  <Image width={18} src={clockicon} alt="" />{" "}
                                  Availability
                                </a>
                              </li>
                            </label> */}
                          {/* {!isActive ? (
                              <li onClick={deactive} className="">
                                <a>
                                  <Image
                                    width={20}
                                    src={Deactivateicon}
                                    alt=""
                                  />{" "}
                                  Deactivate
                                </a>
                              </li>
                            ) : (
                              <li onClick={active} className="">
                                <a>
                                  <Image width={20} src={activeicon} alt="" />{" "}
                                  Activate
                                </a>
                              </li>
                            )} */}
                          <label
                            htmlFor="my-modal-3"
                            className=""
                            onClick={() => setDeleteProduct(data)}>
                            {" "}
                            <li className="">
                              <a>
                                <Image width={18} src={deleteicon} alt="" />{" "}
                                Delete
                              </a>
                            </li>
                          </label>
                        </ul>
                        <AvailabilityModal />
                        {data && <DeleteModal data={deleteProduct} />}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="block md:hidden mt-4">
        {currentData?.map((data) => (
          <div key={data?.node?.id} className=" rounded mb-4">
            <div className="border border-[#DADADA] p-4">
              <div className="flex justify-center items-center">
                {data?.node?.image ? (
                  <img
                    className="w-full h-[200px]"
                    src={data?.node?.image}
                    alt="Avatar Tailwind CSS Component"
                  />
                ) : (
                  <div className="h-[200px] w-[200px] flex justify-center items-center">
                    {" "}
                    <p className="font-semibold">No Image</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <h1 className=" font-semibold text-sm mt-2">
                  {data?.node?.brand}
                </h1>
                <h1 className="font-semibold text-sm mt-2">
                  {data?.node?.productrateSet?.map(
                    (item) =>
                      item?.currency?.id == currency?.currency && (
                        <div>
                          {item?.rate} {item?.currency?.code} /{" "}
                          {item?.rateType?.name}
                        </div>
                      )
                  )}
                </h1>
              </div>
              <div className="flex justify-between">
                <h1 className="font-normal text-sm my-4">
                  Bike id: {data?.node?.id}
                </h1>
              </div>
              <div>
                <h1 className="font-normal text-sm">
                  Bike Size: {data?.node?.size?.productSize}
                </h1>
              </div>
            </div>
            <div className="border border-[#DADADA] border-t-0 px-4 py-[10px]">
              <ul tabIndex={1} className="z-50 bg-white flex justify-between">
                <li className="text-left ">
                  <a
                    onClick={() => {
                      getProductDetails(data?.node?.id);
                    }}>
                    <Image width={18} src={grayditicon} alt="" />
                  </a>
                </li>
                <label
                  htmlFor="update-list-your-bike-modal"
                  ref={updateProductRef}></label>
                <label
                  htmlFor="my-modal-6"
                  className=""
                  onClick={() => setDeleteProductSmall(data)}>
                  <a>
                    <Image width={18} src={deleteicon} alt="" />
                  </a>
                </label>
              </ul>
              {data && <DeleteConfirmModalSmall data={deleteProductSmall} />}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 mb-[50px] md:mt-0 md:mb-[100px] xl:mt-0 xl:mb-[110px]">
        <PaginatedItems
          itemsPerPage={5}
          getCurrentItems={getCurrentItems}
          items={shop?.shops?.edges[0]?.node?.productSet?.edges}
        />
      </div>
      <ListYourBikeModal />
      <UpdateListYourBikeModal />
    </div>
  );
};

export default Inventory;
