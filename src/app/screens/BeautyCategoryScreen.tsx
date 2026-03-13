import { Search, Heart, User } from "lucide-react";
import { useState } from "react";
import { SalonCard } from "../components/SalonCard";
import { services, salons } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

interface BeautyCategoryScreenProps {
  onBack?: () => void;
  onSalonClick?: (salonId: number) => void;
  onServiceClick?: (serviceName: string) => void;
  onFavoriteSalonsClick?: () => void;
  onAccountClick?: () => void;
}

export default function BeautyCategoryScreen({
  onBack,
  onSalonClick,
  onServiceClick,
  onFavoriteSalonsClick,
  onAccountClick,
}: BeautyCategoryScreenProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter services for women
  const filteredServices = services.filter(
    (service) => service.category === "women" || service.category === "both"
  );

  // Helper function to check if a salon offers a service matching the category
  const salonOffersCategory = (salon: typeof salons[0], categoryName: string): boolean => {
    if (!salon.services) return false;
    return salon.services.some((service) =>
      service.name.toLowerCase().includes(categoryName.toLowerCase()) ||
      categoryName.toLowerCase().includes(service.name.toLowerCase().split("-")[0].trim())
    );
  };

  // Filter salons based on selected category
  const displayedSalons = selectedCategory
    ? salons.filter((salon) => salonOffersCategory(salon, selectedCategory))
    : salons;

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header with Search */}
      <div className="px-6 pt-8 pb-6">
        {/* Back Button */}
        {onBack && (
          <button onClick={onBack} className="mb-4 text-[#6C4AB6] font-medium text-sm">
            ← Back
          </button>
        )}

        {/* Search Bar with Favorite and Account Icons */}
        <div className="relative mb-5 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-sm border border-[rgba(108,74,182,0.1)] focus:outline-none focus:border-[#6C4AB6] transition-colors"
              style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
            />
          </div>
          <button
            onClick={onFavoriteSalonsClick}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[rgba(108,74,182,0.1)] hover:border-[#6C4AB6] transition-colors active:scale-[0.95]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            <Heart className="w-5 h-5 text-[#F4A6C1]" />
          </button>
          <button
            onClick={onAccountClick}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[rgba(108,74,182,0.1)] hover:border-[#6C4AB6] transition-colors active:scale-[0.95]"
            style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
          >
            <User className="w-5 h-5 text-[#6C4AB6]" />
          </button>
        </div>
      </div>

      {/* Top Categories - Horizontal Scroll */}
      <div className="mb-8">
        <h3 className="text-[#1F1F1F] px-6 mb-4">{t("topCategories")}</h3>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
          {filteredServices.map((service) => (
            <div key={service.id} className="flex flex-col items-center flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === service.name ? null : service.name
                  );
                  onServiceClick?.(service.name);
                }}
                className={`flex flex-col items-center gap-2 hover:opacity-80 transition-all ${
                  selectedCategory === service.name
                    ? "ring-2 ring-[#6C4AB6] rounded-2xl"
                    : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-24 h-24 object-cover rounded-2xl shadow-md ${
                    selectedCategory === service.name ? "ring-2 ring-[#6C4AB6]" : ""
                  }`}
                />
                <p className="text-xs text-[#1F1F1F] text-center max-w-[100px] font-medium">
                  {service.name}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Salon Near You - Vertical List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1F1F1F]">
            {selectedCategory ? `Salons with ${selectedCategory}` : t("salonsNearYou")}
          </h3>
        </div>
        {displayedSalons.length > 0 ? (
          <div className="space-y-4">
            {displayedSalons.map((salon) => (
              <div key={salon.id}>
                <SalonCard
                  name={salon.name}
                  rating={salon.rating}
                  reviewCount={salon.reviewCount}
                  priceRange={salon.priceRange}
                  distance={salon.distance}
                  offer={salon.offer}
                  image={salon.image}
                  onClick={() => onSalonClick?.(salon.id)}
                  horizontal={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#8A8A8A]">No salons found for this service</p>
          </div>
        )}
      </div>
    </div>
  );
}


