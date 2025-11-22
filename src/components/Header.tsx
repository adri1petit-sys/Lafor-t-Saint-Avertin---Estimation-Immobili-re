import React from 'react';

const AGENCY_NAME = "Laforêt Saint-Avertin";
const AGENCY_CONTACT_PHONE = "02 46 46 63 80";
const LOGO_URL = "https://i.postimg.cc/k4gKks4D/logo-devant-flocage.png";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={LOGO_URL} alt={`Logo ${AGENCY_NAME}`} className="h-12 md:h-16 mr-4" />
        </div>
        <div className="flex items-center space-x-4">
          <a href={`tel:${AGENCY_CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center text-laforet-primary hover:text-laforet-accent transition-colors duration-300">
            <PhoneIcon className="h-5 w-5 mr-2" />
            <span className="hidden md:inline font-semibold">{AGENCY_CONTACT_PHONE}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);


export default Header;