import axios from "axios";

const checkAuthenticated = async (): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    // If no information found => return false
    if (!accessToken || !refreshToken) throw new Error("No authentication data");
    // If authentication data found => try to check its validity
    const response = await axios.post(
      'http://127.0.0.1:4000/user/authenticate-account',
      {
        refreshToken
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type' : 'application/json'
        }
      }
    );
    if (response.data && response.data.tokens) {
      const tokens = response.data.tokens;
      if (tokens.accessToken && tokens.refreshToken) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        return true;
      } else {
        throw new Error('Generated token is invalid');
      }
    } else {
      throw new Error('Error validating tokens');
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return false;
  }
  // return true;
  // return false;
};

export default checkAuthenticated;