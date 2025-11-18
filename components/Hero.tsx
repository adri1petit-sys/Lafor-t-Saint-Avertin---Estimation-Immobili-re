import React from 'react';

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop";
const AGENCY_SLOGAN = "Respirez, vous passez par Laforêt Saint-Avertin.";

interface HeroProps {
  onGetEstimationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetEstimationClick }) => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-20 md:py-28"
      style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Quel est le vrai prix de votre bien en Touraine ?
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          {AGENCY_SLOGAN}
        </p>
        <button
          onClick={onGetEstimationClick}
          className="bg-laforet-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Obtenir mon estimation en 2 minutes
        </button>
      </div>
    </section>
  );
};

export default Hero;
