import React, { useState, useEffect } from "react";

const PerformanceAnimation = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  let img = null;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = props.src;
  }, [props.src]);

  return (
    <>
      {isLoaded && (
        <img
          src={img}
          alt="Performance animation"
          style={{ display: props.isVisible ? "block" : "none" }}
        />
      )}
    </>
  );
};

export default PerformanceAnimation;
