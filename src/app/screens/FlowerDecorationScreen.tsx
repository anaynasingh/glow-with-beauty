import { ChevronLeft, MapPin, Star, Phone, Truck } from "lucide-react";
import { useMemo, useState } from "react";

type FlowerVendor = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  serviceTypes: string[];
  deliveryTime: string;
  priceRange: string;
  hasOffer: boolean;
};

interface FlowerDecorationScreenProps {
  onBack: () => void;
  onVendorClick?: (vendorId: number) => void;
}

const serviceChips = [
  { name: "Wedding", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=500&q=80" },
  { name: "Birthdays", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=500&q=80" },
  { name: "Corporate", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=500&q=80" },
  { name: "Reception", image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=500&q=80" },
  { name: "Stage Decor", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=80" },
  { name: "Same Day", image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=500&q=80" },
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

const vendors: FlowerVendor[] = [
  {
    id: 1,
    name: "Bloom Creations",
    rating: 4.9,
    reviews: 234,
    location: "Greater Kailash, Delhi",
    distance: "5.2 km",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
    serviceTypes: ["Weddings", "Corporate Events", "Parties", "Stage Decor"],
    deliveryTime: "Same day",
    priceRange: "₹5,000 - ₹5,00,000",
    hasOffer: true,
  },
  {
    id: 2,
    name: "Floral Dreams",
    rating: 4.7,
    reviews: 189,
    location: "Sector 12, Noida",
    distance: "3.8 km",
    phone: "+91 87654 32109",
    image: "https://th.bing.com/th/id/R.7e1d672c4ed2477f3ceecfa6c2cd83c6?rik=eW2zA9aTq5XGtQ&pid=ImgRaw&r=0",
    serviceTypes: ["Bridal Decor", "Reception Setup", "Arrangements", "Venue Design"],
    deliveryTime: "2-4 hours",
    priceRange: "₹3,000 - ₹3,00,000",
    hasOffer: false,
  },
  {
    id: 3,
    name: "Petals & Stems",
    rating: 4.8,
    reviews: 156,
    location: "South Delhi",
    distance: "7.5 km",
    phone: "+91 76543 21098",
    image: "https://i.pinimg.com/originals/ec/a8/6f/eca86f401af6407d2d18bb0a530c6b73.jpg",
    serviceTypes: ["Bouquets", "Centerpieces", "Arches", "Garlands"],
    deliveryTime: "Same day",
    priceRange: "₹2,000 - ₹2,50,000",
    hasOffer: true,
  },
  {
    id: 4,
    name: "Garden Glory Florals",
    rating: 4.6,
    reviews: 142,
    location: "Connaught Place",
    distance: "10.2 km",
    phone: "+91 65432 10987",
    image: "https://tse3.mm.bing.net/th/id/OIP.TF43-Gdq4y3bymnx5gI52AHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    serviceTypes: ["Birthdays", "Anniversaries", "Decorations", "Flowers"],
    deliveryTime: "4-6 hours",
    priceRange: "₹1,500 - ₹1,50,000",
    hasOffer: false,
  },
];

const normalize = (value: string) => value.toLowerCase().trim();

const parseMinPrice = (priceRange: string) => {
  const firstAmount = priceRange.split("-")[0]?.replace(/[^\d]/g, "") || "0";
  return Number(firstAmount);
};

export function FlowerDecorationScreen({ onBack, onVendorClick }: FlowerDecorationScreenProps) {
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

  const filteredVendors = useMemo(() => {
    const filtered = vendors.filter((vendor) => {
      const km = parseFloat(vendor.distance);
      if (km > distanceFilter) return false;
      if (showOffers && !vendor.hasOffer) return false;

      if (selectedService) {
        const service = normalize(selectedService);
        const hasService =
          vendor.serviceTypes.some((type) => {
            const normalizedType = normalize(type);
            if (service === "wedding") return normalizedType.includes("wedding") || normalizedType.includes("bridal");
            if (service === "birthdays") return normalizedType.includes("birthday") || normalizedType.includes("party");
            if (service === "same day") return normalize(vendor.deliveryTime).includes("same day");
            if (service === "reception") return normalizedType.includes("reception");
            return normalizedType.includes(service);
          }) || (service === "same day" && normalize(vendor.deliveryTime).includes("same day"));

        if (!hasService) return false;
      }

      if (selectedFilters.includes("Popular") && vendor.rating < 4.7) return false;
      if (selectedFilters.includes("Best Rated") && vendor.rating < 4.8) return false;
      if (selectedFilters.includes("Trending") && (vendor.rating < 4.7 || vendor.reviews < 170)) return false;
      if (selectedFilters.includes("Affordable") && parseMinPrice(vendor.priceRange) > 3000) return false;
      if (selectedFilters.includes("Luxury") && parseMinPrice(vendor.priceRange) < 5000) return false;
      if (selectedFilters.includes("Quick Service") && !normalize(vendor.deliveryTime).includes("same day")) return false;
      if (selectedFilters.includes("Reviews") && vendor.reviews < 150) return false;

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
        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-1">Florist Services</h1>
        <p className="text-[#8A8A8A] text-sm">Decorate your special moments with flowers</p>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F1F1F]">What decoration do you need?</h2>
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
          {selectedService ? `${selectedService} Decorators` : "Flower Decorators Near You"} ({filteredVendors.length})
        </h3>

        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() => onVendorClick?.(vendor.id)}
            className="bg-white rounded-2xl overflow-hidden transition-all w-full flex flex-col min-h-[390px] border-2 border-[#E0D9F0] active:scale-[0.98]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
            role="button"
            tabIndex={0}
          >
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{vendor.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{vendor.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({vendor.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{vendor.location}</span>
                <span className="text-[#6C4AB6]">{vendor.distance}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-[#1F1F1F]">
                <Truck className="w-4 h-4 text-[#6C4AB6]" />
                <span className="font-semibold">{vendor.deliveryTime} Delivery</span>
              </div>

              <div className="text-sm font-semibold text-[#1F1F1F] mb-2">{vendor.priceRange}</div>

              <div className="flex flex-wrap gap-2 mb-3">
                {vendor.serviceTypes.slice(0, 3).map((type, idx) => (
                  <span key={idx} className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>

              <a
                href={`tel:${vendor.phone.replace(/\s+/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto text-sm flex-shrink-0"
              >
                <Phone className="w-4 h-4" />
                Order Now
              </a>
            </div>
          </div>
        ))}

        {filteredVendors.length === 0 && (
          <div className="text-center py-10 text-[#8A8A8A]">No decorators found for this selection.</div>
        )}
      </div>
    </div>
  );
}
