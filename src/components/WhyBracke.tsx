import React from 'react';
import { WhyUsPoint } from '../types/types';

const WHY_US_POINTS: WhyUsPoint[] = [
  {
    title: "Agence familiale",
    description: "Une équipe familiale implantée au cœur de Saint-Avertin, dédiée à un rayon de 5 km autour de la ville."
  },
  {
    title: "N°1 de la confiance",
    description: "Laforêt, réseau immobilier n°1 de la confiance depuis 2010, au service des propriétaires de Touraine."
  },
  {
    title: "Expertise locale",
    description: "Connaissance fine des micro-secteurs de Saint-Avertin, Chambray-lès-Tours, Tours-Sud, Larçay, Veigné et Esvres-sur-Indre."
  },
  {
    title: "Marketing premium",
    description: "Photos professionnelles, vidéos et diffusion digitale optimisée pour valoriser chaque maison et appartement."
  }
];

// Simple icons for demonstration
const icons = [
    (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>),
    (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>),
    (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>),
];

const WhyBracke: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-laforet-primary">
            Pourquoi choisir Laforêt Saint-Avertin ?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Une approche humaine et une expertise locale pour concrétiser votre projet immobilier en toute sérénité.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_US_POINTS.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-laforet-accent text-white rounded-full p-4">
                     <Icon className="w-8 h-8"/>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-laforet-primary mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBracke;