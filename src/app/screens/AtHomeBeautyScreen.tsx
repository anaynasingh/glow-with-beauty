import { ChevronLeft, MapPin, Star, Phone } from "lucide-react";
import { useState } from "react";

interface AtHomeBeautyProvider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  specialties: string[];
  experience: number;
  availableToday: boolean;
  category: "men" | "women";
}

interface AtHomeBeautyScreenProps {
  onBack: () => void;
  onProviderClick?: (providerId: number) => void;
}

export function AtHomeBeautyScreen({ onBack, onProviderClick }: AtHomeBeautyScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<"men" | "women">("women");

  const providers: AtHomeBeautyProvider[] = [
    {
      id: 1,
      name: "Priya's Beauty Services",
      rating: 4.8,
      reviews: 245,
      location: "Sector 12, Noida",
      distance: "2.5 km",
      phone: "+91 98765 43210",
      image: "https://health-routes.co.uk/wp-content/uploads/2023/05/4.jpg",
      specialties: ["Hair", "Makeup", "Facial", "Waxing"],
      experience: 8,
      availableToday: true,
      category: "women",
    },
    {
      id: 2,
      name: "Glamour Home Salon",
      rating: 4.7,
      reviews: 189,
      location: "Indirapuram",
      distance: "4.2 km",
      phone: "+91 87654 32109",
      image: "https://tse1.explicit.bing.net/th/id/OIP.TMOW8Fm5WEd9A6S66BE4bgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      specialties: ["Bridal Makeup", "Hair Color", "Nails", "Threading"],
      experience: 6,
      availableToday: false,
      category: "women",
    },
    {
      id: 3,
      name: "Radiant Beauty at Home",
      rating: 4.9,
      reviews: 312,
      location: "Dwarka",
      distance: "5.8 km",
      phone: "+91 76543 21098",
      image: "https://www.glamoureyebrowmason.com/wp-content/uploads/2021/02/Hands.jpg",
      specialties: ["Skincare", "Facial", "Massage", "Makeup"],
      experience: 10,
      availableToday: true,
      category: "women",
    },
    {
      id: 4,
      name: "Urban Grooming at Home",
      rating: 4.7,
      reviews: 174,
      location: "Sector 62, Noida",
      distance: "3.9 km",
      phone: "+91 90123 45678",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
      specialties: ["Haircut", "Beard Styling", "Head Massage", "Detan"],
      experience: 7,
      availableToday: true,
      category: "men",
    },
    {
      id: 5,
      name: "Gentlemen Home Salon",
      rating: 4.6,
      reviews: 132,
      location: "Vaishali",
      distance: "5.1 km",
      phone: "+91 91234 56789",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80",
      specialties: ["Beard Grooming", "Hair Color", "Facial", "Shaving"],
      experience: 5,
      availableToday: false,
      category: "men",
    },
    {
      id: 6,
      name: "Pro Men Stylist Doorstep",
      rating: 4.8,
      reviews: 221,
      location: "Rajouri Garden",
      distance: "6.3 km",
      phone: "+91 92345 67890",
      image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
      specialties: ["Fade Haircut", "Beard Trimming", "Eyebrow Cleanup", "Facial"],
      experience: 9,
      availableToday: true,
      category: "men",
    },
  ];

  const displayedProviders = providers.filter(
    (provider) => provider.category === selectedCategory
  );

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6C4AB6] mb-5 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">At Home Beauty Services</h1>
        <p className="text-[#8A8A8A] text-sm">Professional beauty at your doorstep</p>

        <div className="mt-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-1 min-w-max">
          <button
            onClick={() => setSelectedCategory("women")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "women"
                ? "bg-[#6C4AB6] text-white"
                : "bg-[#FFF0F5] text-[#FF6B9D] border border-[#FFD9E8]"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setSelectedCategory("men")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "men"
                ? "bg-[#6C4AB6] text-white"
                : "bg-[#FFF0F5] text-[#FF6B9D] border border-[#FFD9E8]"
            }`}
          >
            Men
          </button>
          </div>
        </div>
      </div>

      {/* Providers List */}
      <div className="px-6 py-6 space-y-4">
        {displayedProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onProviderClick?.(provider.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col h-96 border-2 border-[#E0D9F0]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
              {provider.availableToday && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Available Today
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{provider.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{provider.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({provider.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-1 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{provider.location}</span>
                <span className="text-[#6C4AB6]">{provider.distance}</span>
              </div>

              {/* Experience */}
              <div className="text-xs text-[#8A8A8A] mb-2">
                {provider.experience} years of experience
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-auto">
                {provider.specialties.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Contact Button */}
              <button className="w-full bg-gradient-to-r from-[#6C4AB6] to-[#8B5FBF] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto">
                <Phone className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </button>
        ))}

        {displayedProviders.length === 0 && (
          <div className="text-center py-12 text-[#8A8A8A]">
            No providers available in this category right now.
          </div>
        )}
      </div>
    </div>
  );
}
