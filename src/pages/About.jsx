import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { mapService } from "../../services/map.service.js";



export function About() {
    const [branches,setBraches]=useState([])
    const [center,setCenter]=useState({ lat: 32.0853, lng: 34.7818 })

    useEffect(()=>{
        setBraches(mapService.getBranches())
    },[])
  const containerStyle = {
    width: "100%",
    height: "700px",
  };

  function onSelectBranch(branch) {
    setCenter({ lat: branch.lat, lng: branch.lng });
}


  return (
    <section className="about">
      <h1>Map of all Branches</h1>
      <LoadScript googleMapsApiKey="AIzaSyDV32zrtz0rOxkzvuFRJJ1fDRknM5gqFMg">
        <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={center}>

            {branches && branches.map((branch, idx) => (
            <Marker
              key={idx}
              position={{ lat: branch.lat, lng: branch.lng }}
              onClick={() => onSelectBranch(branch)}
              label={branch.name} 
            />
            ))}
        </GoogleMap>
      </LoadScript>
    </section>
  );
}
