import axios from "axios";

/**
 *
 * @param {*} accesstoken This is the accesstoken of the user obtained from FaceBook
 */
const facebookLogin = async (accesstoken) => {
  let res = fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/facebook/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: accesstoken }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {});

  return res.status;
};

export default facebookLogin;
