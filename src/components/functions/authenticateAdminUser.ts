import { jwtDecode, JwtPayload } from "jwt-decode";
import checkValidToken from "./checkValidToken";

const authenticateAdminUser = async (): Promise<boolean> => {
  try {
    // Check if user is authenticated
    const isAuthenticatedAsUser = await checkValidToken();
    if (!isAuthenticatedAsUser) throw new Error("You are not allowed to access this page");
    // Recheck the authentication token
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Token not found");
    // Decode the token and check its payload
    const decoded = jwtDecode(accessToken) as JwtPayload;
    if (!decoded.exp) return false;
    // If token's payload has role admin => true
    if (new Date(decoded.exp * 1000) >= new Date()) return ("role" in decoded && decoded.role === "admin");
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authenticateAdminUser;