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
} from "lucide-react";

interface SalonOwnerDashboardScreenProps {
  salonName: string;
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  pendingBookings: number;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SalonOwnerDashboardScreen({
  salonName,
  totalEarnings,
  monthlyEarnings,
  weeklyEarnings,
  pendingBookings,
  onNavigate,
  onLogout,
}: SalonOwnerDashboardScreenProps) {
  const menuItems = [
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
    {
      id: "offers",
      title: "Add Offers & Deals",
      description: "Create discounts and promotions",
      icon: Gift,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
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
    {
      id: "earnings",
      title: "Track Earnings",
      description: "View your revenue analytics",
      icon: TrendingUp,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Salon info & preferences",
      icon: Settings,
      color: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

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
                  ₹{weeklyEarnings.toLocaleString()}
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
                  <p className="text-3xl font-bold">₹{monthlyEarnings.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-10 h-10 opacity-50" />
              </div>
              <div className="bg-white/20 rounded-lg p-3 mt-4">
                <p className="text-xs opacity-90">Total Earnings: ₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Manage Your Salon
            </h2>
            <div className="space-y-3">
              {menuItems.map((item) => (
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
        </div>
      </div>
    </div>
  );
}
