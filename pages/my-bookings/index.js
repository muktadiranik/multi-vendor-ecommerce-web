import { useRouter } from "next/router";
import { useEffect } from "react";
import Bookings from "../../components/Bookings";

const MyBookings = () => {
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, []);
  return <Bookings />;
};

export default MyBookings;
