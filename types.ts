
export interface EstimationFormData {
  address: string;
  propertyType: 'Maison' | 'Appartement' | 'Terrain' | 'Immeuble';
  livingArea: number;
  // Appartement specific
  floor?: number;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  balconyArea?: number;
  // Maison specific
  landArea?: number;
  // Step 2
  rooms: number;
  bedrooms: number;
  buildYear: number;
  condition: 'À rénover' | 'Travaux à prévoir' | 'Bon état' | 'Très bon état' | 'Neuf';
  featuresQuality: 'Standard' | 'De qualité' | 'Haut de gamme / Luxe';
  hasRecentWork?: boolean;
  needsWork?: boolean;
  orientation?: 'Nord' | 'Sud' | 'Est' | 'Ouest';
  parking?: 'Aucun' | 'Garage' | 'Parking extérieur' | 'Box';
  // Step 3
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
}

export interface EstimationResult {
  estimation: {
    basse: number;
    moyenne: number;
    haute: number;
    indiceFiabilite: number;
  };
  analyseEnvironnement: string;
  commentaireFiabilite: string;
}

export interface WhyUsPoint {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

// FIX: Add the missing 'Testimonial' type definition.
export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  time?: string;
}
