import { ChevronLeft, MapPin, Star, Phone } from "lucide-react";

interface EventOrganizer {
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
}

interface EventsScreenProps {
  onBack: () => void;
  onOrganizerClick?: (organizerId: number) => void;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ onBack, onOrganizerClick }) => {
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
        <h1 className="text-3xl font-bold text-white mb-2">Event Planning Services</h1>
        <p className="text-[#F3EEFF] text-sm">Create unforgettable celebrations</p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {["Weddings", "Corporate", "Birthdays", "All"].map((filter) => (
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

      {/* Event Organizers List */}
      <div className="px-6 pb-6 space-y-4">
        {organizers.map((organizer) => (
          <button
            key={organizer.id}
            onClick={() => onOrganizerClick?.(organizer.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col h-96"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={organizer.image} alt={organizer.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{organizer.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{organizer.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({organizer.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{organizer.location}</span>
                <span className="text-[#6C4AB6]">{organizer.distance}</span>
              </div>

              {/* Price Range */}
              <div className="text-sm font-semibold text-[#1F1F1F] mb-2">
                {organizer.priceRange}
              </div>

              {/* Event Types */}
              <div className="flex flex-wrap gap-2 mb-3">
                {organizer.eventTypes.slice(0, 3).map((type, idx) => (
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
};

export default EventsScreen;
