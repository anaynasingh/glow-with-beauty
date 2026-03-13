import { ChevronLeft, MapPin, Star, Phone, Truck } from "lucide-react";

interface FlowerVendor {
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
}

interface FlowerDecorationScreenProps {
  onBack: () => void;
  onVendorClick?: (vendorId: number) => void;
}

export function FlowerDecorationScreen({ onBack, onVendorClick }: FlowerDecorationScreenProps) {
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
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#F4A6C1] to-[#E64980] px-6 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Flower Decoration</h1>
        <p className="text-white text-sm opacity-90">Decorate your special moments with flowers</p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {["Weddings", "Events", "Same Day", "All"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === "All"
                ? "bg-[#F4A6C1] text-white"
                : "bg-[#FFE6F0] text-[#E64980]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Vendors List */}
      <div className="px-6 pb-6 space-y-4">
        {vendors.map((vendor) => (
          <button
            key={vendor.id}
            onClick={() => onVendorClick?.(vendor.id)}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col h-96"
            style={{ boxShadow: "0 2px 12px rgba(244, 166, 193, 0.15)" }}
          >
            {/* Image */}
            <div className="relative h-40 bg-gray-200 flex-shrink-0">
              <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-2">{vendor.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4A6C1] text-[#F4A6C1]" />
                  <span className="font-semibold text-[#1F1F1F]">{vendor.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({vendor.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{vendor.location}</span>
                <span className="text-[#E64980]">{vendor.distance}</span>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center gap-2 mb-2 text-sm text-[#1F1F1F]">
                <Truck className="w-4 h-4 text-[#E64980]" />
                <span className="font-semibold">{vendor.deliveryTime} Delivery</span>
              </div>

              {/* Price Range */}
              <div className="text-sm font-semibold text-[#1F1F1F] mb-2">
                {vendor.priceRange}
              </div>

              {/* Service Types */}
              <div className="flex flex-wrap gap-2 mb-3">
                {vendor.serviceTypes.slice(0, 3).map((type, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#FFE6F0] text-[#E64980] px-2 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Contact Button */}
              <button className="bg-gradient-to-r from-[#E64980] to-[#E64980] text-white px-6 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mt-auto text-sm">
                <Phone className="w-4 h-4" />
                Order Now
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
