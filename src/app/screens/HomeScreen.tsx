import { Search, Tag, ChevronRight, Heart, User } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { SalonCard } from "../components/SalonCard";
import { StylistCard } from "../components/StylistCard";
import { services, salons, appointments } from "../data/mockData";
import { useLanguage } from "../i18n/LanguageContext";

interface HomeScreenProps {
  onServiceClick: (serviceName: string) => void;
  onSalonClick: (salonId: number) => void;
  onSpecialOffersClick: () => void;
  onFavoriteSalonsClick?: () => void;
  onAccountClick?: () => void;
}

interface HomeScreenCategoryNavProps extends HomeScreenProps {
  onCategoryClick: (categoryName: string) => void;
}

export function HomeScreen({ onServiceClick, onSalonClick, onSpecialOffersClick, onFavoriteSalonsClick, onAccountClick, onCategoryClick }: Partial<HomeScreenCategoryNavProps>) {
  const { t } = useLanguage();
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("women");
  const [searchQuery, setSearchQuery] = useState("");


  // User-provided categories and images for women
  const womenCategories = [
    {
      name: "Hair",
      image: "https://images.unsplash.com/photo-1659036354224-48dd0a9a6b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      subcategories: [
        { name: "Hair Style", image: "https://images.unsplash.com/photo-1659036354224-48dd0a9a6b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Hair Color", image: "https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Haircut & Style", image: "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Keratin Hair Spa", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
        { name: "Balayage Hair Color", image: "https://images.pexels.com/photos/8468036/pexels-photo-8468036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
      ],
    },
    {
      name: "Nails",
      image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      subcategories: [
        { name: "Nail Art", image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Mani Pedi", image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Russian Manicure", image: "https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
      ],
    },
    {
      name: "Face",
      image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      subcategories: [
        { name: "Facial", image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        { name: "Glass Skin Facial", image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
        { name: "Skincare", image: "https://images.unsplash.com/photo-1608571899793-a1c0c27a7555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      ],
    },
  ];

  // User-provided categories and images for men
  const menCategories = [
    {
      name: "Beard",
      image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80",
      subcategories: [
        { name: "Beard Grooming", image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80" },
        { name: "Beard Trimming", image: "https://tse1.mm.bing.net/th/id/OIP.nNk4WkJf15U9xKJ1RS1KPwHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
      ],
    },
    {
      name: "Hair",
      image: "https://tse1.explicit.bing.net/th/id/OIP.hgRSJdaxN1c6UZ63pHR4VgHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
      subcategories: [
        { name: "Haircut", image: "https://tse1.explicit.bing.net/th/id/OIP.hgRSJdaxN1c6UZ63pHR4VgHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
        { name: "Hair Coloring", image: "https://tse3.mm.bing.net/th/id/OIP.Gq1i64GgOt_mnheWYLIPsgHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
      ],
    },
    {
      name: "Massage",
      image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1660029164522-d7a9e5.png",
      subcategories: [
        { name: "Head Massage", image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1660029164522-d7a9e5.png" },
        { name: "Face Massage", image: "https://thumbs.dreamstime.com/b/man-receiving-head-massage-medical-office-51614593.jpg" },
      ],
    },
    {
      name: "Shaving",
      image: "https://tse4.mm.bing.net/th/id/OIP.psUDhiH06F70GevV7F2e0QHaE8?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
      subcategories: [
        { name: "Shaving", image: "https://tse4.mm.bing.net/th/id/OIP.psUDhiH06F70GevV7F2e0QHaE8?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
      ],
    },
    {
      name: "Eyebrow",
      image: "https://browheaven.com/wp-content/uploads/2022/03/2-1024x577.png",
      subcategories: [
        { name: "Eyebrow Plucking", image: "https://browheaven.com/wp-content/uploads/2022/03/2-1024x577.png" },
      ],
    },
  ];

  // Define broad subcategories and their matching logic
  const broadCategories = selectedGender === "men"
    ? menCategories
    : [
        {
          name: "Hair",
          image: services.find(s => s.name.toLowerCase().includes("hair"))?.image,
          keywords: ["Hair", "Haircut", "Hair Style", "Hair Coloring", "Keratin", "Blowout", "Balayage"],
        },
        {
          name: "Nails",
          image: services.find(s => s.name.toLowerCase().includes("nail"))?.image,
          keywords: ["Nail", "Mani", "Pedi", "Manicure", "Pedicure"],
        },
        {
          name: "Face",
          image: services.find(s => s.name.toLowerCase().includes("facial"))?.image,
          keywords: ["Facial", "Face", "Skincare", "Glass Skin"],
        },
        {
          name: "Makeup",
          image: services.find(s => s.name.toLowerCase().includes("makeup"))?.image,
          keywords: ["Makeup", "Bridal", "Glam"],
        },
        {
          name: "Massage",
          image: services.find(s => s.name.toLowerCase().includes("massage"))?.image,
          keywords: ["Massage", "Head Massage"],
        },
        {
          name: "Waxing",
          image: services.find(s => s.name.toLowerCase().includes("waxing"))?.image,
          keywords: ["Waxing"],
        },
      ];

  // Filter and group services by broad category
  // For men/women, use subcategories directly
  const groupedServices = selectedGender === "men"
    ? menCategories.map((cat) => ({ ...cat, services: cat.subcategories }))
    : womenCategories.map((cat) => ({ ...cat, services: cat.subcategories }));

  // State for selected broad category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);



  return (
    <div className="pb-20 bg-gradient-to-b from-[#F8F7FF] to-white min-h-screen">
      {/* Header with Search */}
      <div className="px-6 pt-8 pb-6">
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

        {/* Men/Women Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSelectedGender("men")}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              selectedGender === "men"
                ? "bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white shadow-lg"
                : "bg-white text-[#8A8A8A] border border-[rgba(108,74,182,0.1)]"
            }`}
            style={
              selectedGender === "men"
                ? { boxShadow: "0 4px 16px rgba(108, 74, 182, 0.3)" }
                : {}
            }
          >
            {t("men")}
          </button>
          <button
            onClick={() => setSelectedGender("women")}
            className={`flex-1 py-3 rounded-xl text-sm transition-all ${
              selectedGender === "women"
                ? "bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] text-white shadow-lg"
                : "bg-white text-[#8A8A8A] border border-[rgba(108,74,182,0.1)]"
            }`}
            style={
              selectedGender === "women"
                ? { boxShadow: "0 4px 16px rgba(108, 74, 182, 0.3)" }
                : {}
            }
          >
            {t("women")}
          </button>
        </div>
      </div>


      {/* Top Categories - Grid of Boxes, Navigate on click */}
      <div className="mb-6">
        <h3 className="text-[#1F1F1F] px-6 mb-4">{t("topCategories")}</h3>
        <div className="px-4">
          <div className="grid grid-cols-4 gap-6 p-2">
            {groupedServices.map((cat) => (
              <div key={cat.name} className="flex justify-center items-center">
                <ServiceCard
                  name={cat.name}
                  image={cat.image || ''}
                  onClick={() => onCategoryClick && onCategoryClick(cat.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Banner */}
      <div className="px-6 mb-6">
        <button
          onClick={onSpecialOffersClick}
          className="w-full bg-gradient-to-r from-[#6C4AB6] to-[#3D2C8D] rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition-shadow"
          style={{ boxShadow: "0 4px 20px rgba(108, 74, 182, 0.25)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Today's Special Deals</p>
              <p className="text-sm text-white/80">
                Limited time offers available
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white flex-shrink-0" />
        </button>
      </div>

      {/* Deals & Offers Slider */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("dealsOffers")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
          {salons.filter((s) => s.offer).map((salon) => (
            <div key={salon.id} className="snap-start">
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Salons */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("salonsNearYou")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("viewAll")}</button>
        </div>
        <div className="flex gap-0 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => !s.offer).map((salon) => (
            <SalonCard
              key={salon.id}
              name={salon.name}
              rating={salon.rating}
              reviewCount={salon.reviewCount}
              priceRange={salon.priceRange}
              distance={salon.distance}
              offer={salon.offer}
              image={salon.image}
              onClick={() => onSalonClick(salon.id)}
              horizontal
            />
          ))}
        </div>
      </div>

      {/* Helper image map for salon image keys */}
      {/* (kept local to avoid changing SalonCard) */}
      
      {/* Personalized For You */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("personalizedForYou")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeMore")}</button>
        </div>
        <p className="text-sm text-[#8A8A8A] mb-3 px-1">{t("basedOnPastBookings")}</p>
        <div className="flex gap-0 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => appointments.some((a) => a.salon === s.name)).map((salon) => (
            <SalonCard
              key={`personal-${salon.id}`}
              name={salon.name}
              rating={salon.rating}
              reviewCount={salon.reviewCount}
              priceRange={salon.priceRange}
              distance={salon.distance}
              offer={salon.offer}
              image={salon.image}
              onClick={() => onSalonClick(salon.id)}
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
          {salons.filter((s) => s.rating >= 4.7).map((salon) => (
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
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Services */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("trendingServices")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {services.filter((svc: any) => svc.trending).map((svc: any) => (
            <div key={`trend-${svc.id}`} className="relative">
              <div className="absolute top-2 right-2 bg-[#FFF2F0] text-[#D9534F] px-2 py-0.5 rounded-md text-xs">🔥 Trending</div>
              <ServiceCard name={svc.name} image={svc.image} onClick={() => onServiceClick(svc.name)} />
            </div>
          ))}
        </div>
      </div>

      {/* Newly Opened Salons */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("newlySalons")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("discover")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {salons.filter((s) => s.isNew).map((salon) => (
            <div key={`new-${salon.id}`} className="relative">
              <div className="absolute top-2 left-2 bg-[#FDE8FF] text-[#7B3DA8] px-2 py-1 rounded-md text-xs">{t("new")}</div>
              <SalonCard
                name={salon.name}
                rating={salon.rating}
                reviewCount={salon.reviewCount}
                priceRange={salon.priceRange}
                distance={salon.distance}
                offer={salon.offer}
                image={salon.image}
                onClick={() => onSalonClick(salon.id)}
                horizontal
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists section removed per request */}

      {/* Seasonal / Occasion Based */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F1F1F]">{t("seasonalOccasion")}</h3>
          <button className="text-sm text-[#6C4AB6]">{t("explore")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          {[
            { id: "bridal", title: "Bridal Specials", image: services[1].image },
            { id: "festive", title: "Festive Glam", image: services[2].image },
            { id: "winter", title: "Winter Skincare", image: services[0].image },
          ].map((s) => (
            <div key={`season-${s.id}`} className="relative">
              <ServiceCard name={s.title} image={s.image} onClick={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}