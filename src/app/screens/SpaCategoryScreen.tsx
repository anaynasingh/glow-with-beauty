import React, { useState } from "react";

const spaCategories = [
  { 
    key: "swedish-massage", 
    label: "Swedish Massage",
    image: "https://www.health.com/thmb/3x2SXCdrwYCun8rme7nUiG3PzMU=/5760x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1175433234-034014dc5b9c45edaeaf04c7b80ceafc.jpg"
  },
  { 
    key: "deep-tissue", 
    label: "Deep Tissue",
    image: "https://fearrington.com/cdn/shop/articles/spa-edit111125_1600x.jpg?v=1767813465"
  },
  { 
    key: "pain-relief", 
    label: "Pain Relief",
    image: "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2723311.jpg"
  },
  { 
    key: "skin-care", 
    label: "Skin Care Scrubs",
    image: "https://nabilak.com/wp-content/uploads/2018/10/How-to-Use-Body-Scrubs-Correctly-2.jpg"
  },
  { 
    key: "post-natal", 
    label: "Post Natal",
    image: "https://www.burkewilliams.com/hubfs/Benefits-of-a-Postnatal-Postpartum-Massage-Burke-Williams.png"
  },
  { 
    key: "aromatherapy", 
    label: "Aromatherapy",
    image: "https://luminisbeauty.co.uk/cdn/shop/articles/Luminis_blog_banners_images_1_ee9b396e-ac60-4225-9e91-ac797d29d4d6.jpg?v=1738152658"
  },
  { 
    key: "reflexology", 
    label: "Reflexology",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctF3wwN8v0lO7iWmsUkKyo_j9zi1BgRnqsA&s"
  },
  { 
    key: "add-ons", 
    label: "Add-ons",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7GvFImnndba8i6PC9JpGAwU8M7jk1IN5lw&s"
  },
];

interface SpaVendor {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  serviceTypes: string[];
  priceRange: string;
}

interface SpaCategoryScreenProps {
  onBack: () => void;
  onVendorClick?: (vendorId: number) => void;
}

interface VendorCardProps {
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  image: string;
  priceRange: string;
  onClick?: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
  name,
  rating,
  reviews,
  location,
  distance,
  image,
  priceRange,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-2xl overflow-hidden p-4 flex gap-4 active:opacity-80 transition-opacity border border-[rgba(108,74,182,0.1)]"
    style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
  >
    {/* Image */}
    <div className="w-28 h-28 rounded-lg flex-shrink-0 overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>

    {/* Content */}
    <div className="flex-1 text-left">
      <h3 className="font-semibold text-[#1F1F1F] mb-1">{name}</h3>
      <div className="flex items-center gap-2 mb-1 text-sm">
        <span className="text-[#FFB800] font-semibold">⭐ {rating}</span>
        <span className="text-[#8A8A8A] text-xs">({reviews} reviews)</span>
      </div>
      <div className="text-xs text-[#8A8A8A] mb-2">
        📍 {location} • {distance}
      </div>
      <div className="font-semibold text-[#6C4AB6] text-sm">{priceRange}</div>
    </div>
  </button>
);

export default function SpaCategoryScreen({ onBack, onVendorClick }: SpaCategoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const vendors: SpaVendor[] = [
    {
      id: 1,
      name: "Serenity Spa Wellness",
      rating: 4.9,
      reviews: 245,
      location: "Sector 35, Noida",
      distance: "3.2 km",
      phone: "+91 99234 56789",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f7/03/67/cabina-duo-de-spa-del.jpg?w=700&h=400&s=1",
      serviceTypes: ["Swedish Massage", "Deep Tissue", "Aromatherapy"],
      priceRange: "₹500 - ₹2,500",
    },
    {
      id: 2,
      name: "Tranquil Moments Spa",
      rating: 4.8,
      reviews: 198,
      location: "DLF Cyber City, Gurgaon",
      distance: "6.5 km",
      phone: "+91 88234 56789",
      image: "https://www.palaceresorts.com/hydrothermal_experience_palace_resorts_99165e43aa.webp",
      serviceTypes: ["Pain Relief", "Reflexology", "Deep Tissue"],
      priceRange: "₹600 - ₹3,000",
    },
    {
      id: 3,
      name: "Bliss Spa & Wellness Center",
      rating: 4.7,
      reviews: 167,
      location: "Connaught Place, Delhi",
      distance: "8.4 km",
      phone: "+91 77234 56789",
      image: "https://mohegansun.com/content/dam/mohegansun/Images/Spa/Carousel-Mandara_Spa_Couples-1440x620.jpg",
      serviceTypes: ["Skin Care Scrubs", "Aromatherapy", "Swedish Massage"],
      priceRange: "₹700 - ₹3,500",
    },
    {
      id: 4,
      name: "Zen Harmony Spa",
      rating: 4.6,
      reviews: 152,
      location: "Nehru Place, Delhi",
      distance: "7.1 km",
      phone: "+91 66234 56789",
      image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/anaheimca/SPA_Pasea_Hotel__fb1f8721-a104-4e4f-8174-2b79eb1f1d14.jpg",
      serviceTypes: ["Post Natal", "Pain Relief", "Reflexology"],
      priceRange: "₹400 - ₹2,000",
    },
  ];

  // Helper function to check if a spa offers a service matching the category
  const spaOffersService = (spa: SpaVendor, categoryName: string): boolean => {
    if (!spa.serviceTypes) return false;
    return spa.serviceTypes.some((service) =>
      service.toLowerCase().includes(categoryName.toLowerCase()) ||
      categoryName.toLowerCase().includes(service.toLowerCase().split("-")[0].trim())
    );
  };

  // Filter spas based on selected category
  const displayedSpas = selectedCategory
    ? vendors.filter((spa) => spaOffersService(spa, selectedCategory))
    : vendors;

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        {onBack && (
          <button onClick={onBack} className="text-[#6C4AB6] font-medium text-sm mb-4">
            ← Back
          </button>
        )}
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Spa & Wellness</h2>
      </div>

      {/* Top Categories */}
      <div className="mb-8">
        <h3 className="text-[#1F1F1F] px-6 mb-4 font-semibold">Service Types</h3>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
          {spaCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
              className={`flex flex-col items-center gap-2 hover:opacity-80 transition-all flex-shrink-0`}
            >
              <div
                className={`w-24 h-24 rounded-2xl shadow-md overflow-hidden ${
                  selectedCategory === cat.label ? "ring-2 ring-[#6C4AB6]" : ""
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#1F1F1F] text-center max-w-[100px] font-medium">
                {cat.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Spa Vendors Near You */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1F1F1F] font-semibold">
            {selectedCategory ? `Spas with ${selectedCategory}` : "Spas Near You"}
          </h3>
        </div>
        {displayedSpas.length > 0 ? (
          <div className="space-y-4">
            {displayedSpas.map((vendor) => (
              <VendorCard
                key={vendor.id}
                name={vendor.name}
                rating={vendor.rating}
                reviews={vendor.reviews}
                location={vendor.location}
                distance={vendor.distance}
                image={vendor.image}
                priceRange={vendor.priceRange}
                onClick={() => onVendorClick?.(vendor.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#8A8A8A]">No spas found for this service</p>
          </div>
        )}
      </div>
    </div>
  );
}
