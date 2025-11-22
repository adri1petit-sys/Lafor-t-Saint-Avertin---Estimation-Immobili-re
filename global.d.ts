declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      VITE_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

// This file is used to provide type hints for the Google Maps API
// loaded from the script tag. This prevents TypeScript errors when
// accessing `google.maps`.

declare namespace google {
  namespace maps {
    class Map {
      constructor(el: HTMLElement, opts?: any);
    }
    class Marker {
      constructor(opts?: any);
    }
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Circle {
        constructor(opts?: any);
    }
    namespace places {
      class Autocomplete {
        constructor(inputElement: HTMLInputElement, opts?: AutocompleteOptions);
        addListener(eventName: string, handler: () => void): void;
        getPlace(): PlaceResult;
      }
      interface AutocompleteOptions {
        componentRestrictions?: { country: string | string[] };
        fields?: string[];
        types?: string[];
      }
      
      // Fix: Add missing type definitions for Google Places API
      interface PlaceReview {
        author_name: string;
        rating?: number;
        text?: string;
        relative_time_description?: string;
      }

      interface PlaceResult {
        formatted_address?: string;
        geometry?: {
          location: {
            lat: () => number;
            lng: () => number;
          };
        };
        reviews?: PlaceReview[];
      }

      enum PlacesServiceStatus {
        OK = "OK",
        ZERO_RESULTS = "ZERO_RESULTS",
        NOT_FOUND = "NOT_FOUND",
        INVALID_REQUEST = "INVALID_REQUEST",
        OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
        REQUEST_DENIED = "REQUEST_DENIED",
        UNKNOWN_ERROR = "UNKNOWN_ERROR",
      }

      interface PlaceDetailsRequest {
        placeId: string;
        fields?: string[];
        language?: string;
      }
      
      class PlacesService {
        constructor(attrContainer: HTMLElement | Map);
        getDetails(
          request: PlaceDetailsRequest,
          callback: (result: PlaceResult | null, status: PlacesServiceStatus) => void
        ): void;
      }
    }
  }
}

// FIX: Add export {} to make this file a module and fix the global augmentation error.
export {};
