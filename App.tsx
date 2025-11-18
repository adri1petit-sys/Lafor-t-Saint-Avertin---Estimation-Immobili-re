
import React, { useState, useRef } from 'react';
import { EstimationFormData, EstimationResult } from './types';
import { getRealEstateEstimation } from './services/geminiService';

import Header from './components/Header';
import Hero from './components/Hero';
import WhyBracke from './components/WhyBracke';
import Faq from './components/Faq';
import Footer from './components/Footer';
import EstimationForm from './components/EstimationForm';
import EstimationResultDisplay from './components/EstimationResultDisplay';
import Chatbot from './components/Chatbot';
import AgenciesMap from './components/AgenciesMap';


// Loading messages
const loadingSteps = [
  "Analyse de votre adresse...",
  "Croisement avec les dernières ventes locales...",
  "Prise en compte des caractéristiques de votre bien...",
  "Calcul de la fourchette de prix...",
  "Génération de l’analyse de votre quartier...",
  "Finalisation de votre rapport personnalisé..."
];

export default function App() {
  const [formData, setFormData] = useState<EstimationFormData | null>(null);
  const [estimationResult, setEstimationResult] = useState<EstimationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);

  const estimationFormRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (data: EstimationFormData) => {
    setFormData(data);
    setIsLoading(true);
    setError(null);
    setEstimationResult(null);
    setCurrentLoadingStep(0);

    const interval = setInterval(() => {
      setCurrentLoadingStep(prev => (prev + 1) % loadingSteps.length);
    }, 1500);

    try {
      const result = await getRealEstateEstimation(data);
      setEstimationResult(result);
    } catch (err) {
      console.error("Error fetching estimation:", err);
      setError("Une erreur est survenue lors de la génération de votre estimation. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };

  const scrollToForm = () => {
    estimationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero onGetEstimationClick={scrollToForm} />
        <WhyBracke />
        <div ref={estimationFormRef} className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {!estimationResult && !isLoading && (
               <EstimationForm onSubmit={handleFormSubmit} />
            )}
            {isLoading && (
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-laforet-primary mb-6">Nous préparons votre estimation...</h2>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                        <div className="bg-laforet-accent h-4 rounded-full animate-pulse" style={{ width: `${(currentLoadingStep + 1) / loadingSteps.length * 100}%` }}></div>
                    </div>
                    <p className="text-lg text-gray-600 transition-opacity duration-500">{loadingSteps[currentLoadingStep]}</p>
                </div>
            )}
             {error && !isLoading && (
              <div className="text-center max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur ! </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={() => { setEstimationResult(null); setError(null); }} className="mt-4 bg-laforet-primary text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                  Réessayer
                </button>
              </div>
            )}
            {estimationResult && !isLoading && formData && (
              <EstimationResultDisplay result={estimationResult} formData={formData} />
            )}
          </div>
        </div>
        <AgenciesMap />
        <Faq />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}