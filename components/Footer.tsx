
import React from 'react';

const AGENCY_NAME = "Laforêt Saint-Avertin";
const AGENCY_CONTACT_EMAIL = "saint-avertin@laforet.com";
const AGENCY_CONTACT_PHONE = "02 46 46 63 80";
const AGENCY_FOUNDING_YEAR = "2023";
const LEGAL_MENTIONS_URL = "/mentions-legales";
const PRIVACY_POLICY_URL = "/politique-de-confidentialite";
const SOCIAL_MEDIA_LINKS = {
  facebook: "https://www.facebook.com/laforet.saintavertin",
  instagram: "https://www.instagram.com/laforet_saintavertin"
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-laforet-primary text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4 border-b-2 border-laforet-accent pb-2">{AGENCY_NAME}</h3>
            <p>Agence immobilière familiale.</p>
            <p>Respirez, vous passez par Laforêt.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4 border-b-2 border-laforet-accent pb-2">Contact</h3>
            <p>
              <a href={`mailto:${AGENCY_CONTACT_EMAIL}`} className="hover:text-laforet-accent transition-colors">{AGENCY_CONTACT_EMAIL}</a>
            </p>
            <p>
              <a href={`tel:${AGENCY_CONTACT_PHONE.replace(/\s/g, '')}`} className="hover:text-laforet-accent transition-colors">{AGENCY_CONTACT_PHONE}</a>
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4 border-b-2 border-laforet-accent pb-2">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href={SOCIAL_MEDIA_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-laforet-accent transition-colors">
                Facebook
              </a>
              <a href={SOCIAL_MEDIA_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-laforet-accent transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} {AGENCY_NAME} (Depuis {AGENCY_FOUNDING_YEAR}). Tous droits réservés.</p>
          <div className="mt-2">
            <a href={LEGAL_MENTIONS_URL} className="hover:text-white mx-2">Mentions Légales</a>
            <span>|</span>
            <a href={PRIVACY_POLICY_URL} className="hover:text-white mx-2">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
