
import { Star, MapPin, Gift } from "lucide-react";
import { useState } from "react";
import { salons } from "../data/mockData";
import { SalonCard } from "../components/SalonCard";

interface SalonCategoryScreenProps {
  onBack: () => void;
  onSalonClick: (salonId: number) => void;
}

const services = [
  {
    name: "Haircut",
    image: "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Shave & Beard",
    image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Facial",
    image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Detan",
    image: "https://slimmingsolutionsspa.com/wp-content/uploads/2025/07/Chemical-Peels-Risks-and-Side-Effects.jpg",
  },
  {
    name: "Hair Color",
    image: "https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Mani-Pedi",
    image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Keratin Hair Spa",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    name: "Head Massage",
    image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  }
];

export function SalonCategoryScreen({ onBack, onSalonClick }: SalonCategoryScreenProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState(15);
  const [showOffers, setShowOffers] = useState(false);

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

  // Filter salons based on selected service, filters, offers, and distance
  const filteredSalons = salons.filter(salon => {
    // Filter by distance
    const salonDistanceNum = parseFloat(salon.distance);
    if (salonDistanceNum > distanceFilter) return false;

    // Filter by offers if toggled
    if (showOffers && !salon.offer) return false;

    // Filter by selected service
    if (selectedService) {
      const hasService = salon.services?.some(s => 
        s.name.toLowerCase().includes(selectedService.toLowerCase())
      );
      if (!hasService) return false;
    }

    // Filter by selected filter categories
    if (selectedFilters.length > 0) {
      if (selectedFilters.includes("Popular") && salon.rating < 4.5) return false;
      if (selectedFilters.includes("Best Rated") && salon.rating < 4.7) return false;
      if (selectedFilters.includes("Trending") && (salon.rating < 4.6 || salon.reviewCount < 100)) return false;
      if (selectedFilters.includes("Affordable")) {
        // Check for budget-friendly price ranges (₹ or ₹₹)
        if (!salon.priceRange.includes("₹") || salon.priceRange.includes("₹₹₹₹")) return false;
      }
      if (selectedFilters.includes("Luxury")) {
        // High-end salons with premium pricing and high ratings
        if (salon.rating < 4.7 || !salon.priceRange.includes("₹₹₹")) return false;
      }
      if (selectedFilters.includes("Quick Service")) {
        // Salons with faster service availability
        const salonDist = parseFloat(salon.distance);
        if (salonDist > 5) return false;
      }
      if (selectedFilters.includes("Reviews") && salon.reviewCount < 50) return false;
    }

    return true;
  });

  const priceScore = (priceRange: string) => priceRange.replace(/[^₹]/g, "").length;

  const displayedSalons = selectedFilters.includes("Price: Low to High")
    ? [...filteredSalons].sort((a, b) => priceScore(a.priceRange) - priceScore(b.priceRange))
    : filteredSalons;

  return (
    <div className="min-h-screen bg-white pb-20">
      <button onClick={onBack} className="m-4 text-[#6C4AB6] font-medium">← Back</button>

      {/* Service Selection Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F1F1F]">What service do you need?</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {services.map((svc) => (
              <button
                key={svc.name}
                onClick={() => setSelectedService(selectedService === svc.name ? null : svc.name)}
                className={`flex flex-col items-center min-w-[72px] focus:outline-none ${
                  selectedService === svc.name ? "border-b-2 border-[#6C4AB6]" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${
                    selectedService === svc.name ? "border-[#6C4AB6]" : "border-gray-200"
                  }`}
                >
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-center mt-1 whitespace-nowrap text-[#1F1F1F]">
                  {svc.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-4 mb-6">
        {/* Horizontal Scrollable Filter Chips */}
        <div className="overflow-x-auto scrollbar-hide">
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
      </div>

      {/* Distance Slider Filter */}
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

      {/* Salons Listing */}
      <div className="px-4">
        <h3 className="text-lg font-bold mb-4 text-[#1F1F1F]">
          {selectedService ? `${selectedService} Salons` : "Salons Near You"} ({displayedSalons.length})
        </h3>
        
        {displayedSalons.length > 0 ? (
          <div className="space-y-3">
            {displayedSalons.map((salon) => (
              <button
                key={salon.id}
                onClick={() => onSalonClick(salon.id)}
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
                  onClick={() => onSalonClick(salon.id)}
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
