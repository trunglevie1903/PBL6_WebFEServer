import axios from "axios";
import {jwtDecode} from "jwt-decode";

const checkValidToken = async () => {
  try {
    const oldAccessToken = localStorage.getItem("accessToken");
    const oldRefreshToken = localStorage.getItem("refreshToken");
    // Check accessToken
    // Check if is null => false
    if (!oldAccessToken) return false;
    // Check if token is not expired
    const decoded = jwtDecode(oldAccessToken);
    // console.log('decoded: ', decoded);
    // If there is no expireTime => invalid token => false
    if (!decoded.exp) return false;
    // If token is not expired => valid => true
    if (new Date(decoded.exp * 1000) >= new Date()) {
      const response = await axios.post(
        "http://127.0.0.1:4000/user/authenticate-account", {}, {
          headers: {"Authorization": `Bearer ${oldAccessToken}`}
        }
      );
      if (response.status !== 200) throw response;
      else return true
    };
    // If token is expired => try to refresh it
    // If refreshToken is null => false
    if (!oldRefreshToken) return false;
    // Attempt to refresh this refreshToken by calling BE API        
    const response = await axios.post(
      "http://127.0.0.1:4000/user/refresh-token", {refreshToken: oldRefreshToken}, {
        headers: {"Content-Type": "application/json"}
      }
    );
    // console.log("response data: ", response.data);
    const {accessToken, refreshToken} = response.data;
    if (!accessToken || !refreshToken) throw new Error("Invalid response, new token not found");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  } catch (error) {
    console.log('checkValidToken error: ', error);
    if (axios.isAxiosError(error) && error.response) {
      alert(`Error: ${error.response?.data.message || error}`);
    } else {
      alert(`Error: ${error}`);
    }
    return false;
  }
};

export default checkValidToken;