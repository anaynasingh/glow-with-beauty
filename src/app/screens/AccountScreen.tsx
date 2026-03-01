import {
  User,
  Calendar,
  Heart,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronRight,
  Globe,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface AccountScreenProps {
  onMyBookingsClick?: () => void;
  onFavoriteSalonsClick?: () => void;
}

export function AccountScreen({ onMyBookingsClick, onFavoriteSalonsClick }: AccountScreenProps) {
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { icon: Calendar, label: t("myBookings"), color: "#6C4AB6", onClick: onMyBookingsClick },
    { icon: Heart, label: t("favoriteSalons"), color: "#F4A6C1", onClick: onFavoriteSalonsClick },
    { icon: MessageSquare, label: t("myReviews"), color: "#E6C97A", onClick: () => {} },
    { icon: HelpCircle, label: t("helpSupport"), color: "#6C4AB6", onClick: () => {} },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#6C4AB6] to-[#3D2C8D] px-6 pt-8 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-[#6C4AB6]" />
          </div>
          <div>
            <h2 className="text-white text-xl mb-1">Sarah Johnson</h2>
            <p className="text-[#F3EEFF] text-sm">sarah.j@email.com</p>
            <p className="text-[#F3EEFF] text-sm">+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Language Toggle */}
        <div
          className="bg-white rounded-xl p-4 mb-6"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F3EEFF] rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#6C4AB6]" />
              </div>
              <span className="text-[#1F1F1F]">{t("language")}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  language === "en"
                    ? "bg-[#6C4AB6] text-white"
                    : "bg-[#F3EEFF] text-[#6C4AB6]"
                }`}
              >
                {t("english")}
              </button>
              <button 
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  language === "hi"
                    ? "bg-[#6C4AB6] text-white"
                    : "bg-[#F3EEFF] text-[#6C4AB6]"
                }`}
              >
                {t("hindi")}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-all"
                style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-[#1F1F1F]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button className="w-full bg-white rounded-xl p-4 flex items-center justify-center gap-3 text-red-500 active:scale-[0.98] transition-all"
          style={{ boxShadow: "0 2px 12px rgba(108, 74, 182, 0.08)" }}
        >
          <LogOut className="w-5 h-5" />
          <span>{t("logout")}</span>
        </button>

        {/* Version Info */}
        <p className="text-center text-xs text-[#8A8A8A] mt-6">
          {t("versionInfo")}
        </p>
      </div>
    </div>
  );
}
