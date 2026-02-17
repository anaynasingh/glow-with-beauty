import { Sparkles, ArrowLeft, Store } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface SignUpScreenProps {
  onSignUp: (role: "user" | "salon") => void;
  onBack: () => void;
}

type SignUpStep = "role-selection" | "form";

export function SignUpScreen({ onSignUp, onBack }: SignUpScreenProps) {
  const [step, setStep] = useState<SignUpStep>("role-selection");
  const [selectedRole, setSelectedRole] = useState<"user" | "salon" | null>(null);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.emailOrPhone = "Email or phone is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm() && selectedRole) {
      onSignUp(selectedRole);
    }
  };

  const handleRoleSelect = (role: "user" | "salon") => {
    setSelectedRole(role);
    setStep("form");
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6">
      {/* Header with Back Button and Language Toggle */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <button
          onClick={() => {
            if (step === "form") {
              setStep("role-selection");
              setSelectedRole(null);
            } else {
              onBack();
            }
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              language === "en"
                ? "bg-[#6C4AB6] text-white"
                : "bg-[#F3EEFF] text-[#6C4AB6]"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              language === "hi"
                ? "bg-[#6C4AB6] text-white"
                : "bg-[#F3EEFF] text-[#6C4AB6]"
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pb-20">
          
          {step === "role-selection" ? (
            <>
              {/* Role Selection Title */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-[#6C4AB6]" />
                </div>
                <h1 className="text-[#1F1F1F] text-2xl mb-2">Create Account</h1>
                <p className="text-[#8A8A8A] text-sm">Choose how you'd like to join us</p>
              </div>

              {/* Role Selection Cards */}
              <div className="space-y-4 mb-6">
                {/* User Role Card */}
                <button
                  onClick={() => handleRoleSelect("user")}
                  className="w-full p-6 border-2 border-[#E0D9F0] rounded-2xl hover:border-[#6C4AB6] hover:bg-[#F9F7FF] transition-all text-left"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#F3EEFF] rounded-xl flex items-center justify-center mr-4">
                      <Sparkles className="w-6 h-6 text-[#6C4AB6]" />
                    </div>
                    <div>
                      <h2 className="text-[#1F1F1F] font-semibold text-lg">Customer</h2>
                      <p className="text-[#8A8A8A] text-sm mt-1">Book beauty services and find your favorite salons</p>
                    </div>
                  </div>
                </button>

                {/* Salon Owner Role Card */}
                <button
                  onClick={() => handleRoleSelect("salon")}
                  className="w-full p-6 border-2 border-[#E0D9F0] rounded-2xl hover:border-[#6C4AB6] hover:bg-[#F9F7FF] transition-all text-left"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#F3EEFF] rounded-xl flex items-center justify-center mr-4">
                      <Store className="w-6 h-6 text-[#6C4AB6]" />
                    </div>
                    <div>
                      <h2 className="text-[#1F1F1F] font-semibold text-lg">Salon Owner</h2>
                      <p className="text-[#8A8A8A] text-sm mt-1">Manage your salon, staff, and grow your business</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Back to Login */}
              <p className="text-center text-sm text-[#8A8A8A]">
                Already have an account?{" "}
                <button
                  onClick={onBack}
                  className="text-[#6C4AB6] font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Form Title */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
                  {selectedRole === "user" ? (
                    <Sparkles className="w-10 h-10 text-[#6C4AB6]" />
                  ) : (
                    <Store className="w-10 h-10 text-[#6C4AB6]" />
                  )}
                </div>
                <h1 className="text-[#1F1F1F] text-2xl mb-2">
                  {selectedRole === "user" ? "Customer Sign Up" : "Salon Owner Sign Up"}
                </h1>
                <p className="text-[#8A8A8A] text-sm">
                  {selectedRole === "user" 
                    ? "Create your account to book services" 
                    : "Register your salon with us"}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Phone Number (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                  {errors.emailOrPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSignUp}
                className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all"
              >
                {selectedRole === "user" ? "Create Account" : "Next: Salon Details"}
              </button>

              {/* Back to Role Selection */}
              <p className="text-center text-sm text-[#8A8A8A]">
                Already have an account?{" "}
                <button
                  onClick={onBack}
                  className="text-[#6C4AB6] font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
