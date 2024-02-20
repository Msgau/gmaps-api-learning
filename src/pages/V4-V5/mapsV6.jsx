import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import config from "../../config";
import PlaceAutocompleteClassic from "../../components/PlaceAutoComplete";
import MapHandler from "./map-handler";
import Header from "../Header/Header";
import "./mapsV6.css";
import formatted from "../../data/cafés";

const API_KEY = config.googleMapsApiKey;

const MapsV6 = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false); // Nouvelle variable d'état

  const position = { lat: 44.0971, lng: 6.24067 };

  return (
    <div>
      <Header />
      <APIProvider apiKey={API_KEY} version="weekly">
        <div style={{ height: "78vh", width: "90%" }} className="map-container">
          <PlaceAutocompleteClassic onPlaceSelect={setSelectedPosition} />
          <MapHandler place={selectedPosition} />
          <Map
            zoom={14}
            center={position}
            mapId={config.mapId}
            // gestureHandling={"greedy"}
            // disableDefaultUI={true}
          >
            <AdvancedMarker
              position={position}
              onClick={() => setShowUserLocation(true)} // Mettre à jour showUserLocation à true lorsqu'il est cliqué
            >
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
            </AdvancedMarker>

            {showUserLocation && ( // Afficher la deuxième InfoWindow lorsque showUserLocation est true
              <InfoWindow
                position={position}
                pixelOffset={new window.google.maps.Size(0, -25)}
                onCloseClick={() => setShowUserLocation(false)} // Mettre à jour showUserLocation à false lorsqu'il est fermé
              >
                <div>
                  <h3>Votre géolocalisation</h3>
                </div>
              </InfoWindow>
            )}

            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.position}
                pixelOffset={new window.google.maps.Size(0, -30)}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <div>Note : {selectedPlace.rating}/5</div>
                  <h3>{selectedPlace.name}</h3>
                  {selectedPlace.price && (
                    <p>Prix: {selectedPlace.price} €</p>
                  )}
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
                        selectedPlace.closing &&
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
};

const Markers = ({ points, setSelectedPlace }) => {
  return (
    <>
      {points.map(
        ({ name, price, adress, rating, closing, lat, lng, key }) => (
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
        )
      )}
    </>
  );
};

export default MapsV6;
