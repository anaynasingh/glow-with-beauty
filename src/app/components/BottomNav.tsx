import houseIcon from '../../images/house.png';
import cartIcon from '../../images/shopping-cart.png';
import calendarIcon from '../../images/calendar.png';
import gridIcon from '../../images/grid.png';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: houseIcon, label: "Home", isImage: true },
    { id: "services", icon: gridIcon, label: "Services", isImage: true },
    { id: "appointments", icon: calendarIcon, label: "Bookings", isImage: true },
    { id: "boutique", icon: cartIcon, label: "Marketplace", isImage: true },
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
              {tab.isImage ? (
                <img
                  src={Icon}
                  alt={tab.label}
                  className="w-6 h-6"
                  style={{ filter: isActive ? 'grayscale(0%)' : 'grayscale(60%)', opacity: isActive ? 1 : 0.7 }}
                />
              ) : (
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-[#6C4AB6]" : "text-[#8A8A8A]"
                  }`}
                />
              )}
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
