import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { loadGoogleMapsScript } from '../services/mapsLoader';

// --- CONFIGURATION ---
// IMPORTANT: Replace with your actual Google Maps API key, the same as for the map.
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;
// Google Places ID for "Laforêt Saint-Avertin"
const AGENCY_PLACE_ID = "ChIJz-lxxvnv_EcRq7p86t9s-z0";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FIX: Removed comparison with placeholder API key to resolve TypeScript error. The check for an empty key is sufficient.
    if (!GOOGLE_MAPS_API_KEY) {
      setError("La clé API Google Maps est requise pour afficher les avis. Veuillez la configurer.");
      setIsLoading(false);
      return;
    }

    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY)
      .then(() => {
        const mapElement = document.createElement('div'); // Dummy element for PlacesService
        const service = new google.maps.places.PlacesService(mapElement);

        service.getDetails(
          { placeId: AGENCY_PLACE_ID, fields: ['reviews'], language: 'fr' },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place && place.reviews) {
              const fetchedReviews = place.reviews
                .filter(review => review.text && review.rating) // Ensure reviews have content
                .map((review): Testimonial => ({
                  name: review.author_name,
                  rating: review.rating!,
                  text: review.text!,
                  time: review.relative_time_description,
                }));

              if (fetchedReviews.length > 0) {
                setReviews(fetchedReviews);
              } else {
                setError("Aucun avis n'a été trouvé pour cette agence pour le moment.");
              }
            } else {
              setError("Impossible de charger les avis. Veuillez réessayer plus tard.");
              console.error("Google Places API Error:", status);
            }
            setIsLoading(false);
          }
        );
      })
      .catch(e => {
        console.error("Failed to load Google Maps script for reviews", e);
        setError("Erreur lors du chargement du service d'avis.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000); // Change testimonial every 5 seconds
      return () => clearInterval(timer);
    }
  }, [reviews.length]);
  
  const renderContent = () => {
    if (isLoading) {
      return <p>Chargement des avis...</p>;
    }

    if (error) {
        return (
           <div className="max-w-3xl mx-auto bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative text-left" role="alert">
              <strong className="font-bold">Information : </strong>
              <span className="block sm:inline">{error}</span>
          </div>
        );
    }

    if (reviews.length > 0) {
      return (
        <div className="relative max-w-3xl mx-auto h-64 md:h-56">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <StarRating rating={review.rating} />
                <p className="text-lg md:text-xl italic mt-4 mb-6">"{review.text}"</p>
                <div className="text-center">
                    <p className="font-bold text-laforet-accent">{review.name}</p>
                    {review.time && <p className="text-sm text-gray-300">{review.time}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null; // Should be handled by the error state if reviews are empty
  };

  return (
    <section className="py-16 md:py-24 bg-laforet-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Ce que nos clients disent de nous
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default Testimonials;
