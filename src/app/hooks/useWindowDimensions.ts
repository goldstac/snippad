import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    () => {
      if (typeof window !== "undefined") {
        return getWindowDimensions();
      }
      return { width: 0, height: 0 };
    },
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
