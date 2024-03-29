import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps"
import config from "../config";
import Header from "./Header/Header";

export default function Intro() {
  const position = { lat: 44.09252, lng: 6.2324 };
  const [open, setOpen] = useState(false);

  return (
    <div>
    <Header />
    <APIProvider apiKey={config.googleMapsApiKey}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={config.mapId}>
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