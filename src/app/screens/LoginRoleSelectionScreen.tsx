import { Sparkles, Store } from "lucide-react";

interface LoginRoleSelectionScreenProps {
  onSelectCustomer: () => void;
  onSelectSalonOwner: () => void;
  onBack: () => void;
}

export function LoginRoleSelectionScreen({
  onSelectCustomer,
  onSelectSalonOwner,
  onBack,
}: LoginRoleSelectionScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-white px-6">
      {/* Header with Back Button */}
      <div className="flex-1 flex flex-col pb-20">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-[#6C4AB6]" />
            </div>
            <h1 className="text-[#1F1F1F] text-2xl mb-2">Sign In</h1>
            <p className="text-[#8A8A8A] text-sm">Choose how you'd like to continue</p>
          </div>
          <div className="space-y-4 mb-0">
            {/* Customer Sign In */}
            <button
              onClick={onSelectCustomer}
              className="w-full p-6 border-2 border-[#E0D9F0] rounded-2xl hover:border-[#6C4AB6] hover:bg-[#F9F7FF] transition-all text-left"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F3EEFF] rounded-xl flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6 text-[#6C4AB6]" />
                </div>
                <div>
                  <h2 className="text-[#1F1F1F] font-semibold text-lg">Customer</h2>
                  <p className="text-[#8A8A8A] text-sm mt-1">
                    Sign in to book beauty services and manage your appointments
                  </p>
                </div>
              </div>
            </button>

            {/* Salon Owner Sign In */}
            <button
              onClick={onSelectSalonOwner}
              className="w-full p-6 border-2 border-[#E0D9F0] rounded-2xl hover:border-[#6C4AB6] hover:bg-[#F9F7FF] transition-all text-left"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F3EEFF] rounded-xl flex items-center justify-center mr-4">
                  <Store className="w-6 h-6 text-[#6C4AB6]" />
                </div>
                <div>
                  <h2 className="text-[#1F1F1F] font-semibold text-lg">Salon Owner</h2>
                  <p className="text-[#8A8A8A] text-sm mt-1">
                    Sign in to manage your salon, staff, and earnings
                  </p>
                </div>
              </div>
            </button>
          </div>
          {/* Registration Link immediately below the boxes */}
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[#8A8A8A] text-sm mb-2">Don't have an account?</span>
            <button
              onClick={onBack}
              className="text-[#6C4AB6] font-semibold underline text-sm hover:text-[#3D2C8D] transition-colors"
            >
              Click here to register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


