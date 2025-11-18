import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript } from '../services/mapsLoader';

const GOOGLE_MAPS_API_KEY = "AIzaSyA60-xXW1VFg5W9IyZyN8vBwkftd-0XAcY";
const CITY_NAME = "Saint-Avertin";
const SERVED_AREAS = ["Saint-Avertin", "Chambray-lès-Tours", "Tours-Sud", "Larçay", "Veigné", "Esvres-sur-Indre"];
const MAP_CENTER = { lat: 47.3486, lng: 0.7208 }; // Saint-Avertin coordinates

const AgenciesMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    // FIX: Removed comparison with placeholder API key to resolve TypeScript error. The check for an empty key is sufficient.
    if (!GOOGLE_MAPS_API_KEY) {
        setApiKeyMissing(true);
        return;
    }
    setApiKeyMissing(false);

    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: MAP_CENTER,
            zoom: 12,
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [ { "color": "#7c93a3" }, { "lightness": "-10" } ]
                },
                // Other style configs...
            ]
          });

          new google.maps.Marker({
            position: MAP_CENTER,
            map,
            title: `Laforêt ${CITY_NAME}`,
          });

          new google.maps.Circle({
            strokeColor: "#183C89",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00AFED",
            fillOpacity: 0.2,
            map,
            center: MAP_CENTER,
            radius: 5000, // 5km radius
          });
        }
      })
      .catch(e => {
          console.error("Failed to load Google Maps", e);
          setApiKeyMissing(true);
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-laforet-primary mb-4">
          Notre secteur d'intervention
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {SERVED_AREAS.join(', ')}
        </p>
        {apiKeyMissing ? (
            <div className="w-full h-96 rounded-lg shadow-xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 flex items-center justify-center text-center">
                <div>
                    <h3 className="font-bold text-lg mb-2">Erreur de configuration de la carte</h3>
                    <p>
                        La clé API Google Maps est manquante ou invalide.
                        <br />
                        Veuillez l'ajouter dans le fichier <code>components/AgenciesMap.tsx</code>.
                    </p>
                </div>
            </div>
        ) : (
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg shadow-xl"
              aria-label="Carte montrant la zone de service de l'agence Laforêt Saint-Avertin"
            ></div>
        )}
      </div>
    </section>
  );
};

export default AgenciesMap;