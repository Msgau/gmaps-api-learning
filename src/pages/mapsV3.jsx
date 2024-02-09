import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./mapsV3.css";
import config from "../config";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [center, setCenter] = useState({ lat: 44.0971, lng: 6.24067 });
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} />
      </div>
      <div className="map-flex">
        <GoogleMap
          style={{ height: "100vh", width: "100%" }}
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, setCenter }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCenter({ lat, lng }); // Mettre à jour le centre de la carte avec les coordonnées sélectionnées
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
