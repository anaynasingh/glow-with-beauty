import { ArrowLeft, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface SalonEarningsScreenProps {
  salonName: string;
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  onBack: () => void;
}

export function SalonEarningsScreen({
  salonName,
  totalEarnings,
  monthlyEarnings,
  weeklyEarnings,
  onBack,
}: SalonEarningsScreenProps) {
  const dailyBreakdown = [
    { day: "Monday", earnings: 2100 },
    { day: "Tuesday", earnings: 1850 },
    { day: "Wednesday", earnings: 2300 },
    { day: "Thursday", earnings: 2050 },
    { day: "Friday", earnings: 3200 },
    { day: "Saturday", earnings: 3500 },
    { day: "Sunday", earnings: 2000 },
  ];

  const topServices = [
    { name: "Hair Color - Full", earnings: 8500, bookings: 5 },
    { name: "Bridal Makeup", earnings: 7200, bookings: 3 },
    { name: "Haircut & Style", earnings: 4500, bookings: 9 },
    { name: "Facial Treatment", earnings: 3800, bookings: 7 },
    { name: "Nail Art", earnings: 2100, bookings: 3 },
  ];

  const maxDailyEarnings = Math.max(...dailyBreakdown.map((d) => d.earnings));

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1F1F1F]">
              Earnings Analytics
            </h1>
            <p className="text-xs text-[#8A8A8A]">{salonName}</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {/* Total Earnings */}
          <div className="bg-gradient-to-br from-[#6C4AB6] to-[#8B5FBF] text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Total Earnings</span>
              <TrendingUp className="w-5 h-5 opacity-50" />
            </div>
            <p className="text-3xl font-bold">
              ₹{totalEarnings.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-2">All time</p>
          </div>

          {/* Monthly & Weekly */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#FF9800]" />
                <span className="text-xs text-[#8A8A8A]">This Month</span>
              </div>
              <p className="text-2xl font-bold text-[#1F1F1F]">
                ₹{monthlyEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">
                ↑ {((monthlyEarnings / (totalEarnings / 12)) * 100 - 100).toFixed(0)}% vs avg
              </p>
            </div>

            <div className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-[#8A8A8A]">This Week</span>
              </div>
              <p className="text-2xl font-bold text-[#1F1F1F]">
                ₹{weeklyEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Average ₹{(weeklyEarnings / 7).toFixed(0)}/day
              </p>
            </div>
          </div>
        </div>

        {/* Daily Breakdown Chart */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Weekly Breakdown
          </h2>
          <div className="bg-white border-2 border-[#E0D9F0] rounded-xl p-6">
            <div className="space-y-4">
              {dailyBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#1F1F1F]">
                      {item.day}
                    </span>
                    <span className="text-sm font-semibold text-[#6C4AB6]">
                      ₹{item.earnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#E0D9F0] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#6C4AB6] to-[#8B5FBF] rounded-full h-2 transition-all"
                      style={{
                        width: `${(item.earnings / maxDailyEarnings) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Top Services
          </h2>
          <div className="space-y-3">
            {topServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F]">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#8A8A8A]">
                      {service.bookings} bookings
                    </p>
                  </div>
                  <span className="text-lg font-bold text-[#6C4AB6]">
                    ₹{service.earnings.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#E0D9F0] rounded-full h-1">
                  <div
                    className="bg-[#6C4AB6] rounded-full h-1 transition-all"
                    style={{
                      width: `${(service.bookings / 9) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {[
              {
                id: 1,
                service: "Hair Color - Full",
                customer: "Shreya Patel",
                amount: 2500,
                time: "2 hours ago",
              },
              {
                id: 2,
                service: "Facial Treatment",
                customer: "Seema Singh",
                amount: 1800,
                time: "4 hours ago",
              },
              {
                id: 3,
                service: "Nail Art",
                customer: "Priya Sharma",
                amount: 1200,
                time: "6 hours ago",
              },
            ].map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white border border-[#E0D9F0] rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {transaction.service}
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    {transaction.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">
                    +₹{transaction.amount}
                  </p>
                  <p className="text-xs text-[#8A8A8A]">{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
