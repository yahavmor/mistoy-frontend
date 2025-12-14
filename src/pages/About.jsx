import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { mapService } from "../../services/map.service.js";

export function About() {
  const [branches, setBranches] = useState([]);
  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 });

  useEffect(() => {
    setBranches(mapService.getBranches());
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDV32zrtz0rOxkzvuFRJJ1fDRknM5gqFMg",
  });

  const containerStyle = {
    width: "100%",
    height: "700px",
  };

  function onSelectBranch(branch) {
    setCenter({ lat: branch.lat, lng: branch.lng });
  }

  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <section className="about">
      <h1>Map of all Branches</h1>

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        center={center}
      >
        {branches.map((branch, idx) => (
          <Marker
            key={idx}
            position={{ lat: branch.lat, lng: branch.lng }}
            onClick={() => onSelectBranch(branch)}
            label={branch.name}
          />
        ))}
      </GoogleMap>
    </section>
  );
}
