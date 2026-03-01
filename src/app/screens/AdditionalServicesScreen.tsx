import { ChevronLeft, Home, Camera, Flower, ShoppingBag, MoreHorizontal } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface AdditionalServicesScreenProps {
  onBack: () => void;
  onServiceClick: (service: string) => void;
}

export function AdditionalServicesScreen({ onBack, onServiceClick }: AdditionalServicesScreenProps) {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      name: "Salon",
      icon: Home,
      color: "#6C4AB6",
      description: "All salon services under one roof"
    },
    {
      id: 2,
      name: "Beauty",
      icon: Home,
      color: "#FF6B9D",
      description: "Beauty treatments and care"
    },
    {
      id: 3,
      name: "Spa",
      icon: Home,
      color: "#A3D8F4",
      description: "Relaxing spa experiences"
    },
    {
      id: 4,
      name: "Beauty at Home",
      icon: Home,
      color: "#FF6B9D",
      description: "Professional beauty services at your home"
    },
    {
      id: 5,
      name: "Events",
      icon: Home,
      color: "#FFD700",
      description: "Event styling and services"
    },
    {
      id: 6,
      name: "Photography",
      icon: Camera,
      color: "#6C4AB6",
      description: "Professional photography services"
    },
    {
      id: 7,
      name: "Flower Decoration",
      icon: Flower,
      color: "#F4A6C1",
      description: "Event and decor flowers"
    },
    {
      id: 8,
      name: "Boutique",
      icon: ShoppingBag,
      color: "#E75480",
      description: "Fashion and boutique services"
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
        <h1 className="text-3xl font-bold text-white mb-2">Additional Services</h1>
        <p className="text-[#F3EEFF] text-sm">Explore our other service categories</p>
      </div>

      {/* Services Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onServiceClick(service.name)}
                className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 active:scale-[0.95] transition-all hover:shadow-lg"
                style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-[#1F1F1F] mb-1">{service.name}</h3>
                  <p className="text-xs text-[#8A8A8A]">{service.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
