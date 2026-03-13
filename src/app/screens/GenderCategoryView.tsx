import { Search, Heart, User } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { SalonCard } from "../components/SalonCard";
import { services, salons } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

interface GenderCategoryViewProps {
  gender: "men" | "women";
  onServiceClick?: (serviceName: string) => void;
  onSalonClick?: (salonId: number) => void;
  onFavoriteSalonsClick?: () => void;
  onAccountClick?: () => void;
  onBack: () => void;
}

export function GenderCategoryView({
  gender,
  onServiceClick,
  onSalonClick,
  onFavoriteSalonsClick,
  onAccountClick,
  onBack,
}: GenderCategoryViewProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Custom categories for men (matching reference app)
  const menCategories = [
    {
      name: "Beard Grooming",
      image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Face Massage",
      image: "https://thumbs.dreamstime.com/b/man-receiving-head-massage-medical-office-51614593.jpg"
    },
    {
      name: "Haircut",
      image: "https://tse1.explicit.bing.net/th/id/OIP.hgRSJdaxN1c6UZ63pHR4VgHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Beard Trimming",
      image: "https://tse1.mm.bing.net/th/id/OIP.nNk4WkJf15U9xKJ1RS1KPwHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Hair Coloring",
      image: "https://tse3.mm.bing.net/th/id/OIP.Gq1i64GgOt_mnheWYLIPsgHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Shaving",
      image: "https://tse4.mm.bing.net/th/id/OIP.psUDhiH06F70GevV7F2e0QHaE8?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Eyebrow Plucking",
      image: "https://browheaven.com/wp-content/uploads/2022/03/2-1024x577.png"
    },
    {
      name: "Head Massage",
      image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1660029164522-d7a9e5.png"
    },
  ];

  // Filter services based on selected gender
  let filteredServices;
  if (gender === "men") {
    filteredServices = menCategories.map((cat, idx) => ({
      id: 1000 + idx,
      name: cat.name,
      image: cat.image,
    }));
  } else {
    filteredServices = services.filter(
      (service) => service.category === "women" || service.category === "both"
    );
  }

  const title = gender === "men" ? "Salon Services" : "Beauty Services";
  const subtitle =
    gender === "men"
      ? "Men's grooming and styling services"
      : "Women's beauty and wellness services";

  // Filter salons with relevant services
  const relevantSalons = salons.filter((s) => s.rating >= 3.5);

  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header with Back Button */}
      <div className="px-6 pt-8 pb-6">
        <button
          onClick={onBack}
          className="mb-4 text-[#6C4AB6] font-medium text-sm"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-1">{title}</h1>
        <p className="text-sm text-[#8A8A8A] mb-6">{subtitle}</p>

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
      <div className="mb-6">
        <h3 className="text-[#1F1F1F] px-6 mb-4">{t("topCategories")}</h3>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              image={service.image}
              onClick={() => onServiceClick?.(service.name)}
            />
          ))}
        </div>
      </div>

      {/* Nearby Salons */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">
            {gender === "men" ? "Salons for Men" : "Salons for Women"}
          </h3>
          <button className="text-sm text-[#6C4AB6]">{t("viewAll")}</button>
        </div>
        <div className="flex gap-0 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {relevantSalons.map((salon) => (
            <SalonCard
              key={salon.id}
              name={salon.name}
              rating={salon.rating}
              reviewCount={salon.reviewCount}
              priceRange={salon.priceRange}
              distance={salon.distance}
              offer={salon.offer}
              image={salon.image || ""}
              onClick={() => onSalonClick?.(salon.id)}
              horizontal
            />
          ))}
        </div>
      </div>

      {/* Top Rated Salons */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("topRatedSalons")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("explore")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {relevantSalons.filter((s) => s.rating >= 4.7).map((salon) => (
            <div key={`top-${salon.id}`} className="relative">
              <div className="absolute top-2 left-2 bg-[#FFF4E5] text-[#B36E00] px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <span className="text-sm">⭐</span>
                <span>{t("topRated")}</span>
              </div>
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image || ""}
                onClick={() => onSalonClick?.(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
