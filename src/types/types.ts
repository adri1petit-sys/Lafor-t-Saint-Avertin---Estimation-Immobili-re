export interface PropertyCharacteristics {
  vis_a_vis: string;
  vue_quality: string;
  luminosite: string;
  exposition: string;
  nuisances_sonores: string;
  proximite_axes: string;
  travaux_niveau: string;
  travaux_details?: string;
  exterieur_qualite: string;
  vis_a_vis_jardin: string;
  stationnement_type: string;
}

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
  
  // Refinement fields (new step)
  vis_a_vis?: 'oui' | 'non' | 'faible' | 'fort';
  vue_quality?: 'dégagée' | 'partiellement dégagée' | 'vis-à-vis important' | 'vue exceptionnelle';
  exposition?: 'Nord' | 'Sud' | 'Est' | 'Ouest';
  luminosite?: 'faible' | 'normale' | 'très lumineuse';
  nuisances_sonores?: 'aucune' | 'faibles' | 'régulières' | 'importantes';
  proximite_axes?: 'oui' | 'non';
  travaux_niveau?: 'légers' | 'moyens' | 'importants' | 'aucun';
  travaux_details?: string;
  exterieur_qualite?: 'pas d’extérieur' | 'petit' | 'correct' | 'grand' | 'très qualitatif';
  vis_a_vis_jardin?: 'aucun' | 'faible' | 'fort';
  stationnement_type?: 'aucun' | 'garage' | 'parking' | 'parking + garage';

  // Step 4 (Contact)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
}

export interface EstimationResult {
  estimation_low: number;
  estimation_mid: number;
  estimation_high: number;
  price_m2_estimated: number;
  price_m2_sector: number;
  sector_trend_12m: 'hausse' | 'baisse' | 'stable';
  environment_analysis: {
    schools: string;
    transport: string;
    shops: string;
    sector_attractiveness: string;
    population_type: string;
    recent_sales_summary: string;
  };
  strengths: string[];
  weaknesses: string[];
  potential: string[];
  reliability_score: number;
  synthesis: string;
  property_characteristics: PropertyCharacteristics;
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

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  time?: string;
}