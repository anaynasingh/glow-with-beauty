import React, { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
const spaPhoto = "https://media.istockphoto.com/photos/spa-and-wellness-setting-picture-id856952970?k=6&m=856952970&s=612x612&w=0&h=lRirZn5e9BAqaNRJ_8yb2PJsHS7fI5AtjAKwijcwnO4=";

const spaCategories = [
  { key: "spa", label: "Spa", image: spaPhoto },
  { key: "pain-relief", label: "Pain Relief", image: spaPhoto },
  { key: "scrubs", label: "Skin Care Scrubs", image: spaPhoto },
  { key: "post-natal", label: "Post Natal", image: spaPhoto },
  { key: "add-ons", label: "Add-ons", image: spaPhoto },
];

const spaSections = [
  {
    key: "spa",
    title: "Spa",
    services: [
      {
        id: 1,
        name: "Swedish Massage",
        rating: 4.8,
        reviews: 1200,
        price: 1499,
        duration: "60 mins",
        desc: ["Relieves deep muscle tension", "Improves blood circulation"],
        image: spaPhoto,
        options: 4,
      },
      {
        id: 2,
        name: "Deep Tissue Massage",
        rating: 4.7,
        reviews: 980,
        price: 1599,
        duration: "60 mins",
        desc: ["Targets deeper muscle layers", "Reduces stiffness"],
        image: spaPhoto,
        options: 3,
      },
      {
        id: 3,
        name: "Back & Neck Massage",
        rating: 4.6,
        reviews: 800,
        price: 1299,
        duration: "45 mins",
        desc: ["Relieves back and neck pain", "Reduces tension"],
        image: spaPhoto,
        options: 2,
      },
      {
        id: 4,
        name: "Stress Relief Massage",
        rating: 4.8,
        reviews: 1100,
        price: 1399,
        duration: "50 mins",
        desc: ["Reduces stress", "Promotes relaxation"],
        image: spaPhoto,
        options: 2,
      },
    ],
  },
  {
    key: "pain-relief",
    title: "Pain Relief",
    services: [
      {
        id: 5,
        name: "Deep Tissue Pain Relief Massage",
        rating: 4.9,
        reviews: 900,
        price: 1699,
        duration: "60 mins",
        desc: ["Pain relief for deep muscle", "Improves flexibility"],
        image: spaPhoto,
        options: 2,
      },
      {
        id: 6,
        name: "Leg Pain Relief Massage",
        rating: 4.7,
        reviews: 700,
        price: 1299,
        duration: "45 mins",
        desc: ["Relieves leg pain", "Reduces swelling"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 7,
        name: "Back Pain Relief Massage",
        rating: 4.8,
        reviews: 850,
        price: 1399,
        duration: "50 mins",
        desc: ["Targets back pain", "Improves posture"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 8,
        name: "Shoulder Pain Relief Massage",
        rating: 4.7,
        reviews: 600,
        price: 1199,
        duration: "40 mins",
        desc: ["Relieves shoulder tension", "Increases mobility"],
        image: spaPhoto,
        options: 1,
      },
    ],
  },
  {
    key: "scrubs",
    title: "Skin Care Scrubs",
    services: [
      {
        id: 9,
        name: "Full Body Scrub",
        rating: 4.8,
        reviews: 500,
        price: 1599,
        duration: "60 mins",
        desc: ["Exfoliates dead skin", "Hydrates and brightens"],
        image: spaPhoto,
        options: 2,
      },
      {
        id: 10,
        name: "Back Scrub",
        rating: 4.6,
        reviews: 300,
        price: 999,
        duration: "30 mins",
        desc: ["Removes impurities", "Smoothens skin"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 11,
        name: "Coffee Scrub",
        rating: 4.7,
        reviews: 350,
        price: 1099,
        duration: "35 mins",
        desc: ["Reduces cellulite", "Improves skin texture"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 12,
        name: "Tan Removal Scrub",
        rating: 4.8,
        reviews: 400,
        price: 1199,
        duration: "40 mins",
        desc: ["Removes tan", "Restores natural glow"],
        image: spaPhoto,
        options: 1,
      },
    ],
  },
  {
    key: "post-natal",
    title: "Post Natal",
    services: [
      {
        id: 13,
        name: "Post Natal Body Massage",
        rating: 4.9,
        reviews: 200,
        price: 1799,
        duration: "70 mins",
        desc: ["Supports recovery", "Relieves muscle pain"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 14,
        name: "Lactation Support Massage",
        rating: 4.8,
        reviews: 150,
        price: 1499,
        duration: "60 mins",
        desc: ["Improves milk flow", "Reduces discomfort"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 15,
        name: "C-section Recovery Massage",
        rating: 4.7,
        reviews: 100,
        price: 1599,
        duration: "60 mins",
        desc: ["Aids scar healing", "Reduces swelling"],
        image: spaPhoto,
        options: 1,
      },
    ],
  },
  {
    key: "add-ons",
    title: "Add-ons",
    services: [
      {
        id: 16,
        name: "Head Massage",
        rating: 4.8,
        reviews: 600,
        price: 499,
        duration: "20 mins",
        desc: ["Relieves headache", "Boosts relaxation"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 17,
        name: "Foot Massage",
        rating: 4.7,
        reviews: 550,
        price: 599,
        duration: "25 mins",
        desc: ["Improves blood flow", "Reduces fatigue"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 18,
        name: "Neck Massage",
        rating: 4.6,
        reviews: 400,
        price: 499,
        duration: "20 mins",
        desc: ["Relieves neck tension", "Improves mobility"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 19,
        name: "Shoulder Massage",
        rating: 4.7,
        reviews: 420,
        price: 599,
        duration: "25 mins",
        desc: ["Reduces shoulder pain", "Increases flexibility"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 20,
        name: "Steam Therapy",
        rating: 4.8,
        reviews: 300,
        price: 399,
        duration: "15 mins",
        desc: ["Opens pores", "Detoxifies skin"],
        image: spaPhoto,
        options: 1,
      },
      {
        id: 21,
        name: "Express Massage",
        rating: 4.7,
        reviews: 350,
        price: 399,
        duration: "15 mins",
        desc: ["Quick relaxation", "Reduces stress"],
        image: spaPhoto,
        options: 1,
      },
    ],
  },
];

export default function SpaCategoryScreen({ onBack }: { onBack?: () => void }) {
  const [selected, setSelected] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCategoryClick = (idx: number) => {
    setSelected(idx);
    const ref = sectionRefs.current[idx];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header & Search */}
      <div className="px-4 pt-6">
        <div className="flex items-center mb-4">
          {onBack && (
            <button onClick={onBack} className="mr-2 text-[#6C4AB6]">&#8592;</button>
          )}
          <h2 className="text-2xl font-bold text-[#1F1F1F]">Spa for Women</h2>
        </div>
        <div className="w-full mb-4">
          <div className="flex items-center bg-[#f5f5f5] rounded-lg px-4 py-2">
            <span className="material-icons text-gray-400 mr-2">search</span>
            <input
              type="text"
              placeholder="Search for services"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      </div>
      {/* Horizontal category tile strip */}
      <div className="px-4 mb-2 sticky top-0 z-10 bg-white">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {spaCategories.map((cat, idx) => (
            <button
              key={cat.key}
              className={`flex flex-col items-center min-w-[72px] focus:outline-none ${selected === idx ? "border-b-2 border-[#6C4AB6]" : ""}`}
              onClick={() => handleCategoryClick(idx)}
            >
              <div className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${selected === idx ? "border-[#6C4AB6]" : "border-gray-200"}`}>
                <ImageWithFallback src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span className={`text-xs text-center mt-1 whitespace-nowrap ${selected === idx ? "text-[#6C4AB6] font-semibold" : "text-gray-700"}`}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Sectioned service list */}
      <div className="mt-2">
        {spaSections.map((section, idx) => (
          <div key={section.key} ref={el => { sectionRefs.current[idx] = el; }} className="mb-8">
            <Separator className="mb-4" />
            <h3 className="text-xl font-bold mb-2 px-6">{section.title}</h3>
            <div className="flex flex-col gap-4 px-6">
              {section.services.map(service => (
                <div key={service.id} className="flex items-center py-4 border-b border-[#f0f0f0]">
                  <div className="flex-1 pr-4">
                    <div className="font-semibold text-base mb-1">{service.name}</div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span>⭐ {service.rating}</span>
                      <span className="ml-1">({service.reviews} reviews)</span>
                    </div>
                    <div className="text-sm font-semibold mb-1">₹{service.price} <span className="font-normal text-gray-400">• {service.duration}</span></div>
                    <ul className="text-xs text-gray-500 list-disc ml-4 mb-1">
                      {service.desc.map((d: string, i: number) => <li key={i}>{d}</li>)}
                    </ul>
                    <a href="#" className="text-[#6C4AB6] text-xs">View details &gt;</a>
                  </div>
                  <div className="flex flex-col items-center min-w-[100px]">
                    <ImageWithFallback src={service.image} alt={service.name} className="w-20 h-20 rounded-lg object-cover mb-2" />
                    <Button variant="outline" size="sm">Add</Button>
                    {service.options > 1 && <span className="text-[10px] text-gray-400 mt-1">{service.options} options</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
