import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface SalonOwnerVerificationScreenProps {
  salonName: string;
  registrationDate: string;
  onBack: () => void;
}

export function SalonOwnerVerificationScreen({
  salonName,
  registrationDate,
  onBack,
}: SalonOwnerVerificationScreenProps) {
  const [isApproved] = useState(false); // This would come from backend
  const registrationDateObj = new Date(registrationDate);
  const estimatedApprovalDate = new Date(
    registrationDateObj.getTime() + 2 * 24 * 60 * 60 * 1000
  );

  return (
    <div className="h-screen flex flex-col bg-white px-6">
      {/* Header */}
      <div className="flex items-center pt-6 pb-4">
        <h1 className="text-[#1F1F1F] text-xl font-semibold">Registration Status</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pb-20">
          {/* Status Card */}
          <div className="bg-gradient-to-br from-[#F3EEFF] to-[#F9F7FF] rounded-2xl p-8 mb-6 text-center">
            <div className="flex justify-center mb-4">
              {isApproved ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <Clock className="w-16 h-16 text-[#FF9800]" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">
              {isApproved ? "Registration Approved! ✓" : "Pending Verification"}
            </h2>
            <p className="text-[#8A8A8A]">
              {isApproved
                ? "Your salon is verified and ready to go!"
                : "Your salon registration is under review"}
            </p>
          </div>

          {/* Salon Details Card */}
          <div className="bg-[#F9F7FF] border-2 border-[#E0D9F0] rounded-2xl p-6 mb-6">
            <p className="text-xs text-[#8A8A8A] mb-2">SALON NAME</p>
            <p className="text-lg font-semibold text-[#1F1F1F] mb-4">{salonName}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#8A8A8A] mb-1">REGISTERED ON</p>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {registrationDateObj.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#8A8A8A] mb-1">ESTIMATED APPROVAL</p>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {estimatedApprovalDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Verification Timeline
            </h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6C4AB6] flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="w-0.5 h-12 bg-[#E0D9F0] mt-2"></div>
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-[#1F1F1F]">Registration Submitted</p>
                  <p className="text-sm text-[#8A8A8A]">
                    {registrationDateObj.toLocaleDateString()} -{" "}
                    {registrationDateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-[#6C4AB6] mt-1">✓ Complete</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isApproved
                        ? "bg-[#6C4AB6] text-white"
                        : "bg-[#F3EEFF] text-[#6C4AB6]"
                    }`}
                  >
                    2
                  </div>
                  <div className="w-0.5 h-12 bg-[#E0D9F0] mt-2"></div>
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-[#1F1F1F]">Being Verified</p>
                  <p className="text-sm text-[#8A8A8A]">
                    {isApproved ? "Completed" : "In Progress"}
                  </p>
                  {!isApproved && (
                    <p className="text-xs text-[#FF9800] mt-1">⏳ Pending...</p>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isApproved
                        ? "bg-green-500 text-white"
                        : "bg-[#F3EEFF] text-[#8A8A8A]"
                    }`}
                  >
                    3
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[#1F1F1F]">Approved</p>
                  <p className="text-sm text-[#8A8A8A]">
                    {isApproved
                      ? "Your salon is live!"
                      : "Estimated " +
                        estimatedApprovalDate.toLocaleDateString()}
                  </p>
                  {isApproved && (
                    <p className="text-xs text-green-600 mt-1">✓ Complete</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#FF9800] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#FF6F00] text-sm mb-1">What's Happening?</p>
                <ul className="text-xs text-[#FF8A00] space-y-1">
                  <li>✓ Our team is reviewing your business details</li>
                  <li>✓ We're verifying your GST registration</li>
                  <li>✓ Checking your salon location legitimacy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              What You'll Get When Approved
            </h3>

            <div className="space-y-3">
              {[
                { title: "Dashboard", desc: "Manage all salon operations" },
                { title: "Staff Management", desc: "Add and manage your team" },
                { title: "Booking System", desc: "Accept customer bookings" },
                { title: "Analytics", desc: "Track earnings and growth" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-3 bg-[#F9F7FF] rounded-xl border border-[#E0D9F0]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#6C4AB6] flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-[#1F1F1F] text-sm">
                      {feature.title}
                    </p>
                    <p className="text-xs text-[#8A8A8A]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onBack}
            className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all font-medium"
          >
            {isApproved ? "Go to Dashboard" : "Check Status Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
