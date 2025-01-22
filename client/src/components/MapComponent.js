import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function MapComponent() {

  return (
    <div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        />
      </LoadScript>
    </div>
  );
}

export default MapComponent