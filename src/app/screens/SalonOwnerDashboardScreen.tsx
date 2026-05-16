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
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface Location {
  id: number;
  name: string;
  address: string;
  earnings?: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
}

type StaffRole = "owner" | "manager" | "receptionist" | "stylist";

const ROLE_LABEL: Record<StaffRole, string> = {
  owner: "Owner",
  manager: "Manager",
  receptionist: "Receptionist",
  stylist: "Stylist",
};

const ROLE_COLOR: Record<StaffRole, string> = {
  owner: "bg-purple-200 text-purple-800",
  manager: "bg-blue-200 text-blue-800",
  receptionist: "bg-green-200 text-green-800",
  stylist: "bg-orange-200 text-orange-800",
};

interface SalonOwnerDashboardScreenProps {
  salonName: string;
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  pendingBookings: number;
  locations?: Location[];
  staffRole?: StaffRole;
  staffName?: string;
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
  staffRole = "owner",
  staffName,
  onNavigate,
  onLogout,
}: SalonOwnerDashboardScreenProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Access rules per role
  const canAddWalkIn = staffRole !== "stylist";
  const canViewEarnings = staffRole === "owner" || staffRole === "manager";
  const canViewSettings = staffRole === "owner";
  const canManageStaff = staffRole === "owner";
  const canViewStaff = staffRole === "owner" || staffRole === "manager";
  const canViewOffers = staffRole === "owner" || staffRole === "manager";
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [walkInForm, setWalkInForm] = useState({ customerName: "", service: "", time: "", amount: "" });
  const [walkInErrors, setWalkInErrors] = useState<Record<string, string>>({});
  const [walkIns, setWalkIns] = useState<{ id: number; customerName: string; service: string; time: string; amount: number }[]>([]);

  const handleAddWalkIn = () => {
    const errors: Record<string, string> = {};
    if (!walkInForm.customerName.trim()) errors.customerName = "Name is required";
    if (!walkInForm.service.trim()) errors.service = "Service is required";
    if (!walkInForm.time.trim()) errors.time = "Time is required";
    setWalkInErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setWalkIns((prev) => [
      {
        id: Date.now(),
        customerName: walkInForm.customerName.trim(),
        service: walkInForm.service.trim(),
        time: walkInForm.time.trim(),
        amount: walkInForm.amount ? Number(walkInForm.amount) : 0,
      },
      ...prev,
    ]);
    setWalkInForm({ customerName: "", service: "", time: "", amount: "" });
    setWalkInErrors({});
    setShowWalkInForm(false);
  };

  // Calculate aggregated earnings from all locations
  const aggregatedEarnings = {
    total: locations.reduce((sum, loc) => sum + (loc.earnings?.total || 0), 0) || totalEarnings,
    thisMonth: locations.reduce((sum, loc) => sum + (loc.earnings?.thisMonth || 0), 0) || monthlyEarnings,
    thisWeek: locations.reduce((sum, loc) => sum + (loc.earnings?.thisWeek || 0), 0) || weeklyEarnings,
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

  const walkInTotal = walkIns.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Walk-in Modal */}
      {showWalkInForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl px-6 pt-6 pb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1F1F1F]">Add Walk-in</h2>
              <button
                onClick={() => { setShowWalkInForm(false); setWalkInErrors({}); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3EEFF]"
              >
                <X className="w-5 h-5 text-[#1F1F1F]" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-1">Customer Name <span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={walkInForm.customerName}
                  onChange={(e) => setWalkInForm({ ...walkInForm, customerName: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {walkInErrors.customerName && <p className="text-red-500 text-xs mt-1">{walkInErrors.customerName}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-1">Service <span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  placeholder="e.g. Haircut, Facial..."
                  value={walkInForm.service}
                  onChange={(e) => setWalkInForm({ ...walkInForm, service: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {walkInErrors.service && <p className="text-red-500 text-xs mt-1">{walkInErrors.service}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-1">Time <span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  placeholder="e.g. 3:30 PM"
                  value={walkInForm.time}
                  onChange={(e) => setWalkInForm({ ...walkInForm, time: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {walkInErrors.time && <p className="text-red-500 text-xs mt-1">{walkInErrors.time}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-1">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 500"
                  value={walkInForm.amount}
                  onChange={(e) => setWalkInForm({ ...walkInForm, amount: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
              </div>
            </div>
            <button
              onClick={handleAddWalkIn}
              className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 font-medium active:scale-[0.98] transition-all"
            >
              Add Walk-in
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6C4AB6] to-[#8B5FBF] text-white px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <h1 className="text-2xl font-bold">{staffName || salonName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_COLOR[staffRole]}`}>
                {ROLE_LABEL[staffRole]}
              </span>
              {staffName && <span className="text-xs opacity-70">{salonName}</span>}
            </div>
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
            <div className={`grid gap-4 mb-4 ${canViewEarnings ? "grid-cols-2" : "grid-cols-1"}`}>
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

              {/* Weekly Earnings — owner/manager only */}
              {canViewEarnings && (
                <div className="bg-white border-2 border-[#E0D9F0] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <p className="text-2xl font-bold text-[#1F1F1F]">
                    ₹{currentEarnings.thisWeek.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#8A8A8A]">This Week</p>
                </div>
              )}
            </div>

            {/* Add Walk-in CTA + list (hidden for stylists) */}
            {canAddWalkIn && (
              <>
                <button
                  onClick={() => setShowWalkInForm(true)}
                  className="w-full flex items-center justify-between bg-[#6C4AB6] text-white rounded-2xl p-4 hover:bg-[#5C3AA6] active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">Add Walk-in</p>
                      <p className="text-xs opacity-80">Record a customer who came directly</p>
                    </div>
                  </div>
                  {walkIns.length > 0 && (
                    <span className="bg-white text-[#6C4AB6] text-xs font-bold px-2.5 py-1 rounded-full">
                      {walkIns.length} today
                    </span>
                  )}
                </button>

                {walkIns.length > 0 && (
                  <div className="mt-4 bg-white border-2 border-[#E0D9F0] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0D9F0]">
                      <p className="text-sm font-semibold text-[#1F1F1F]">Today's Walk-ins</p>
                      <p className="text-sm font-bold text-[#6C4AB6]">₹{walkInTotal.toLocaleString()}</p>
                    </div>
                    {walkIns.map((w, i) => (
                      <div key={w.id} className={`flex items-center justify-between px-4 py-3 ${i < walkIns.length - 1 ? "border-b border-[#F0EDF8]" : ""}`}>
                        <div>
                          <p className="text-sm font-medium text-[#1F1F1F]">{w.customerName}</p>
                          <p className="text-xs text-[#8A8A8A]">{w.service} · {w.time}</p>
                        </div>
                        {w.amount > 0 && (
                          <p className="text-sm font-semibold text-[#10B981]">₹{w.amount.toLocaleString()}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Monthly Stats — owner/manager only */}
          {canViewEarnings && (
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
          )}

          {/* Management Sections */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              {staffRole === "stylist" ? "My Work" : "Manage Your Salon"}
            </h2>
            <div className="space-y-3">
              {managementItems
                .filter((item) => {
                  if (item.id === "staff") return canViewStaff;
                  if (item.id === "calendar") return true;
                  if (item.id === "bookings") return true;
                  return true;
                })
                .map((item) => (
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
                          {item.id === "staff" && !canManageStaff ? "View Staff" :
                           item.id === "bookings" && staffRole === "stylist" ? "My Appointments" :
                           item.id === "calendar" && staffRole === "stylist" ? "My Schedule" :
                           item.title}
                        </p>
                        <p className="text-xs text-[#8A8A8A]">
                          {item.id === "staff" && !canManageStaff ? "View team members" : item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                  </button>
                ))}
            </div>
          </div>

          {/* Offers & Services Section — owner and manager only */}
          {canViewOffers && (
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
                        <p className="font-semibold text-[#1F1F1F] text-sm">{item.title}</p>
                        <p className="text-xs text-[#8A8A8A]">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Section — owner and manager only */}
          {canViewEarnings && (
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
                        <p className="font-semibold text-[#1F1F1F] text-sm">{item.title}</p>
                        <p className="text-xs text-[#8A8A8A]">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8A8A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Settings Section — owner only */}
          {canViewSettings && (
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
          )}
        </div>
      </div>
    </div>
  );
}
