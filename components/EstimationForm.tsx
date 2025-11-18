
import React, { useState } from 'react';
import { EstimationFormData } from '../types';
import GoogleAddressAutocompleteInput from './GoogleAddressAutocompleteInput';

interface EstimationFormProps {
  onSubmit: (data: EstimationFormData) => void;
}

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => (
  <div className="mb-8">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-laforet-primary">Étape {currentStep}/{totalSteps}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-laforet-accent h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  </div>
);

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<EstimationFormData>>({
    propertyType: 'Maison',
    gdprConsent: false,
    condition: 'Bon état',
    featuresQuality: 'Standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddressSelect = (address: string) => {
    setFormData(prev => ({ ...prev, address }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gdprConsent) {
      onSubmit(formData as EstimationFormData);
    } else {
      alert("Vous devez accepter la politique de confidentialité pour continuer.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-laforet-primary mb-2">Estimez votre bien gratuitement</h2>
      <p className="text-center text-gray-600 mb-8">Obtenez une première fourchette de prix en 3 étapes simples.</p>
      
      <ProgressBar currentStep={step} totalSteps={3} />
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-700">1. Informations principales</h3>
            <GoogleAddressAutocompleteInput onAddressSelect={handleAddressSelect} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de bien</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option>Maison</option>
                <option>Appartement</option>
                <option>Terrain</option>
                <option>Immeuble</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface habitable (m²)</label>
              <input type="number" name="livingArea" value={formData.livingArea || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            {formData.propertyType === 'Appartement' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Étage</label>
                  <input type="number" name="floor" value={formData.floor || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex items-center"><input type="checkbox" name="hasElevator" checked={!!formData.hasElevator} onChange={handleChange} className="h-4 w-4 text-laforet-accent border-gray-300 rounded mr-2" /><label>Ascenseur</label></div>
                 <div className="flex items-center"><input type="checkbox" name="hasBalcony" checked={!!formData.hasBalcony} onChange={handleChange} className="h-4 w-4 text-laforet-accent border-gray-300 rounded mr-2" /><label>Balcon / Terrasse</label></div>
              </>
            )}
            {formData.propertyType === 'Maison' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surface du terrain (m²)</label>
                <input type="number" name="landArea" value={formData.landArea || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            )}
            <div className="flex justify-end">
              <button type="button" onClick={nextStep} className="bg-laforet-primary text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">Suivant</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-700">2. Détails du bien</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nombre de pièces</label><input type="number" name="rooms" value={formData.rooms || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nombre de chambres</label><input type="number" name="bedrooms" value={formData.bedrooms || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Année de construction</label><input type="number" name="buildYear" value={formData.buildYear || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">État général</label><select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"><option>À rénover</option><option>Travaux à prévoir</option><option>Bon état</option><option>Très bon état</option><option>Neuf</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Qualité des prestations</label><select name="featuresQuality" value={formData.featuresQuality} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"><option>Standard</option><option>De qualité</option><option>Haut de gamme / Luxe</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Stationnement</label><select name="parking" value={formData.parking} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"><option>Aucun</option><option>Garage</option><option>Parking extérieur</option><option>Box</option></select></div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">Précédent</button>
              <button type="button" onClick={nextStep} className="bg-laforet-primary text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">Suivant</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-xl font-semibold text-gray-700">3. Vos coordonnées</h3>
             <p className="text-sm text-gray-500">Nous ne partagerons jamais vos informations. Elles nous permettent de vous envoyer votre estimation personnalisée.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" /></div>
            <div className="flex items-start">
              <input type="checkbox" id="gdprConsent" name="gdprConsent" checked={!!formData.gdprConsent} onChange={handleChange} required className="h-4 w-4 text-laforet-accent border-gray-300 rounded mt-1 mr-2" />
              <label htmlFor="gdprConsent" className="text-sm text-gray-600">J'accepte que mes données soient utilisées par Laforêt Saint-Avertin pour me recontacter dans le cadre de ma demande d'estimation.</label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">Précédent</button>
              <button type="submit" className="bg-laforet-accent text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50" disabled={!formData.gdprConsent}>Obtenir mon estimation</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EstimationForm;
