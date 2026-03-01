import { Home, Sparkles, Calendar, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "services", icon: Sparkles, label: "Services" },
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "account", icon: User, label: "Account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(108,74,182,0.1)] shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-[#6C4AB6]" : "text-[#8A8A8A]"
                }`}
              />
              <span
                className={`text-[10px] ${
                  isActive ? "text-[#6C4AB6]" : "text-[#8A8A8A]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
