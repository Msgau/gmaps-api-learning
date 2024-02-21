import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import config from "../../config";
import PlaceAutocompleteClassic from "../../components/PlaceAutoComplete";
import MapHandler from "../map-handler";
import Header from "../Header/Header";
import './mapsV6.css';
const API_KEY = config.googleMapsApiKey;

const MapsV5 = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const position = { lat: 44.0971, lng: 6.24067 };

  return (
    <div>
      <Header />
      <APIProvider apiKey={API_KEY}>
        <div style={{ height: "78vh", width: "90%" }} className="map-container">
        <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
        <MapHandler place={selectedPlace} />
          <Map
            zoom={14}
            center={position}
            mapId={config.mapId}
            // gestureHandling={"greedy"}
            // disableDefaultUI={true}
          />
        </div>

      </APIProvider>
    </div>
  );
};

export default MapsV5;