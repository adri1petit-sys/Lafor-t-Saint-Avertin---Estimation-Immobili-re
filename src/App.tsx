import React, { useState, useRef } from 'react';
import { EstimationFormData, EstimationResult } from './types/types';
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
import Testimonials from './components/Testimonials';


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
  
  const handleReset = () => {
    setFormData(null);
    setEstimationResult(null);
    setIsLoading(false);
    setError(null);
    scrollToForm();
  }

  const handleFormSubmit = async (data: EstimationFormData) => {
    setFormData(data);
    setIsLoading(true);
    setError(null);
    setEstimationResult(null);
    setCurrentLoadingStep(0);

    const interval = setInterval(() => {
      setCurrentLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
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
    estimationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>
        <Hero onGetEstimationClick={scrollToForm} />
        <WhyBracke />
        <div ref={estimationFormRef} className="py-16 md:py-24 bg-white scroll-mt-20">
          <div className="container mx-auto px-4">
            {!estimationResult && !isLoading && (
               <EstimationForm onSubmit={handleFormSubmit} />
            )}
            {isLoading && (
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-laforet-primary mb-6">Nous préparons votre estimation...</h2>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                        <div className="bg-laforet-accent h-4 rounded-full transition-all duration-500" style={{ width: `${(currentLoadingStep + 1) / loadingSteps.length * 100}%` }}></div>
                    </div>
                    <p className="text-lg text-gray-600 transition-opacity duration-500">{loadingSteps[currentLoadingStep]}</p>
                </div>
            )}
             {error && !isLoading && (
              <div className="text-center max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur ! </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={handleReset} className="mt-4 bg-laforet-primary text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                  Réessayer
                </button>
              </div>
            )}
            {estimationResult && !isLoading && formData && (
              <EstimationResultDisplay result={estimationResult} formData={formData} onNewEstimation={handleReset} />
            )}
          </div>
        </div>
        <AgenciesMap />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}