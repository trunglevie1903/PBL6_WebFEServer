// import React, { useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";

// const Status = () => {
//   const {isAuthenticated, handleTokenInvalidation, validateToken} = useAuth();
//   console.log(isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       handleTokenInvalidation();
//     }
//   }, [
    
//   ]);

//   if (!isAuthenticated) {
//     return <p>Redirecting to login...</p>;
//   }

//   return <div>Welcome to the Status page!</div>;
// };

// export default Status;
