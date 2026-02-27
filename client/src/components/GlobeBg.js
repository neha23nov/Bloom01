import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

export default function GlobeBackground() {
  const globeEl = useRef();

  return (
    <div className="absolute inset-0 -z-10">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)" // transparent background
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}
