import { useLayoutEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useLayoutWindowSize = () => {
  const [screenSize, setScreenSize] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    const handleResize = () => setScreenSize(getWindowDimensions());
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
