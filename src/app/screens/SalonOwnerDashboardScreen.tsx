import {
  Calendar,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Gift,
  Image,
  ShoppingBag,
  DollarSign,
  BookOpen,
  ChevronRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useState } from "react";

interface Location {
  id: number;
  name: string;
  address: string;
  earnings: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
}

interface SalonOwnerDashboardScreenProps {
  salonName: string;
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  pendingBookings: number;
  locations?: Location[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SalonOwnerDashboardScreen({
  salonName,
  totalEarnings,
  monthlyEarnings,
  weeklyEarnings,
  pendingBookings,
  locations = [],
  onNavigate,
  onLogout,
}: SalonOwnerDashboardScreenProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Calculate aggregated earnings from all locations
  const aggregatedEarnings = {
    total: locations.reduce((sum, loc) => sum + loc.earnings.total, 0) || totalEarnings,
    thisMonth: locations.reduce((sum, loc) => sum + loc.earnings.thisMonth, 0) || monthlyEarnings,
    thisWeek: locations.reduce((sum, loc) => sum + loc.earnings.thisWeek, 0) || weeklyEarnings,
  };

  // Get current earnings based on selected location
  const currentEarnings = selectedLocationId
    ? locations.find(loc => loc.id === selectedLocationId)?.earnings || aggregatedEarnings
    : aggregatedEarnings;

  // Get current location name
  const currentLocationName = selectedLocationId
    ? locations.find(loc => loc.id === selectedLocationId)?.name
    : "All Locations";
  const managementItems = [
    {
      id: "calendar",
      title: "Manage Calendar",
      description: "Set timings and availability",
      icon: Calendar,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "staff",
      title: "Manage Staff",
      description: "Add and manage your team",
      icon: Users,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "bookings",
      title: "Manage Bookings",
      description: "View and manage appointments",
      icon: BookOpen,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const offersAndServicesItems = [
    {
      id: "offers-management",
      title: "Offers Management",
      description: "Create and manage discounts & promotions",
      icon: Gift,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "services",
      title: "Manage Services",
      description: "Add and organize your services",
      icon: Sparkles,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: "gallery",
      title: "Upload Photos",
      description: "Showcase your work",
      icon: Image,
      color: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: "products",
      title: "Add Products",
      description: "Sell beauty products",
      icon: ShoppingBag,
      color: "bg-teal-100",
      iconColor: "text-teal-600",
    },
  ];

  const analyticsItems = [
    {
      id: "earnings",
      title: "Track Earnings",
      description: "View revenue analytics (Daily & Service-wise)",
      icon: TrendingUp,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const menuItems = [...managementItems, ...offersAndServicesItems, ...analyticsItems];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6C4AB6] to-[#8B5FBF] text-white px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <h1 className="text-2xl font-bold">{salonName}</h1>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Location Selector */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            <label className="text-sm font-medium">Select Location:</label>
          </div>
          <select
            value={selectedLocationId ?? "all"}
            onChange={(e) => setSelectedLocationId(e.target.value === "all" ? null : Number(e.target.value))}
            className="w-full bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:border-white transition-colors text-sm"
          >
            <option value="all" className="bg-[#6C4AB6] text-white">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id} className="bg-[#6C4AB6] text-white">
                {location.name}
              </option>
            ))}
          </select>
          {selectedLocationId && (
            <p className="text-xs opacity-80 mt-2">
              📍 {locations.find((loc) => loc.id === selectedLocationId)?.address}
            </p>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 pb-20">
          {/* Quick Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Today's Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Pending Bookings */}
              <div className="bg-white border-2 border-[#E0D9F0] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-[#6C4AB6]" />
                  <span className="text-xs font-semibold text-[#FF6B6B] bg-[#FFE0E0] px-2 py-1 rounded-full">
                    {pendingBookings}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#1F1F1F]">
                  {pendingBookings}
                </p>
                <p className="text-xs text-[#8A8A8A]">Pending Bookings</p>
              </div>

              {/* Weekly Earnings */}
              <div className="bg-white border-2 border-[#E0D9F0] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-[#10B981]" />
                </div>
                <p className="text-2xl font-bold text-[#1F1F1F]">
                  ₹{currentEarnings.thisWeek.toLocaleString()}
                </p>
                <p className="text-xs text-[#8A8A8A]">This Week</p>
              </div>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-[#6C4AB6] to-[#8B5FBF] text-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90">Monthly Earnings</p>
                  <p className="text-3xl font-bold">₹{currentEarnings.thisMonth.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-10 h-10 opacity-50" />
              </div>
              <div className="bg-white/20 rounded-lg p-3 mt-4">
                <p className="text-xs opacity-90">
                  {selectedLocationId ? "Location" : "Total"} Earnings: ₹{currentEarnings.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Manage Your Salon
            </h2>
            <div className="space-y-3">
              {managementItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F1F1F] text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#8A8A8A]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                </button>
              ))}
            </div>
          </div>

          {/* Offers & Services Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Offers & Services
            </h2>
            <div className="space-y-3">
              {offersAndServicesItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F1F1F] text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#8A8A8A]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                </button>
              ))}
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Analytics & Reports
            </h2>
            <div className="space-y-3">
              {analyticsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F1F1F] text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#8A8A8A]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Settings
            </h2>
            <button
              onClick={() => onNavigate("settings")}
              className="w-full bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F1F1F] text-sm">
                    Salon Settings
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    General preferences and information
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
