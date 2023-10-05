import Image from "next/image";
import React, { useEffect } from "react";
import shopimage from "/public/images/shop-owner/cycling.png";
import image from "/public/images/shop-owner/Cover.svg";
import frameicon from "/public/images/shop-owner/Frame.png";
import phoneicon from "/public/images/Vector2.png";
import locationicon from "/public/images/shop-owner/location-marker.png";
import calenderIcon from "/public/images/calender1.png";
import editicon from "/public/images/edit-white.png";
import CreateShopIcon from "/public/images/create.png";
import CreateShop from "../../components/shop/CreateShop";
import UserProfileInfo from "../../components/UserProfileInfo";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <UserProfileInfo />
      <CreateShop />
    </>
  );
};

export default UserProfile;
