import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import config from "../../config";
import Header from "../Header/Header";
import formatted from "../../data/cafés";
import "./mapsV4.css";

export default function MapsV4() {
  const position = { lat: 44.0971, lng: 6.24067 };
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div>
      <Header />
      <APIProvider apiKey={config.googleMapsApiKey}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map
            zoom={9}
            center={position}
            mapId={config.mapId}
            clickableIcons={false}
          >
            <AdvancedMarker
              position={position}
              onClick={() =>
                setSelectedPlace({
                  name: "I'm in Digne",
                  price: null,
                  position,
                })
              }
            >
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
            </AdvancedMarker>
            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.position}
                pixelOffset={new window.google.maps.Size(0, -30)}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <div>Note : {selectedPlace.rating}/5</div>
                  <h3>{selectedPlace.name}</h3>
                  {selectedPlace.price && <p>Prix: {selectedPlace.price} €</p>}
                  <p>{selectedPlace.adress}</p>
                  <p className="openingDays">
                    Jours d'ouverture :{" "}
                    {[
                      "Lundi",
                      "Mardi",
                      "Mercredi",
                      "Jeudi",
                      "Vendredi",
                      "Samedi",
                      "Dimanche",
                    ].map((day) => {
                      const dayAbbreviation = day.substring(0, 3).toLowerCase();
                      const isOpenDay =
                        !selectedPlace.closing.includes(dayAbbreviation);
                      return (
                        <span
                          key={dayAbbreviation}
                          className={isOpenDay ? "openDay" : "closedDay"}
                        >
                          {isOpenDay ? day : <s>{day}</s>}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </InfoWindow>
            )}

            <Markers points={formatted} setSelectedPlace={setSelectedPlace} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

const Markers = ({ points, setSelectedPlace }) => {
  return (
    <>
      {points.map(({ name, price, adress, rating, closing, lat, lng, key }) => (
        <AdvancedMarker
          position={{ lat, lng }}
          key={key}
          onClick={() =>
            setSelectedPlace({
              name,
              price,
              adress,
              rating,
              closing,
              position: { lat, lng },
            })
          }
        >
          <span style={{ fontSize: "2rem" }}>☕</span>
        </AdvancedMarker>
      ))}
    </>
  );
};
