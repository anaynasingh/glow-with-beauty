import { Search, Tag, ChevronRight, Heart, User } from "lucide-react";
import { useState } from "react";
import { ServiceCard } from "../components/ServiceCard";
import { Home, Camera, Flower, MoreHorizontal } from "lucide-react";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { SalonCard } from "../components/SalonCard";
import { StylistCard } from "../components/StylistCard";
import { services, salons, appointments } from "../data/mockData";
// Type fixes for salons and appointments
type Salon = typeof salons[number];
type Appointment = { salon: string } & Record<string, any>;
import { useLanguage } from "../i18n/LanguageContext";
import beautyAtHomePhoto from "../../images/beautyathome-photo.png";
import eventsPhoto from "../../images/events-photo.png";

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



  // Services for HomeScreen (updated to 8 specific services)
  const homeServices = [
    {
      id: 1,
      name: "Salon",
      icon: Home,
      color: "#6C4AB6",
      image: "https://cdn.pixabay.com/photo/2019/03/08/20/17/beauty-salon-4043096_1280.jpg",
      description: "All salon services under one roof"
    },
    {
      id: 2,
      name: "Beauty",
      icon: Home,
      color: "#FF6B9D",
      image: "https://tse1.explicit.bing.net/th/id/OIP.z4n6Y4sLJv-tpboZHn4fkwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Beauty treatments and care"
    },
    {
      id: 3,
      name: "Spa",
      icon: Home,
      color: "#A3D8F4",
      image: "https://media.istockphoto.com/photos/spa-and-wellness-setting-picture-id856952970?k=6&m=856952970&s=612x612&w=0&h=lRirZn5e9BAqaNRJ_8yb2PJsHS7fI5AtjAKwijcwnO4=",
      description: "Relaxing spa experiences"
    },
    {
      id: 4,
      name: "Beauty at Home",
      icon: Home,
      color: "#FF6B9D",
      image: beautyAtHomePhoto,
      description: "Professional beauty services at your home"
    },
    {
      id: 5,
      name: "Events",
      icon: Home,
      color: "#FFD700",
      image: eventsPhoto,
      description: "Event styling and services"
    },
    {
      id: 6,
      name: "Photography",
      icon: Camera,
      color: "#6C4AB6",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=800&q=80",
      description: "Professional photography services"
    },
    {
      id: 7,
      name: "Flower Decoration",
      icon: Flower,
      color: "#F4A6C1",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
      description: "Event and decor flowers"
    },
    {
      id: 8,
      name: "Boutique",
      icon: Home,
      color: "#E75480",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=compress&fit=crop&w=800&q=80",
      description: "Fashion and boutique services"
    },
  ];

  // Define broad subcategories and their matching logic
  const broadCategories = [
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


  // Use homeServices for the top categories section
  const groupedServices = homeServices;

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

        {/* Men/Women Toggle removed as requested */}
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
                image={salon.image || ""}
                onClick={() => (onSalonClick ? onSalonClick(salon.id) : undefined)}
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
              image={salon.image || ""}
              onClick={() => (onSalonClick ? onSalonClick(salon.id) : undefined)}
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
          {(salons as Salon[]).filter((s) => (appointments as Appointment[]).some((a) => a.salon === s.name)).map((salon) => (
            <SalonCard
              key={`personal-${salon.id}`}
              name={salon.name}
              rating={salon.rating}
              reviewCount={salon.reviewCount}
              priceRange={salon.priceRange}
              distance={salon.distance}
              offer={salon.offer}
              image={salon.image || ""}
              onClick={() => (onSalonClick ? onSalonClick(salon.id) : undefined)}
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
                image={salon.image || ""}
                onClick={() => (onSalonClick ? onSalonClick(salon.id) : undefined)}
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
              <ServiceCard name={svc.name} image={svc.image} onClick={() => (onServiceClick ? onServiceClick(svc.name) : undefined)} />
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
                image={salon.image || ""}
                onClick={() => (onSalonClick ? onSalonClick(salon.id) : undefined)}
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