import { Store } from "lucide-react";
import { Input } from "../components/ui/input";

interface SalonOwnerLoginScreenProps {
  onSignIn: () => void;
  onBack: () => void;
}

export function SalonOwnerLoginScreen({
  onSignIn,
  onBack,
}: SalonOwnerLoginScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-white px-6">
      {/* Header with Back Button */}
      <div className="flex items-center pt-6 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
        >
          <span className="text-xl text-[#1F1F1F]">&#8592;</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center pb-20">
        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
            <Store className="w-10 h-10 text-[#6C4AB6]" />
          </div>
          <h1 className="text-[#1F1F1F] text-2xl mb-2">Services Sign In</h1>
          <p className="text-[#8A8A8A] text-sm text-center">
            Access your services dashboard and manage your business
          </p>
        </div>

        {/* Simple credentials form (mock) */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-[#1F1F1F] mb-2">
              Email or Phone
            </label>
            <Input
              type="text"
              placeholder="Enter your registered email or phone"
              className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
            />
          </div>
          <div>
            <label className="block text-sm text-[#1F1F1F] mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <button
          onClick={onSignIn}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-[#8A8A8A]">
          This is a demo sign-in. In a real app, your credentials would be
          securely verified before accessing the dashboard.
        </p>
      </div>
    </div>
  );
}


