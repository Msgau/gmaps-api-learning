

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"
import config from "../config";

export default function Introv2() {
  const position = { lat: 44.0971, lng: 6.24067 };
  const [open, setOpen] = useState(false);

  return (
    <div>
        
    <APIProvider apiKey={config.googleMapsApiKey}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={"e4e7d5ce8378df81"}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Digne</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
    </div>
  );
}