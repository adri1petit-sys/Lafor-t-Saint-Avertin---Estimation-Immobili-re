import React, { useRef, useEffect, useState } from 'react';
import { loadGoogleMapsScript } from '../services/mapsLoader';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const SERVED_AREAS = ["Saint-Avertin", "Chambray-lès-Tours", "Tours-Sud", "Larçay", "Veigné", "Esvres-sur-Indre"];

interface GoogleAddressAutocompleteInputProps {
  onAddressSelect: (address: string) => void;
}

const GoogleAddressAutocompleteInput: React.FC<GoogleAddressAutocompleteInputProps> = ({ onAddressSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
        setApiKeyMissing(true);
        console.error("VITE_GOOGLE_MAPS_API_KEY is missing. Please add it to your .env.local file.");
        return;
    }
    setApiKeyMissing(false);

    let autocomplete: google.maps.places.Autocomplete | null = null;
    
    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (inputRef.current) {
          autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'fr' },
            fields: ["formatted_address"],
            types: ["address"],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete?.getPlace();
            if (place && place.formatted_address) {
              onAddressSelect(place.formatted_address);
            }
          });
        }
      })
      .catch(error => {
        console.error("Could not load Google Maps script:", error)
        setApiKeyMissing(true);
      });
  }, [onAddressSelect]);

  return (
    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
        Adresse du bien
      </label>
      <input
        id="address"
        ref={inputRef}
        type="text"
        placeholder={apiKeyMissing ? "Configuration API Google Maps requise" : "Commencez à taper votre adresse..."}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-laforet-accent focus:border-laforet-accent disabled:bg-gray-200 disabled:cursor-not-allowed"
        required
        disabled={apiKeyMissing}
      />
      {apiKeyMissing ? (
        <p className="text-xs text-red-600 mt-1">
          <strong>Erreur :</strong> La clé API Google Maps est manquante ou invalide. Veuillez la configurer dans votre fichier <code>.env.local</code> ou dans les variables d'environnement de votre plateforme de déploiement.
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-1">Zone desservie : {SERVED_AREAS.join(', ')}.</p>
      )}
    </div>
  );
};

export default GoogleAddressAutocompleteInput;