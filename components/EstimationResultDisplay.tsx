
import React from 'react';
import { EstimationResult, EstimationFormData } from '../types';

interface EstimationResultDisplayProps {
  result: EstimationResult;
  formData: EstimationFormData;
}

const AGENCY_CONTACT_EMAIL = "saint-avertin@laforet.com";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const ReliabilityGauge: React.FC<{ value: number }> = ({ value }) => {
    const percentage = Math.min(Math.max(value, 0), 100);
    const color = percentage < 50 ? 'text-red-500' : 'text-yellow-500';

    return (
        <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Indice de fiabilité</span>
                <span className={`text-lg font-bold ${color}`}>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
             <p className="text-xs text-gray-500 mt-2">{result.commentaireFiabilite}</p>
        </div>
    );
};

let result: EstimationResult; // temporary hack to access in gauge

const EstimationResultDisplay: React.FC<EstimationResultDisplayProps> = (props) => {
    result = props.result;
    const { formData } = props;
    const { estimation, analyseEnvironnement } = result;
    
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
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-laforet-primary">Votre estimation pour le bien situé à :</h2>
            <p className="text-xl text-gray-700">{formData.address}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-8">
            <div className="p-6 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500">Fourchette basse</p>
                <p className="text-2xl font-bold text-gray-700">{formatCurrency(estimation.basse)}</p>
            </div>
            <div className="p-8 bg-laforet-primary text-white rounded-lg shadow-lg transform md:scale-110">
                <p className="text-lg">Estimation moyenne</p>
                <p className="text-4xl font-extrabold">{formatCurrency(estimation.moyenne)}</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500">Fourchette haute</p>
                <p className="text-2xl font-bold text-gray-700">{formatCurrency(estimation.haute)}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-laforet-primary mb-3">Analyse de l'environnement</h3>
                <p className="text-gray-600">{analyseEnvironnement}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold text-laforet-primary mb-3">Fiabilité de l'estimation</h3>
                <ReliabilityGauge value={estimation.indiceFiabilite} />
            </div>
        </div>
        
        <div className="mt-12 p-8 bg-laforet-accent text-white rounded-lg text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Pour une estimation précise, rien ne remplace l'œil de l'expert.</h3>
            <p className="mb-6 max-w-2xl mx-auto">
                Notre algorithme vous donne une excellente première idée, mais seuls nos conseillers peuvent évaluer sur place les atouts uniques de votre bien (luminosité, état réel, vue, potentiel...) qui font toute la différence.
            </p>
            <a 
                href={mailtoHref}
                className="bg-white text-laforet-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block"
            >
                Demander une estimation professionnelle
            </a>
            <p className="text-sm mt-4 text-blue-100">Gratuit et sans engagement</p>
        </div>
    </div>
  );
};

export default EstimationResultDisplay;
