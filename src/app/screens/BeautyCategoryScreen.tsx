import React, { useRef, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { salons } from "../data/mockData";
import { SalonCard } from "../components/SalonCard";
import { MapPin } from "lucide-react";

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

const serviceToSalonIds: Record<string, number[]> = {
  "Waxing": [1, 2, 5],
  "Facial": [1, 2, 5],
  "Korean Facial": [1, 5],
  "Clean Up": [1, 2, 6],
  "Mani Pedi": [1, 2, 5],
  "Threading & Face Wax": [2, 5],
  "Detan & Bleach": [1, 5, 6],
  "Head Massage": [3, 4, 6],
  "Nail Art": [1, 5],
  "Haircut & Style": [1, 3, 4, 6],
};

const serviceToKeywords: Record<string, string[]> = {
  "Waxing": ["wax"],
  "Facial": ["facial"],
  "Korean Facial": ["facial"],
  "Clean Up": ["facial", "cleanup", "clean up", "clean-up"],
  "Mani Pedi": ["manicure", "pedicure", "mani", "pedi"],
  "Threading & Face Wax": ["thread", "wax"],
  "Detan & Bleach": ["detan", "bleach", "facial"],
  "Head Massage": ["massage"],
  "Nail Art": ["nail"],
  "Haircut & Style": ["haircut", "style", "hair"],
};

const categoryImages: Record<string, string> = {
  "Waxing": "data:image/webp;base64,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",
  "Facial": "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&w=500&q=80",
  "Korean Facial": "https://th.bing.com/th/id/OIP.zMxg3CSXmuOJ0wARSHOP-wHaEK?w=317&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "Clean Up": "https://th.bing.com/th/id/OIP.o-D23Uy7dpbSH7_cAIX4sAHaE8?w=262&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "Mani Pedi": "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?auto=format&fit=crop&w=500&q=80",
  "Threading & Face Wax": "https://th.bing.com/th/id/OIP.royKPPgkcLxz0U6V3wqkiQHaEy?w=251&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "Detan & Bleach": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80",
  "Head Massage": "https://th.bing.com/th/id/OIP.aZmCZlceI-NEe91TppKMnQHaEw?w=248&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "Nail Art": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=500&q=80",
  "Haircut & Style": "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?auto=format&fit=crop&w=500&q=80",
};

interface BeautyCategoryScreenProps {
  onBack?: () => void;
  onSalonClick?: (salonId: number) => void;
}

export default function BeautyCategoryScreen({
  onBack,
  onSalonClick,
}: BeautyCategoryScreenProps) {
  const [selected, setSelected] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState(15);
  const [showOffers, setShowOffers] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filterCategories = [
    "Popular",
    "Best Rated",
    "Price: Low to High",
    "Trending",
    "Affordable",
    "Luxury",
    "Quick Service",
    "Reviews",
    "Offers",
  ];

  const toggleFilter = (filter: string) => {
    if (filter === "Offers") {
      setShowOffers(!showOffers);
    } else {
      setSelectedFilters(prev =>
        prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
      );
    }
  };

  // Filter salons based on selected service and filters
  const filteredSalons = salons.filter(salon => {
    const salonDistanceNum = parseFloat(salon.distance);
    if (salonDistanceNum > distanceFilter) return false;

    if (showOffers && !salon.offer) return false;

    // Filter by selected service
    if (selectedService) {
      const linkedSalonIds = serviceToSalonIds[selectedService] || [];
      const serviceKeywords = serviceToKeywords[selectedService] || [];

      const hasKeywordMatch = salon.services?.some((s) =>
        serviceKeywords.some((keyword) => s.name.toLowerCase().includes(keyword.toLowerCase()))
      );

      const hasService = Boolean(hasKeywordMatch) || linkedSalonIds.includes(salon.id);
      if (!hasService) return false;
    }

    // Filter by selected filter categories
    if (selectedFilters.length > 0) {
      if (selectedFilters.includes("Popular") && salon.rating < 4.5) return false;
      if (selectedFilters.includes("Best Rated") && salon.rating < 4.7) return false;
      if (selectedFilters.includes("Trending")) {
        // Trending salons with high ratings and reviews
        if (salon.rating < 4.6 || salon.reviewCount < 100) return false;
      }
      if (selectedFilters.includes("Affordable")) {
        if (!salon.priceRange.includes("₹") || salon.priceRange.includes("₹₹₹₹")) return false;
      }
      if (selectedFilters.includes("Luxury")) {
        if (salon.rating < 4.7 || !salon.priceRange.includes("₹₹₹")) return false;
      }
      if (selectedFilters.includes("Quick Service")) {
        if (salonDistanceNum > 5) return false;
      }
      if (selectedFilters.includes("Reviews") && salon.reviewCount < 50) return false;
    }

    return true;
  });

  const priceScore = (priceRange: string) => priceRange.replace(/[^₹]/g, "").length;

  const displayedSalons = selectedFilters.includes("Price: Low to High")
    ? [...filteredSalons].sort((a, b) => priceScore(a.priceRange) - priceScore(b.priceRange))
    : filteredSalons;

  // Scroll to section on tile click
  const handleCategoryClick = (idx: number) => {
    setSelected(idx);
    setSelectedService(categoriesTop[idx]);
    const ref = sectionRefs.current[0];
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
          Services For Women
        </h2>
      </div>

      {/* Horizontal category tile strip - unchanged */}
      <div className="px-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {categoriesTop.map((cat, idx) => (
            <button
              key={cat}
              className={`flex flex-col items-center min-w-[72px] focus:outline-none ${selected === idx ? "border-b-2 border-[#6C4AB6]" : ""}`}
              onClick={() => handleCategoryClick(idx)}
            >
              <div
                className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${selected === idx ? "border-[#6C4AB6]" : "border-gray-200"} bg-gradient-to-br from-[#F3EEFF] to-[#E0D9F0]`}
              >
                <ImageWithFallback
                  src={categoryImages[cat]}
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

      {/* Filter Chips - Horizontally Scrollable */}
      <div className="px-4 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-2 min-w-max">
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilters.includes(filter) || (filter === "Offers" && showOffers)
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-[#FFF0F5] text-[#FF6B9D] border border-[#FFD9E8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Slider Filter */}
      <div className="px-4 mb-6 bg-[#F8F7FF] rounded-xl p-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-[#1F1F1F]">Distance: {distanceFilter} km</label>
          <MapPin className="w-4 h-4 text-[#6C4AB6]" />
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={distanceFilter}
          onChange={(e) => setDistanceFilter(Number(e.target.value))}
          className="w-full h-1 bg-[#E0D9F0] rounded-lg appearance-none cursor-pointer accent-[#6C4AB6]"
        />
        <div className="flex justify-between text-xs text-[#8A8A8A] mt-2">
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Salons Providing Selected Service */}
      <div className="px-4 mt-6" ref={el => { sectionRefs.current[0] = el; }}>
        <h3 className="text-lg font-bold mb-4 text-[#1F1F1F]">
          {selectedService ? `${selectedService}` : "All Services"} ({displayedSalons.length})
        </h3>

        {displayedSalons.length > 0 ? (
          <div className="space-y-3">
            {displayedSalons.map((salon) => (
              <button
                key={salon.id}
                onClick={() => onSalonClick?.(salon.id)}
                className="w-full text-left active:scale-[0.98] transition-transform"
              >
                <SalonCard
                  name={salon.name}
                  rating={salon.rating}
                  reviewCount={salon.reviewCount}
                  priceRange={salon.priceRange}
                  distance={salon.distance}
                  offer={salon.offer}
                  image={salon.image || ""}
                  onClick={() => onSalonClick?.(salon.id)}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#8A8A8A] mb-2">No salons found</p>
            <p className="text-xs text-[#8A8A8A]">Try adjusting your filters or selecting a different service</p>
          </div>
        )}
      </div>
    </div>
  );
}


