import React from "react";
import { ServiceCard } from "../components/ServiceCard";
import { useLanguage } from "../i18n/LanguageContext";
import { services } from "../data/mockData";

// Example mock data for beauty services and cards (replace with real data as needed)
const beautyServices = [
  { name: "Waxing", image: services.find(s => s.name.toLowerCase().includes("waxing"))?.image },
  { name: "Facial", image: services.find(s => s.name.toLowerCase().includes("facial"))?.image },
  { name: "Korean Facial", image: services.find(s => s.name.toLowerCase().includes("korean"))?.image },
  { name: "Clean Up", image: services.find(s => s.name.toLowerCase().includes("clean"))?.image },
  { name: "Mani Pedi", image: services.find(s => s.name.toLowerCase().includes("mani"))?.image },
  { name: "Threading & Face Wax", image: services.find(s => s.name.toLowerCase().includes("thread"))?.image },
  { name: "Detan & Bleach", image: services.find(s => s.name.toLowerCase().includes("bleach"))?.image },
  { name: "Head Massage", image: services.find(s => s.name.toLowerCase().includes("massage"))?.image },
  { name: "Nail Art", image: services.find(s => s.name.toLowerCase().includes("nail art"))?.image },
  { name: "Haircut & Style", image: services.find(s => s.name.toLowerCase().includes("haircut"))?.image },
];

export default function BeautyCategoryScreen({ onBack }: { onBack?: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      <div className="px-6 pt-6 flex items-center">
        {onBack && (
          <button onClick={onBack} className="mr-2 text-[#6C4AB6]">&#8592;</button>
        )}
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Salon For Women</h2>
      </div>
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-base font-medium mb-4">What service do you need ?</h3>
          <div className="grid grid-cols-5 gap-4">
            {beautyServices.map((svc) => (
              <div key={svc.name} className="flex flex-col items-center">
                <img src={svc.image || ""} alt={svc.name} className="w-14 h-14 rounded-lg object-cover mb-1" />
                <span className="text-xs text-center mt-1">{svc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Example: Waxing section */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Waxing</h3>
        {/* ...service cards for waxing... */}
      </div>
      {/* Example: Facial section */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Facial</h3>
        {/* ...service cards for facial... */}
      </div>
      {/* Example: Haircut & Style section */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Haircut & Style</h3>
        {/* ...service cards for haircut & style... */}
      </div>
    </div>
  );
}
