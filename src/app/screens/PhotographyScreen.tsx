import { ChevronLeft, MapPin, Star, Phone, Camera } from "lucide-react";
import { useMemo, useState } from "react";

interface Photographer {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  portfolio: number;
  eventTypes: string[];
  priceRange: string;
}

interface PhotographyScreenProps {
  onBack: () => void;
  onPhotographerClick?: (photographerId: number) => void;
}

const shootTypeChips = [
  { name: "Wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80" },
  { name: "Birthdays", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=500&q=80" },
  { name: "Pre-wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" },
  { name: "Corporate", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=80" },
  { name: "Portraits", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80" },
  { name: "Events", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80" },
];

const filterCategories = [
  "Popular",
  "Best Rated",
  "Price: Low to High",
  "Trending",
  "Budget",
  "Premium",
  "Quick Response",
  "Offers",
];

const photographers: Photographer[] = [
  {
    id: 1,
    name: "Vikram Photography",
    rating: 4.9,
    reviews: 187,
    location: "DLF Cyber City, Gurgaon",
    distance: "8.2 km",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    portfolio: 150,
    eventTypes: ["Weddings", "Pre-wedding", "Events", "Portraits", "Birthdays"],
    priceRange: "₹50,000 - ₹2,00,000",
  },
  {
    id: 2,
    name: "Nitika Clicks",
    rating: 4.8,
    reviews: 142,
    location: "Sector 18, Noida",
    distance: "3.5 km",
    phone: "+91 87654 32109",
    image: "https://img.freepik.com/free-photo/women-photographer-holding-camera-looking-away-indian-pakistani-model_561639-4332.jpg",
    portfolio: 98,
    eventTypes: ["Weddings", "Corporate", "Product", "Fashion"],
    priceRange: "₹30,000 - ₹1,50,000",
  },
  {
    id: 3,
    name: "Arjun's Studio",
    rating: 4.7,
    reviews: 165,
    location: "Connaught Place",
    distance: "12.5 km",
    phone: "+91 76543 21098",
    image: "https://tse2.mm.bing.net/th/id/OIP.MLP5Ohim7Hu6ohgaQu_dXAHaEI?rs=1&pid=ImgDetMain&o=7&rm=3",
    portfolio: 200,
    eventTypes: ["Events", "Candid", "Portraits", "Ceremonies"],
    priceRange: "₹40,000 - ₹1,80,000",
  },
  {
    id: 4,
    name: "Sunita Photography Studio",
    rating: 4.6,
    reviews: 128,
    location: "Nehru Place",
    distance: "10.1 km",
    phone: "+91 65432 10987",
    image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=500&fit=crop",
    portfolio: 120,
    eventTypes: ["Weddings", "Maternity", "Babies", "Family"],
    priceRange: "₹25,000 - ₹1,00,000",
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

const parseMinPrice = (priceRange: string) => {
  const firstAmount = priceRange.split("-")[0]?.replace(/[^\d]/g, "") || "0";
  return Number(firstAmount);
};

export function PhotographyScreen({ onBack, onPhotographerClick }: PhotographyScreenProps) {
  const [selectedShootType, setSelectedShootType] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState(15);
  const [showOffers, setShowOffers] = useState(false);

  const toggleFilter = (filter: string) => {
    if (filter === "Offers") {
      setShowOffers((prev) => !prev);
      return;
    }

    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredPhotographers = useMemo(() => {
    const filtered = photographers.filter((photographer) => {
      const km = parseFloat(photographer.distance);
      if (km > distanceFilter) return false;

      if (showOffers && photographer.rating < 4.8) return false;

      if (selectedShootType) {
        const selected = normalize(selectedShootType);
        const hasType = photographer.eventTypes.some((type) => {
          const normalizedType = normalize(type);
          if (selected === "wedding") return normalizedType.includes("wedding");
          if (selected === "birthdays") return normalizedType.includes("birthday") || normalizedType.includes("babies");
          if (selected === "pre-wedding") return normalizedType.includes("pre-wedding") || normalizedType.includes("wedding");
          return normalizedType.includes(selected);
        });

        if (!hasType) return false;
      }

      if (selectedFilters.includes("Popular") && photographer.rating < 4.7) return false;
      if (selectedFilters.includes("Best Rated") && photographer.rating < 4.8) return false;
      if (selectedFilters.includes("Trending") && (photographer.rating < 4.8 || photographer.reviews < 160)) return false;
      if (selectedFilters.includes("Budget") && parseMinPrice(photographer.priceRange) > 35000) return false;
      if (selectedFilters.includes("Premium") && parseMinPrice(photographer.priceRange) < 40000) return false;
      if (selectedFilters.includes("Quick Response") && parseFloat(photographer.distance) > 8) return false;

      return true;
    });

    return selectedFilters.includes("Price: Low to High")
      ? [...filtered].sort((a, b) => parseMinPrice(a.priceRange) - parseMinPrice(b.priceRange))
      : filtered;
  }, [distanceFilter, selectedFilters, selectedShootType, showOffers]);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 pt-6 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6C4AB6] mb-4 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-1">Photog Services</h1>
        <p className="text-[#8A8A8A] text-sm">Capture your precious moments beautifully</p>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F1F1F]">What shoot are you planning?</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {shootTypeChips.map((shootType) => (
              <button
                key={shootType.name}
                onClick={() => setSelectedShootType((prev) => (prev === shootType.name ? null : shootType.name))}
                className={`flex flex-col items-center min-w-[72px] focus:outline-none ${
                  selectedShootType === shootType.name ? "border-b-2 border-[#6C4AB6]" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${
                    selectedShootType === shootType.name ? "border-[#6C4AB6]" : "border-gray-200"
                  }`}
                >
                  <img src={shootType.image} alt={shootType.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-center mt-1 whitespace-nowrap text-[#1F1F1F]">{shootType.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mb-4 overflow-x-auto scrollbar-hide">
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

      <div className="px-4 mb-6 bg-[#F8F7FF] rounded-xl p-4">
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

      <div className="px-4 pb-6 space-y-4">
        <h3 className="text-lg font-bold text-[#1F1F1F]">
          {selectedShootType ? `${selectedShootType} Photographers` : "Photographers Near You"} ({filteredPhotographers.length})
        </h3>

        {filteredPhotographers.map((photographer) => (
          <div
            key={photographer.id}
            onClick={() => onPhotographerClick?.(photographer.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col min-h-[390px] border-2 border-[#E0D9F0]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
            role="button"
            tabIndex={0}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={photographer.image} alt={photographer.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{photographer.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{photographer.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({photographer.reviews} reviews)</span>
                <div className="flex items-center gap-1 text-xs text-[#6C4AB6] ml-auto font-medium">
                  <Camera className="w-3 h-3" />
                  {photographer.portfolio} shoots
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{photographer.location}</span>
                <span className="text-[#6C4AB6]">{photographer.distance}</span>
              </div>

              {/* Price Range */}
              <div className="text-sm font-semibold text-[#1F1F1F] mb-2">
                {photographer.priceRange}
              </div>

              {/* Event Types */}
              <div className="flex flex-wrap gap-2 mb-3">
                {photographer.eventTypes.slice(0, 3).map((type, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Contact Button */}
              <a
                href={`tel:${photographer.phone.replace(/\s+/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto text-sm flex-shrink-0"
              >
                <Phone className="w-4 h-4" />
                Book Consultation
              </a>
            </div>
          </div>
        ))}

        {filteredPhotographers.length === 0 && (
          <div className="text-center py-10 text-[#8A8A8A]">
            No photographers found for this selection.
          </div>
        )}
      </div>
    </div>
  );
}
