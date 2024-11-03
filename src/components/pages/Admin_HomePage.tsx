// This page will show the webapp's statistic data, and a navbar to other management pages

import { useEffect } from "react";
import authenticateAdminUser from "../functions/authenticateAdminUser";

const AdminHomePage: React.FC = () => {
  useEffect(() => {
    const preloadFunction = async () => {
      try {
        const val = await authenticateAdminUser();
        if (!val) throw new Error("Token not found");
      } catch (error) {
        alert("You are not allowed to access this page");
        console.error(error);
        window.location.href = "/";
      }
    };
    preloadFunction();
  }, []);

  return (
    <div>
      Admin Home Page
    </div>
  );
};

export default AdminHomePage;