import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // This will reset the page to the top on route change
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]); // Run whenever the location changes

  return null;
};

export default ResetToTop;
