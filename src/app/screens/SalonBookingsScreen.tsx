import { ArrowLeft, Clock, User, CheckCircle, XCircle, Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface Booking {
  id: number;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
  isWalkIn?: boolean;
}

interface SalonBookingsScreenProps {
  salonName: string;
  onBack: () => void;
}

export function SalonBookingsScreen({
  salonName,
  onBack,
}: SalonBookingsScreenProps) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customerName: "Shreya Patel",
      service: "Hair Color - Full",
      date: "2026-02-15",
      time: "2:00 PM",
      status: "pending",
      amount: 2500,
    },
    {
      id: 2,
      customerName: "Seema Singh",
      service: "Facial Treatment",
      date: "2026-02-14",
      time: "4:00 PM",
      status: "confirmed",
      amount: 1800,
    },
    {
      id: 3,
      customerName: "Priya Sharma",
      service: "Nail Art",
      date: "2026-02-13",
      time: "10:30 AM",
      status: "completed",
      amount: 1200,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [walkInForm, setWalkInForm] = useState({ customerName: "", service: "", time: "", amount: "" });
  const [walkInErrors, setWalkInErrors] = useState<Record<string, string>>({});

  const handleAddWalkIn = () => {
    const errors: Record<string, string> = {};
    if (!walkInForm.customerName.trim()) errors.customerName = "Name is required";
    if (!walkInForm.service.trim()) errors.service = "Service is required";
    if (!walkInForm.time.trim()) errors.time = "Time is required";
    setWalkInErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const now = new Date();
    const newBooking: Booking = {
      id: Date.now(),
      customerName: walkInForm.customerName.trim() || "Walk-in Customer",
      service: walkInForm.service.trim(),
      date: now.toISOString().split("T")[0],
      time: walkInForm.time.trim(),
      status: "confirmed",
      amount: walkInForm.amount ? Number(walkInForm.amount) : 0,
      isWalkIn: true,
    };
    setBookings([newBooking, ...bookings]);
    setWalkInForm({ customerName: "", service: "", time: "", amount: "" });
    setWalkInErrors({});
    setShowWalkInForm(false);
  };

  const handleStatusChange = (id: number, newStatus: Booking["status"]) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    pending: { bg: "bg-[#FFF3CD]", text: "text-[#FF9800]", icon: "⏳" },
    confirmed: { bg: "bg-[#E0F2F1]", text: "text-[#10B981]", icon: "✓" },
    completed: { bg: "bg-[#E8EAF6]", text: "text-[#6C4AB6]", icon: "✓✓" },
    cancelled: { bg: "bg-[#FFE0E0]", text: "text-[#FF6B6B]", icon: "✕" },
  };

  const stats = [
    {
      label: "Pending",
      count: bookings.filter((b) => b.status === "pending").length,
      color: "text-[#FF9800]",
    },
    {
      label: "Confirmed",
      count: bookings.filter((b) => b.status === "confirmed").length,
      color: "text-[#10B981]",
    },
    {
      label: "Completed",
      count: bookings.filter((b) => b.status === "completed").length,
      color: "text-[#6C4AB6]",
    },
  ];

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
                <label className="block text-sm text-[#1F1F1F] mb-1">Customer Name</label>
                <Input
                  type="text"
                  placeholder="e.g. Anita Sharma (or leave blank)"
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
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#1F1F1F]">
              Manage Bookings
            </h1>
            <p className="text-xs text-[#8A8A8A]">{salonName}</p>
          </div>
          <button
            onClick={() => setShowWalkInForm(true)}
            className="flex items-center gap-1.5 bg-[#6C4AB6] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5C3AA6] transition-colors"
          >
            <Plus className="w-4 h-4" /> Walk-in
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <button
              key={idx}
              onClick={() =>
                setFilterStatus(
                  stat.label.toLowerCase() === "pending"
                    ? "pending"
                    : stat.label.toLowerCase() === "confirmed"
                    ? "confirmed"
                    : "completed"
                )
              }
              className={`text-center p-2 rounded-lg transition-all ${
                filterStatus ===
                (stat.label.toLowerCase() === "pending"
                  ? "pending"
                  : stat.label.toLowerCase() === "confirmed"
                  ? "confirmed"
                  : "completed")
                  ? "bg-[#6C4AB6] text-white"
                  : "bg-[#F3EEFF] text-[#6C4AB6]"
              }`}
            >
              <p className="text-xs font-semibold">{stat.count}</p>
              <p className="text-xs">{stat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
            <p className="text-[#8A8A8A]">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const colors = statusColors[booking.status];
              return (
                <div
                  key={booking.id}
                  className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] transition-all"
                >
                  {/* Booking Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#6C4AB6]" />
                        <h3 className="font-semibold text-[#1F1F1F]">
                          {booking.customerName}
                        </h3>
                        {booking.isWalkIn && (
                          <span className="bg-[#FFF3CD] text-[#FF9800] text-xs font-semibold px-2 py-0.5 rounded-full">
                            Walk-in
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#8A8A8A]">
                        {booking.service}
                      </p>
                    </div>
                    <div className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {colors.icon} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-3 mb-4 text-sm text-[#8A8A8A]">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {booking.time}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E0D9F0]">
                    <span className="text-sm text-[#8A8A8A]">Amount</span>
                    <span className="text-lg font-bold text-[#6C4AB6]">
                      ₹{booking.amount}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {booking.status === "pending" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStatusChange(booking.id, "confirmed")}
                        className="flex items-center justify-center gap-1 bg-[#E0F2F1] text-[#10B981] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#C8E6E1] transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, "cancelled")}
                        className="flex items-center justify-center gap-1 bg-[#FFE0E0] text-[#FF6B6B] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#FFCCCB] transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}

                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => handleStatusChange(booking.id, "completed")}
                      className="w-full flex items-center justify-center gap-2 bg-[#6C4AB6] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#5C3AA6] transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Completed
                    </button>
                  )}

                  {booking.status === "completed" && (
                    <div className="text-center">
                      <p className="text-xs text-[#10B981] font-medium">
                        ✓ Completed on{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {booking.status === "cancelled" && (
                    <div className="text-center">
                      <p className="text-xs text-[#FF6B6B] font-medium">
                        ✕ Cancelled booking
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
