import { ArrowLeft, Store, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface SalonOwnerSignUpScreenProps {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  onSignUp: (salonData: {
    shopName: string;
    address: string;
    registrationNumber: string;
  }) => void;
  onBack: () => void;
}

export function SalonOwnerSignUpScreen({
  ownerName,
  ownerEmail,
  ownerPhone,
  onSignUp,
  onBack,
}: SalonOwnerSignUpScreenProps) {
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    registrationNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number (GST) is required";
    } else if (!/^[A-Z0-9]{15}$/.test(formData.registrationNumber.replace(/\s/g, ""))) {
      newErrors.registrationNumber =
        "Invalid GST registration number format (should be 15 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      onSignUp(formData);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6">
      {/* Header with Back Button */}
      <div className="flex items-center pt-6 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pb-20">
          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
              <Store className="w-10 h-10 text-[#6C4AB6]" />
            </div>
            <h1 className="text-[#1F1F1F] text-2xl mb-2">Salon Details</h1>
            <p className="text-[#8A8A8A] text-sm text-center">
              Tell us about your salon. All information will be verified by our admin.
            </p>
          </div>

          {/* Owner Info Display */}
          <div className="bg-[#F9F7FF] rounded-2xl p-4 mb-6 border border-[#E0D9F0]">
            <p className="text-xs text-[#8A8A8A] mb-2">Owner Information</p>
            <p className="text-sm text-[#1F1F1F] font-medium">{ownerName}</p>
            <p className="text-xs text-[#8A8A8A]">{ownerEmail || ownerPhone}</p>
          </div>

          {/* Verification Notice */}
          <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-xl p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF9800] flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#FF6F00]">Verification Required</p>
              <p className="text-xs text-[#FF8A00] mt-1">
                Your salon registration will be verified by our admin. Once approved, you can start managing your salon.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {/* Shop Name */}
            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">
                Shop Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your salon/shop name"
                value={formData.shopName}
                onChange={(e) =>
                  setFormData({ ...formData, shopName: e.target.value })
                }
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.shopName && (
                <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">
                Business Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your salon's full address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Registration Number (GST) */}
            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">
                GST Registration Number <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., 27AABCT1234D1Z5"
                value={formData.registrationNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registrationNumber: e.target.value.toUpperCase(),
                  })
                }
                maxLength={15}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.registrationNumber}
                </p>
              )}
              <p className="text-xs text-[#8A8A8A] mt-1">
                15-character GST identification number
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#F3EEFF] rounded-xl p-4 mb-6">
            <p className="text-xs font-medium text-[#6C4AB6] mb-2">
              What happens next?
            </p>
            <ul className="text-xs text-[#1F1F1F] space-y-1">
              <li>✓ Our admin will verify your salon details</li>
              <li>✓ We'll confirm your business legitimacy</li>
              <li>✓ Once approved, you can manage everything</li>
              <li>✓ Approval usually takes 1-2 business days</li>
            </ul>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all font-medium"
          >
            Submit for Verification
          </button>

          {/* Disclaimer */}
          <p className="text-center text-xs text-[#8A8A8A]">
            By submitting, you confirm that all information provided is accurate and you have the authority to register this salon.
          </p>
        </div>
      </div>
    </div>
  );
}
