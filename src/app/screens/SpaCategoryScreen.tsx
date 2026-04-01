import { MapPin } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type SpaCategory = {
  key: string;
  label: string;
  image: string;
};

type SpaShop = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  priceRange: string;
  hasOffer: boolean;
  categories: string[];
  image: string;
  specialties: string;
};

const spaCategories: SpaCategory[] = [
  {
    key: "spa",
    label: "Spa",
    image:
      "https://media.istockphoto.com/photos/spa-and-wellness-setting-picture-id856952970?k=6&m=856952970&s=612x612&w=0&h=lRirZn5e9BAqaNRJ_8yb2PJsHS7fI5AtjAKwijcwnO4=",
  },
  {
    key: "pain-relief",
    label: "Pain Relief",
    image:
      "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2723311.jpg",
  },
  {
    key: "scrubs",
    label: "Skin Care Scrubs",
    image:
      "https://nabilak.com/wp-content/uploads/2018/10/How-to-Use-Body-Scrubs-Correctly-2.jpg",
  },
  {
    key: "post-natal",
    label: "Post Natal",
    image:
      "https://www.burkewilliams.com/hubfs/Benefits-of-a-Postnatal-Postpartum-Massage-Burke-Williams.png",
  },
  {
    key: "add-ons",
    label: "Add-ons",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7GvFImnndba8i6PC9JpGAwU8M7jk1IN5lw&s",
  },
];

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

const spaShops: SpaShop[] = [
  {
    id: 1,
    name: "Tranquil Touch Spa",
    rating: 4.8,
    reviews: 540,
    distance: "3.2 km",
    priceRange: "₹₹₹",
    hasOffer: true,
    categories: ["spa", "add-ons"],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    specialties: "Aromatherapy, Swedish Massage",
  },
  {
    id: 2,
    name: "Serenity Springs Wellness",
    rating: 4.7,
    reviews: 410,
    distance: "6.8 km",
    priceRange: "₹₹",
    hasOffer: false,
    categories: ["pain-relief", "spa"],
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    specialties: "Deep Tissue, Hot Stone Therapy",
  },
  {
    id: 3,
    name: "Lotus Calm Retreat",
    rating: 4.9,
    reviews: 620,
    distance: "11.5 km",
    priceRange: "₹₹₹",
    hasOffer: true,
    categories: ["post-natal", "scrubs"],
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    specialties: "Post Natal Care, Detox Rituals",
  },
  {
    id: 4,
    name: "Urban Zen Therapy Spa",
    rating: 4.6,
    reviews: 298,
    distance: "18.1 km",
    priceRange: "₹₹",
    hasOffer: false,
    categories: ["pain-relief", "add-ons"],
    image:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80",
    specialties: "Pain Relief, Reflexology",
  },
];

const priceScore = (priceRange: string) => priceRange.replace(/[^₹]/g, "").length;

export default function SpaCategoryScreen({ onBack }: { onBack?: () => void }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showOffers, setShowOffers] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(15);

  const selectedCategoryKey = spaCategories[selectedCategoryIndex]?.key;

  const toggleFilter = (filter: string) => {
    if (filter === "Offers") {
      setShowOffers(!showOffers);
      return;
    }

    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredShops = spaShops.filter((shop) => {
    if (!shop.categories.includes(selectedCategoryKey)) return false;

    const km = parseFloat(shop.distance);
    if (km > distanceFilter) return false;

    if (showOffers && !shop.hasOffer) return false;
    if (selectedFilters.includes("Popular") && shop.rating < 4.5) return false;
    if (selectedFilters.includes("Best Rated") && shop.rating < 4.7) return false;
    if (selectedFilters.includes("Trending") && (shop.rating < 4.6 || shop.reviews < 300)) {
      return false;
    }
    if (selectedFilters.includes("Affordable") && shop.priceRange.includes("₹₹₹")) {
      return false;
    }
    if (selectedFilters.includes("Luxury") && !shop.priceRange.includes("₹₹₹")) {
      return false;
    }
    if (selectedFilters.includes("Quick Service") && km > 6) return false;
    if (selectedFilters.includes("Reviews") && shop.reviews < 250) return false;

    return true;
  });

  const displayedShops = selectedFilters.includes("Price: Low to High")
    ? [...filteredShops].sort((a, b) => priceScore(a.priceRange) - priceScore(b.priceRange))
    : filteredShops;

  return (
    <div className="pb-20 bg-white min-h-screen">
      <div className="px-4 pt-6">
        <div className="flex items-center mb-4">
          {onBack && (
            <button onClick={onBack} className="mr-2 text-[#6C4AB6]">
              &#8592;
            </button>
          )}
          <h2 className="text-2xl font-bold text-[#1F1F1F]">Spa Services</h2>
        </div>
      </div>

      <div className="px-4 mb-2 sticky top-0 z-10 bg-white">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {spaCategories.map((cat, idx) => (
            <button
              key={cat.key}
              className={`flex flex-col items-center min-w-[72px] focus:outline-none ${
                selectedCategoryIndex === idx ? "border-b-2 border-[#6C4AB6]" : ""
              }`}
              onClick={() => setSelectedCategoryIndex(idx)}
            >
              <div
                className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${
                  selectedCategoryIndex === idx ? "border-[#6C4AB6]" : "border-gray-200"
                }`}
              >
                <ImageWithFallback src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-xs text-center mt-1 whitespace-nowrap ${
                  selectedCategoryIndex === idx ? "text-[#6C4AB6] font-semibold" : "text-gray-700"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-2 overflow-x-auto scrollbar-hide">
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

      <div className="px-6 pb-6">
        <h3 className="text-lg font-bold text-[#1F1F1F] mb-3">Spa Shops Near You ({displayedShops.length})</h3>

        {displayedShops.length === 0 ? (
          <p className="text-sm text-[#8A8A8A]">No spa shops match current filters.</p>
        ) : (
          <div className="space-y-3">
            {displayedShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white border-2 border-[#E0D9F0] rounded-xl p-3"
                style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
              >
                <div className="flex gap-3">
                  <ImageWithFallback src={shop.image} alt={shop.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[#1F1F1F]">{shop.name}</h4>
                    <p className="text-xs text-[#8A8A8A] mt-1">⭐ {shop.rating} ({shop.reviews} reviews)</p>
                    <p className="text-xs text-[#8A8A8A]">{shop.distance} • {shop.priceRange}</p>
                    <p className="text-xs text-[#6C4AB6] mt-1">{shop.specialties}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
