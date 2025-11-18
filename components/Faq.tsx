
import React, { useState } from 'react';
import { FaqItem } from '../types';

const FAQ_DATA: FaqItem[] = [
  {
    question: "Comment est calculée mon estimation en ligne ?",
    answer: "Nous combinons les caractéristiques de votre bien (surface, adresse, état, prestations, environnement) avec des données de marché locales (ventes récentes, prix moyens par micro-secteur, tendance du marché) afin de proposer une première fourchette de valeur."
  },
  {
    question: "Pourquoi l’indice de fiabilité est-il limité ?",
    answer: "Une estimation en ligne ne peut pas mesurer précisément la luminosité, la vue, l’état réel, le ressenti des volumes ou la qualité des prestations. C’est pourquoi nous limitons volontairement l’indice de fiabilité et recommandons une visite à domicile."
  },
  {
    question: "L’estimation est-elle vraiment gratuite et sans engagement ?",
    answer: "Oui. L’estimation en ligne, comme l’avis de valeur réalisé à domicile par un conseiller Laforêt Saint-Avertin, est entièrement gratuite et sans aucun engagement de votre part."
  },
  {
    question: "Intervenez-vous uniquement à Saint-Avertin ?",
    answer: "Nous intervenons prioritairement sur Saint-Avertin, Chambray-lès-Tours, Tours-Sud, Larçay, Veigné et Esvres-sur-Indre. Pour un bien en dehors de ces communes, nous pouvons étudier votre projet au cas par cas."
  }
];

const FaqAccordion: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full text-left py-4 px-2 flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg font-medium text-laforet-primary">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-laforet-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="text-gray-600 p-4 pt-0">
          {item.answer}
        </p>
      </div>
    </div>
  );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-laforet-primary mb-12">
          Questions Fréquentes
        </h2>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
          {FAQ_DATA.map((item, index) => (
            <FaqAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
