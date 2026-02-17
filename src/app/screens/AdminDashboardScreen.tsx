import {
  CheckCircle,
  XCircle,
  Clock,
  Store,
  Mail,
  MapPin,
  Phone,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { pendingSalonRegistrations } from "../data/mockData";

interface SalonRegistration {
  id: number;
  shopName: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  createdAt: string;
}

interface AdminDashboardScreenProps {
  onLogout: () => void;
}

export function AdminDashboardScreen({ onLogout }: AdminDashboardScreenProps) {
  const [pending, setPending] = useState<SalonRegistration[]>(
    pendingSalonRegistrations.map((s) => ({
      id: s.id,
      shopName: s.shopName,
      email: s.email,
      phone: s.phone,
      address: s.address,
      registrationNumber: s.registrationNumber,
      createdAt: s.createdAt,
    }))
  );
  const [approved, setApproved] = useState<SalonRegistration[]>([]);
  const [rejected, setRejected] = useState<SalonRegistration[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [selectedSalon, setSelectedSalon] = useState<SalonRegistration | null>(
    null
  );
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingSalonId, setRejectingSalonId] = useState<number | null>(null);

  const handleApproveSalon = (salon: SalonRegistration) => {
    setPending(pending.filter((s) => s.id !== salon.id));
    setApproved([...approved, salon]);
    setSelectedSalon(null);
  };

  const handleOpenRejectModal = (salonId: number) => {
    setRejectingSalonId(salonId);
    setShowRejectModal(true);
    setRejectReason("");
  };

  const handleRejectSalon = () => {
    const salon = pending.find((s) => s.id === rejectingSalonId);
    if (salon) {
      setPending(pending.filter((s) => s.id !== rejectingSalonId));
      setRejected([...rejected, salon]);
      setShowRejectModal(false);
      setRejectingSalonId(null);
      setRejectReason("");
      setSelectedSalon(null);
    }
  };

  const renderTabContent = () => {
    let salons: SalonRegistration[] = [];
    if (activeTab === "pending") salons = pending;
    else if (activeTab === "approved") salons = approved;
    else salons = rejected;

    if (salons.length === 0) {
      return (
        <div className="text-center py-12">
          <Store className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">
            No {activeTab} salon registrations
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {salons.map((salon) => (
          <button
            key={salon.id}
            onClick={() => setSelectedSalon(salon)}
            className={`w-full text-left p-4 border-2 rounded-xl transition-all ${
              selectedSalon?.id === salon.id
                ? "border-[#6C4AB6] bg-[#F9F7FF]"
                : "border-[#E0D9F0] hover:border-[#6C4AB6]"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-[#1F1F1F]">{salon.shopName}</h3>
              {activeTab === "pending" && (
                <Clock className="w-5 h-5 text-[#FF9800]" />
              )}
              {activeTab === "approved" && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {activeTab === "rejected" && (
                <XCircle className="w-5 h-5 text-[#FF6B6B]" />
              )}
            </div>
            <p className="text-xs text-[#8A8A8A]">
              Submitted: {new Date(salon.createdAt).toLocaleDateString()}
            </p>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6C4AB6] to-[#8B5FBF] text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Admin Panel</p>
            <h1 className="text-2xl font-bold">Salon Verification</h1>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#FF9800]">{pending.length}</p>
          <p className="text-xs text-[#8A8A8A]">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{approved.length}</p>
          <p className="text-xs text-[#8A8A8A]">Approved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[#FF6B6B]">{rejected.length}</p>
          <p className="text-xs text-[#8A8A8A]">Rejected</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-4">
        {/* Left Panel - List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 border-r border-[#E0D9F0]">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-[#F3EEFF] p-1 rounded-lg">
            {(["pending", "approved", "rejected"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#6C4AB6] text-white"
                    : "bg-transparent text-[#6C4AB6] hover:bg-white/50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>

        {/* Right Panel - Details */}
        {selectedSalon ? (
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">
              {selectedSalon.shopName}
            </h2>

            {/* Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-3 bg-[#F9F7FF] rounded-lg">
                <Mail className="w-5 h-5 text-[#6C4AB6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#8A8A8A]">Email</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {selectedSalon.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F9F7FF] rounded-lg">
                <Phone className="w-5 h-5 text-[#6C4AB6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#8A8A8A]">Phone</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {selectedSalon.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F9F7FF] rounded-lg">
                <MapPin className="w-5 h-5 text-[#6C4AB6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#8A8A8A]">Address</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {selectedSalon.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F9F7FF] rounded-lg">
                <Store className="w-5 h-5 text-[#6C4AB6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#8A8A8A]">GST Registration</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {selectedSalon.registrationNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {activeTab === "pending" && (
              <div className="space-y-3">
                <button
                  onClick={() => handleApproveSalon(selectedSalon)}
                  className="w-full bg-green-600 text-white rounded-xl py-3 font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Approve Registration
                </button>
                <button
                  onClick={() => handleOpenRejectModal(selectedSalon.id)}
                  className="w-full bg-[#FF6B6B] text-white rounded-xl py-3 font-medium hover:bg-[#FF5555] transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" /> Reject Registration
                </button>
              </div>
            )}

            {activeTab === "approved" && (
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-700">
                  Salon Approved
                </p>
              </div>
            )}

            {activeTab === "rejected" && (
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-red-700">
                  Salon Rejected
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#8A8A8A]">
            <p>Select a salon to view details</p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <h2 className="text-xl font-bold text-[#1F1F1F] mb-4">
              Reason for Rejection
            </h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide a reason for rejecting this salon registration..."
              className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 resize-none h-24 mb-4"
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="bg-gray-300 text-[#1F1F1F] rounded-xl py-3 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSalon}
                className="bg-[#FF6B6B] text-white rounded-xl py-3 font-medium hover:bg-[#FF5555] transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
