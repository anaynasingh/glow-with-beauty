import { ChevronLeft, MapPin, Star, Phone, Zap } from "lucide-react";

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

export function PhotographyScreen({ onBack, onPhotographerClick }: PhotographyScreenProps) {
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
      eventTypes: ["Weddings", "Pre-wedding", "Events", "Portraits"],
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

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#6C4AB6] to-[#3D2C8D] px-6 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Photography Services</h1>
        <p className="text-[#F3EEFF] text-sm">Capture your precious moments</p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {["Weddings", "Events", "Portraits", "All"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === "All"
                ? "bg-[#6C4AB6] text-white"
                : "bg-[#F3EEFF] text-[#6C4AB6]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Photographers List */}
      <div className="px-6 pb-6 space-y-4">
        {photographers.map((photographer) => (
          <button
            key={photographer.id}
            onClick={() => onPhotographerClick?.(photographer.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col h-96"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={photographer.image} alt={photographer.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{photographer.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{photographer.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({photographer.reviews} reviews)</span>
                <div className="flex items-center gap-1 text-xs text-[#6C4AB6] ml-auto">
                  <Zap className="w-3 h-3" />
                  {photographer.portfolio}
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
              <button className="bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white px-6 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto text-sm">
                <Phone className="w-4 h-4" />
                Inquire Now
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
