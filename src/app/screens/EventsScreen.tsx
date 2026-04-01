import { ChevronLeft, MapPin, Star, Phone } from "lucide-react";
import { useMemo, useState } from "react";

type EventOrganizer = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  eventTypes: string[];
  priceRange: string;
  hasOffer: boolean;
};

interface EventsScreenProps {
  onBack: () => void;
  onOrganizerClick?: (organizerId: number) => void;
}

const serviceChips = [
  { name: "Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" },
  { name: "Birthdays", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=500&q=80" },
  { name: "Corporate", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80" },
  { name: "Engagement", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=80" },
  { name: "Reception", image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=500&q=80" },
  { name: "Parties", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=500&q=80" },
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

const organizers: EventOrganizer[] = [
  {
    id: 1,
    name: "Elite Events Management",
    rating: 4.9,
    reviews: 234,
    location: "Connaught Place, Delhi",
    distance: "5.2 km",
    phone: "+91 99876 54321",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=500&fit=crop",
    eventTypes: ["Weddings", "Corporate", "Birthdays"],
    priceRange: "₹1,00,000 - ₹50,00,000",
    hasOffer: true,
  },
  {
    id: 2,
    name: "Grand Occasions",
    rating: 4.8,
    reviews: 189,
    location: "Sector 17, Noida",
    distance: "4.1 km",
    phone: "+91 88765 43210",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    eventTypes: ["Weddings", "Engagements", "Receptions"],
    priceRange: "₹80,000 - ₹45,00,000",
    hasOffer: false,
  },
  {
    id: 3,
    name: "Celebration Experts",
    rating: 4.7,
    reviews: 156,
    location: "Nehru Place, Delhi",
    distance: "9.3 km",
    phone: "+91 77654 32109",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=500&fit=crop",
    eventTypes: ["Corporate", "Conferences", "Galas"],
    priceRange: "₹50,000 - ₹35,00,000",
    hasOffer: true,
  },
  {
    id: 4,
    name: "Perfect Moments Planning",
    rating: 4.6,
    reviews: 142,
    location: "DLF Cyber City, Gurgaon",
    distance: "8.7 km",
    phone: "+91 66543 21098",
    image: "https://images.stockcake.com/public/0/e/a/0ea40ea4-c904-4e03-9b9e-073bf98242be_large/family-birthday-celebration-stockcake.jpg",
    eventTypes: ["Birthdays", "Anniversaries", "Parties"],
    priceRange: "₹40,000 - ₹20,00,000",
    hasOffer: false,
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

const parseMinPrice = (priceRange: string) => {
  const firstAmount = priceRange.split("-")[0]?.replace(/[^\d]/g, "") || "0";
  return Number(firstAmount);
};

export default function EventsScreen({ onBack, onOrganizerClick }: EventsScreenProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
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

  const filteredOrganizers = useMemo(() => {
    const filtered = organizers.filter((organizer) => {
      const km = parseFloat(organizer.distance);
      if (km > distanceFilter) return false;
      if (showOffers && !organizer.hasOffer) return false;

      if (selectedService) {
        const service = normalize(selectedService);
        const matchesService = organizer.eventTypes.some((type) => {
          const normalizedType = normalize(type);
          if (service === "wedding") return normalizedType.includes("wedding");
          if (service === "engagement") return normalizedType.includes("engagement");
          if (service === "reception") return normalizedType.includes("reception");
          if (service === "birthdays") {
            return normalizedType.includes("birthday") || normalizedType.includes("party");
          }
          return normalizedType.includes(service);
        });
        if (!matchesService) return false;
      }

      if (selectedFilters.includes("Popular") && organizer.rating < 4.7) return false;
      if (selectedFilters.includes("Best Rated") && organizer.rating < 4.8) return false;
      if (selectedFilters.includes("Trending") && (organizer.rating < 4.7 || organizer.reviews < 170)) return false;
      if (selectedFilters.includes("Affordable") && parseMinPrice(organizer.priceRange) > 50000) return false;
      if (selectedFilters.includes("Luxury") && parseMinPrice(organizer.priceRange) < 80000) return false;
      if (selectedFilters.includes("Quick Service") && km > 6) return false;
      if (selectedFilters.includes("Reviews") && organizer.reviews < 150) return false;

      return true;
    });

    return selectedFilters.includes("Price: Low to High")
      ? [...filtered].sort((a, b) => parseMinPrice(a.priceRange) - parseMinPrice(b.priceRange))
      : filtered;
  }, [distanceFilter, selectedFilters, selectedService, showOffers]);

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
        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-1">Event Planning Services</h1>
        <p className="text-[#8A8A8A] text-sm">Create unforgettable celebrations</p>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F1F1F]">What event do you need?</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {serviceChips.map((service) => (
              <button
                key={service.name}
                onClick={() => setSelectedService((prev) => (prev === service.name ? null : service.name))}
                className={`flex flex-col items-center min-w-[72px] focus:outline-none ${
                  selectedService === service.name ? "border-b-2 border-[#6C4AB6]" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-lg overflow-hidden mb-1 border ${
                    selectedService === service.name ? "border-[#6C4AB6]" : "border-gray-200"
                  }`}
                >
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-center mt-1 whitespace-nowrap text-[#1F1F1F]">{service.name}</span>
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
          {selectedService ? `${selectedService} Organizers` : "Event Organizers Near You"} ({filteredOrganizers.length})
        </h3>

        {filteredOrganizers.map((organizer) => (
          <div
            key={organizer.id}
            onClick={() => onOrganizerClick?.(organizer.id)}
            className="bg-white rounded-2xl overflow-hidden transition-all w-full flex flex-col h-96 border-2 border-[#E0D9F0] active:scale-[0.98]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
            role="button"
            tabIndex={0}
          >
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={organizer.image} alt={organizer.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{organizer.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{organizer.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({organizer.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{organizer.location}</span>
                <span className="text-[#6C4AB6]">{organizer.distance}</span>
              </div>

              <div className="text-sm font-semibold text-[#1F1F1F] mb-2">{organizer.priceRange}</div>

              <div className="flex flex-wrap gap-2 mb-3">
                {organizer.eventTypes.slice(0, 3).map((type, idx) => (
                  <span key={idx} className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>

              <a
                href={`tel:${organizer.phone.replace(/\s+/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white px-6 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto text-sm"
              >
                <Phone className="w-4 h-4" />
                Inquire Now
              </a>
            </div>
          </div>
        ))}

        {filteredOrganizers.length === 0 && (
          <div className="text-center py-10 text-[#8A8A8A]">No organizers found for this selection.</div>
        )}
      </div>
    </div>
  );
}
