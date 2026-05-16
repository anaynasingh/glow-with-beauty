import { Scissors, Calendar, DollarSign, User, LogOut } from "lucide-react";

interface FreelancerDashboardScreenProps {
  freelancerName: string;
  servicesOffered: string;
  onLogout: () => void;
}

export function FreelancerDashboardScreen({
  freelancerName,
  servicesOffered,
  onLogout,
}: FreelancerDashboardScreenProps) {
  const tiles = [
    { icon: Scissors, label: "My Services", sub: "Manage your offerings" },
    { icon: Calendar, label: "Bookings", sub: "View appointments" },
    { icon: DollarSign, label: "Earnings", sub: "Track your income" },
    { icon: User, label: "Profile", sub: "Update your details" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#6C4AB6] px-6 pt-10 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs">Welcome back</p>
              <h1 className="text-white font-semibold text-lg leading-tight">{freelancerName || "Freelancer"}</h1>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
        {servicesOffered && (
          <div className="bg-white/10 rounded-xl px-4 py-2">
            <p className="text-white/70 text-xs">Services</p>
            <p className="text-white text-sm">{servicesOffered}</p>
          </div>
        )}
      </div>

      {/* Dashboard tiles */}
      <div className="px-6 pt-6 flex-1">
        <p className="text-[#1F1F1F] font-semibold text-base mb-4">Dashboard</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {tiles.map(({ icon: Icon, label, sub }) => (
            <button
              key={label}
              className="bg-[#F9F7FF] border border-[#E0D9F0] rounded-2xl p-5 text-left hover:border-[#6C4AB6] hover:bg-[#F3EEFF] transition-all"
            >
              <div className="w-10 h-10 bg-[#F3EEFF] rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#6C4AB6]" />
              </div>
              <p className="text-[#1F1F1F] font-medium text-sm">{label}</p>
              <p className="text-[#8A8A8A] text-xs mt-0.5">{sub}</p>
            </button>
          ))}
        </div>

        <div className="bg-[#F3EEFF] rounded-2xl p-5">
          <p className="text-[#6C4AB6] font-semibold text-sm mb-2">Getting Started</p>
          <ul className="text-[#1F1F1F] text-xs space-y-2">
            <li>✓ Complete your profile to attract more customers</li>
            <li>✓ Add photos of your previous work</li>
            <li>✓ Set your availability and pricing</li>
            <li>✓ Wait for admin to approve your profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
