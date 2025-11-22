import React from 'react';
import { EstimationResult, EstimationFormData } from '../types/types';

interface EstimationResultDisplayProps {
  result: EstimationResult;
  formData: EstimationFormData;
  onNewEstimation: () => void;
}

const AGENCY_CONTACT_EMAIL = "saint-avertin@laforet.com";

const formatCurrency = (value: number) => {
  if (isNaN(value)) return 'N/A';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

// --- SVG Icons ---
const SchoolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
const TransportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShopsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const TrendIcon = ({ trend }: { trend: 'hausse' | 'baisse' | 'stable' }) => {
    if (trend === 'hausse') return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>;
    if (trend === 'baisse') return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-9.293l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414z" clipRule="evenodd" /></svg>;
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 002 0V7a1 1 0 10-2 0v2zm1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
};
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zm.464-10.607a1 1 0 000 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>;
const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const HammerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>;
const SoundIcon = ({ level }: { level: string }) => {
    const color = level.includes('aucune') || level.includes('faible') ? 'text-green-500' : 'text-red-500';
    return <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${color}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" /></svg>;
};

const getReliabilityInfo = (score: number) => {
  const sanitizedScore = Math.min(Math.max(score, 0), 100);
  if (sanitizedScore >= 85) return { text: "Très fiable", color: 'bg-green-500', textColor: 'text-green-600' };
  if (sanitizedScore >= 65) return { text: "Fiable", color: 'bg-yellow-500', textColor: 'text-yellow-600' };
  if (sanitizedScore >= 45) return { text: "À affiner", color: 'bg-orange-500', textColor: 'text-orange-600' };
  return { text: "Faible - Visite recommandée", color: 'bg-red-500', textColor: 'text-red-600' };
};

const EstimationResultDisplay: React.FC<EstimationResultDisplayProps> = ({ result, formData, onNewEstimation }) => {
    const { estimation_low, estimation_mid, estimation_high, reliability_score, environment_analysis, price_m2_estimated, price_m2_sector, sector_trend_12m, strengths, weaknesses, potential, synthesis, property_characteristics } = result;
    const reliabilityInfo = getReliabilityInfo(reliability_score);
    
    const mailtoHref = `mailto:${AGENCY_CONTACT_EMAIL}?subject=${encodeURIComponent(`Demande d’estimation professionnelle – ${formData.address}`)}&body=${encodeURIComponent(`
Bonjour,

Suite à mon estimation en ligne, je souhaiterais obtenir une estimation professionnelle à domicile.

Voici un résumé des informations de mon bien :
--------------------------------------------------
Adresse : ${formData.address}
Type de bien : ${formData.propertyType}
Surface : ${formData.livingArea} m²
Pièces : ${formData.rooms}
Chambres : ${formData.bedrooms}
Année de construction : ${formData.buildYear}
--------------------------------------------------

Mes coordonnées :
Nom : ${formData.lastName} ${formData.firstName}
Email : ${formData.email}
Téléphone : ${formData.phone}

Merci de me recontacter pour convenir d'un rendez-vous.

Cordialement,
${formData.firstName} ${formData.lastName}
`)}`;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-laforet-primary">Votre rapport d'estimation</h2>
            <p className="text-lg md:text-xl text-gray-700 mt-2">{formData.address}</p>
        </div>

        {/* --- Price Estimation --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-12">
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm"><p className="text-sm text-gray-500">Fourchette basse</p><p className="text-2xl font-bold text-gray-700">{formatCurrency(estimation_low)}</p></div>
            <div className="p-8 bg-laforet-primary text-white rounded-lg shadow-lg transform md:scale-110"><p className="text-lg">Estimation moyenne</p><p className="text-4xl font-extrabold">{formatCurrency(estimation_mid)}</p></div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm"><p className="text-sm text-gray-500">Fourchette haute</p><p className="text-2xl font-bold text-gray-700">{formatCurrency(estimation_high)}</p></div>
        </div>
        
        {/* --- Synthesis --- */}
        <div className="my-10 p-6 bg-blue-50 border-l-4 border-laforet-accent italic text-center">
            <p className="text-lg text-laforet-primary">"{synthesis}"</p>
        </div>

        {/* --- Detailed Analysis Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* --- Left Column --- */}
            <div className="lg:col-span-2 space-y-8">
                 {/* Environment Analysis */}
                <div className="bg-white p-6 rounded-lg shadow-md border"><h3 className="text-xl font-semibold text-laforet-primary mb-4">Analyse de l'environnement</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-center">
                        <div className="bg-gray-50 p-3 rounded-md"><div className="flex items-center justify-center text-laforet-accent"><SchoolIcon /><span className="ml-2 font-medium">Écoles</span></div><p className="text-xs text-gray-600 mt-1">{environment_analysis.schools}</p></div>
                        <div className="bg-gray-50 p-3 rounded-md"><div className="flex items-center justify-center text-laforet-accent"><TransportIcon /><span className="ml-2 font-medium">Transports</span></div><p className="text-xs text-gray-600 mt-1">{environment_analysis.transport}</p></div>
                        <div className="bg-gray-50 p-3 rounded-md"><div className="flex items-center justify-center text-laforet-accent"><ShopsIcon /><span className="ml-2 font-medium">Commerces</span></div><p className="text-xs text-gray-600 mt-1">{environment_analysis.shops}</p></div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><strong className="font-medium">Attractivité :</strong> <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{environment_analysis.sector_attractiveness}</span></p>
                        <p><strong className="font-medium">Population type :</strong> {environment_analysis.population_type}</p>
                        <p><strong className="font-medium">Ventes récentes (similaires) :</strong> {environment_analysis.recent_sales_summary}</p>
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="bg-white p-6 rounded-lg shadow-md border"><h3 className="text-xl font-semibold text-laforet-primary mb-4">Caractéristiques clés</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><h4 className="font-semibold text-green-600 mb-2">Points forts</h4><ul className="space-y-1 text-sm list-disc list-inside text-gray-600">{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
                        <div><h4 className="font-semibold text-red-600 mb-2">Points faibles</h4><ul className="space-y-1 text-sm list-disc list-inside text-gray-600">{weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul></div>
                        <div className="md:col-span-2"><h4 className="font-semibold text-blue-600 mb-2">Potentiel</h4><ul className="space-y-1 text-sm list-disc list-inside text-gray-600">{potential.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
                    </div>
                </div>

                 {/* Refined Characteristics */}
                 <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold text-laforet-primary mb-4">Affinage & caractéristiques déclarées</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-sm">
                        <div className="flex items-center"><ViewIcon /><strong className="ml-2">Vue :</strong><span className="ml-auto text-right text-gray-600 capitalize">{property_characteristics.vue_quality}</span></div>
                        <div className="flex items-center"><SunIcon /><strong className="ml-2">Luminosité :</strong><span className="ml-auto text-right text-gray-600 capitalize">{property_characteristics.luminosite}</span></div>
                        <div className="flex items-center"><HammerIcon /><strong className="ml-2">Travaux :</strong><span className="ml-auto text-right text-gray-600 capitalize">{property_characteristics.travaux_niveau}</span></div>
                        <div className="flex items-center"><SoundIcon level={property_characteristics.nuisances_sonores}/><strong className="ml-2">Nuisances :</strong><span className="ml-auto text-right text-gray-600 capitalize">{property_characteristics.nuisances_sonores}</span></div>
                        <div className="flex items-center col-span-2 sm:col-span-3"><p className="text-xs text-gray-500 italic">Ces informations déclaratives ont un impact sur l'estimation. Elles seront vérifiées lors d'une visite.</p></div>
                    </div>
                </div>

            </div>

            {/* --- Right Column --- */}
            <div className="space-y-8">
                 {/* Reliability */}
                <div className="bg-white p-6 rounded-lg shadow-md border"><h3 className="text-xl font-semibold text-laforet-primary mb-4">Fiabilité de l'estimation</h3>
                    <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium text-gray-700">Indice de fiabilité</span><span className={`text-lg font-bold ${reliabilityInfo.textColor}`}>{reliability_score.toFixed(0)}%</span></div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`${reliabilityInfo.color} h-2.5 rounded-full`} style={{ width: `${reliability_score}%` }}></div></div>
                        <p className="text-xs text-gray-600 mt-2"><span className={`font-semibold ${reliabilityInfo.textColor}`}>{reliabilityInfo.text}</span>. Une visite sur place est indispensable pour une évaluation précise.</p>
                    </div>
                </div>
                {/* Price per m² */}
                <div className="bg-white p-6 rounded-lg shadow-md border"><h3 className="text-xl font-semibold text-laforet-primary mb-4">Prix au m²</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-baseline"><p className="text-gray-600">Prix de votre bien :</p><p className="font-bold text-lg text-laforet-primary">{formatCurrency(price_m2_estimated)}/m²</p></div>
                        <div className="flex justify-between items-baseline"><p className="text-gray-600">Prix moyen du secteur :</p><p className="font-bold text-lg">{formatCurrency(price_m2_sector)}/m²</p></div>
                        <div className="flex justify-between items-center border-t pt-3 mt-2"><p className="text-gray-600">Tendance sur 12 mois :</p><div className="flex items-center"><TrendIcon trend={sector_trend_12m} /><span className="ml-2 font-semibold capitalize">{sector_trend_12m}</span></div></div>
                    </div>
                </div>
                 {/* How it's calculated */}
                <div className="bg-white p-6 rounded-lg shadow-md border"><h3 className="text-xl font-semibold text-laforet-primary mb-4">Comment est calculée cette estimation ?</h3>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                        <li>Analyse des dernières ventes dans votre quartier.</li>
                        <li>Prise en compte des caractéristiques uniques de votre bien.</li>
                        <li>Intégration des tendances récentes du marché immobilier local.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* --- CTAs --- */}
        <div className="mt-12 p-8 bg-laforet-accent text-white rounded-lg text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Pour une estimation précise, rien ne remplace l'œil de l'expert.</h3>
            <p className="mb-6 max-w-2xl mx-auto">Notre algorithme vous donne une excellente première idée, mais seuls nos conseillers peuvent évaluer sur place les atouts uniques de votre bien (luminosité, état réel, vue, potentiel...) qui font toute la différence.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={mailtoHref} className="bg-white text-laforet-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block">Demander une estimation professionnelle</a>
                <button onClick={onNewEstimation} className="bg-transparent border border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-laforet-accent transition-all duration-300">
                    Faire une nouvelle estimation
                </button>
            </div>
            <p className="text-sm mt-4 text-blue-100">Gratuit et sans engagement</p>
        </div>
    </div>
  );
};

export default EstimationResultDisplay;