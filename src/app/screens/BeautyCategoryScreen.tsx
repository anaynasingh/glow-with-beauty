import React, { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import beautyAtHomePhoto from "../../images/beautyathome-photo.png";

// Top categories for horizontal scroll
const categoriesTop = [
  "Waxing",
  "Facial",
  "Korean Facial",
  "Clean Up",
  "Mani Pedi",
  "Threading & Face Wax",
  "Detan & Bleach",
  "Head Massage",
  "Nail Art",
  "Haircut & Style",
];

// Example sectioned data (all images replaced with beautyAtHomePhoto)
const sections = [
  {
    key: "Waxing",
    title: "Waxing",
    services: [
      {
        id: 1,
        name: "Full Arms Waxing",
        rating: 4.8,
        reviews: 120,
        price: 599,
        duration: "45 mins",
        desc: ["Rica/normal wax options", "Experienced professionals"],
        image: beautyAtHomePhoto,
        options: 4,
      },
      {
        id: 2,
        name: "Full Legs Waxing",
        rating: 4.7,
        reviews: 98,
        price: 699,
        duration: "50 mins",
        desc: ["Painless experience", "Long-lasting results"],
        image: beautyAtHomePhoto,
        options: 3,
      },
    ],
  },
  {
    key: "Facial",
    title: "Facial",
    services: [
      {
        id: 3,
        name: "Gold Facial",
        rating: 4.9,
        reviews: 210,
        price: 999,
        duration: "60 mins",
        desc: ["Glow & radiance", "Premium products"],
        image: beautyAtHomePhoto,
        options: 5,
      },
      {
        id: 4,
        name: "Korean Facial",
        rating: 4.8,
        reviews: 80,
        price: 1299,
        duration: "70 mins",
        desc: ["Glass skin effect", "Hydrating routine"],
        image: beautyAtHomePhoto,
        options: 2,
      },
    ],
  },
  {
    key: "Nail Art",
    title: "Nail Art",
    catalogue: {
      heading: "Long lasting gel polish",
      link: "Catalogue",
      items: [
        {
          id: 5,
          tag: "NO LENGTH INCREASE",
          name: "Gel Polish - Hands",
          rating: 4.7,
          reviews: 60,
          price: 799,
          desc: ["Chip-resistant", "Glossy finish"],
          image: beautyAtHomePhoto,
          options: 6,
        },
        {
          id: 6,
          tag: "NO LENGTH INCREASE",
          name: "Gel Polish - Feet",
          rating: 4.6,
          reviews: 45,
          price: 699,
          desc: ["Quick dry", "Vibrant colors"],
          image: beautyAtHomePhoto,
          options: 4,
        },
      ],
    },
    services: [],
  },
  {
    key: "Haircut & Style",
    title: "Haircut & Style",
    services: [
      {
        id: 7,
        name: "Layered Haircut",
        rating: 4.9,
        reviews: 150,
        price: 799,
        duration: "40 mins",
        desc: ["Trendy styles", "Expert stylists"],
        image: beautyAtHomePhoto,
        options: 3,
      },
    ],
  },
];

export default function BeautyCategoryScreen({
  onBack,
}: {
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to section on tile click
  const handleCategoryClick = (idx: number) => {
    setSelected(idx);
    const ref = sectionRefs.current[idx];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      <div className="px-6 pt-6 flex items-center">
        {onBack && (
          <button onClick={onBack} className="mr-2 text-[#6C4AB6]">
            &#8592;
          </button>
        )}
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          Salon For Women
        </h2>
      </div>
      {/* Horizontal category tile strip */}
      <div className="px-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {categoriesTop.map((cat, idx) => (
            <button
              key={cat}
              className={`flex flex-col items-center min-w-[72px] focus:outline-none ${selected === idx ? "border-b-2 border-[#6C4AB6]" : ""}`}
              onClick={() => handleCategoryClick(idx)}
            >
              <div
                className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${selected === idx ? "border-[#6C4AB6]" : "border-gray-200"}`}
              >
                <ImageWithFallback
                  src={
                    sections[idx]?.services[0]?.image ||
                    sections[idx]?.catalogue?.items[0]?.image ||
                    ""
                  }
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-center mt-1 whitespace-nowrap">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Sectioned service list */}
      <div className="mt-6">
        {sections.map((section, idx) => (
          <div
            key={section.key}
            ref={el => { sectionRefs.current[idx] = el; }}
            className="mb-8"
          >
            <Separator className="mb-4" />
            <h3 className="text-lg font-semibold mb-2 px-6">{section.title}</h3>
            {/* Catalogue block for Nail Art */}
            {section.catalogue && (
              <div className="bg-[#F5F3FF] rounded-xl mx-4 mb-4 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-base">
                    {section.catalogue.heading}
                  </span>
                  <a
                    href="#"
                    className="text-[#6C4AB6] text-xs flex items-center gap-1"
                  >
                    {section.catalogue.link} <span>↗</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {section.catalogue.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center bg-white rounded-lg shadow p-3"
                    >
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-1 text-[10px]">
                          {item.tag}
                        </Badge>
                        <div className="font-semibold text-sm mb-1">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs mb-1">
                          <span>⭐ {item.rating}</span>
                          <span className="text-gray-400">
                            ({item.reviews} reviews)
                          </span>
                        </div>
                        <div className="text-xs mb-1">
                          Starts at ₹{item.price}
                        </div>
                        <ul className="text-xs text-gray-500 list-disc ml-4 mb-1">
                          {item.desc.map((d: string, i: number) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                        <a href="#" className="text-[#6C4AB6] text-xs">
                          View details &gt;
                        </a>
                      </div>
                      <div className="flex flex-col items-center ml-4">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover mb-2"
                        />
                        <Button variant="outline" size="sm">
                          Add
                        </Button>
                        <span className="text-[10px] text-gray-400 mt-1">
                          {item.options} options
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Normal service cards */}
            <div className="flex flex-col gap-4 px-6">
              {section.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center bg-white rounded-lg shadow p-3"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">
                      {service.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <span>⭐ {service.rating}</span>
                      <span className="text-gray-400">
                        ({service.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-xs mb-1">
                      ₹{service.price} • {service.duration}
                    </div>
                    <ul className="text-xs text-gray-500 list-disc ml-4 mb-1">
                      {service.desc.map((d: string, i: number) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <a href="#" className="text-[#6C4AB6] text-xs">
                      Show more &gt;
                    </a>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-16 rounded-lg object-cover mb-2"
                    />
                    <Button variant="outline" size="sm">
                      Add
                    </Button>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {service.options} options
                    </span>
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


