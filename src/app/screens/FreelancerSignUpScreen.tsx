import { ArrowLeft, Scissors, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface FreelancerSignUpScreenProps {
  onSignUp: (data: {
    fullName: string;
    email: string;
    phone: string;
    servicesOffered: string;
  }) => void;
  onBack: () => void;
}

export function FreelancerSignUpScreen({ onSignUp, onBack }: FreelancerSignUpScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    servicesOffered: "",
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

    if (!formData.servicesOffered.trim()) {
      newErrors.servicesOffered = "Please list the services you offer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      onSignUp({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        servicesOffered: formData.servicesOffered,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6">
      <div className="flex items-center pt-6 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pb-20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
              <Scissors className="w-10 h-10 text-[#6C4AB6]" />
            </div>
            <h1 className="text-[#1F1F1F] text-2xl mb-2">Freelancer Sign Up</h1>
            <p className="text-[#8A8A8A] text-sm text-center">
              Register as an independent beauty professional
            </p>
          </div>

          <div className="bg-[#FFF3CD] border border-[#FFE69C] rounded-xl p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#FF9800] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#FF6F00]">Verification Required</p>
              <p className="text-xs text-[#FF8A00] mt-1">
                Your profile will be reviewed before being visible to customers.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">Email (Optional)</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">Phone Number (Optional)</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
              {errors.emailOrPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[#1F1F1F] mb-2">
                Services Offered <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="e.g., Haircut, Bridal Makeup, Nail Art, Mehendi..."
                value={formData.servicesOffered}
                onChange={(e) => setFormData({ ...formData, servicesOffered: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
              {errors.servicesOffered && (
                <p className="text-red-500 text-xs mt-1">{errors.servicesOffered}</p>
              )}
              <p className="text-xs text-[#8A8A8A] mt-1">
                List all beauty services you provide
              </p>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all font-medium"
          >
            Create Freelancer Account
          </button>

          <p className="text-center text-sm text-[#8A8A8A]">
            Already have an account?{" "}
            <button onClick={onBack} className="text-[#6C4AB6] font-medium hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
