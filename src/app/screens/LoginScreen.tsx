import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Input } from "../components/ui/input";

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function LoginScreen({ onLogin, onSignUp }: LoginScreenProps) {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  return (
    <div className="h-screen flex flex-col bg-white px-6">
      <div className="flex justify-end pt-6 pb-4">
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

      <div className="flex-1 flex flex-col justify-center pb-20">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-[#F3EEFF] rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-[#6C4AB6]" />
          </div>
          <h1 className="text-[#1F1F1F] text-2xl mb-2">Welcome Back</h1>
          <p className="text-[#8A8A8A] text-sm">Sign in to continue</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-[#1F1F1F] mb-2">
              Email or Phone
            </label>
            <Input
              type="text"
              placeholder="Enter your email or phone"
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
          onClick={onLogin}
          className="w-full bg-[#6C4AB6] text-white rounded-xl py-4 mb-4 active:scale-[0.98] transition-all"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-[#8A8A8A]">
          New here?{" "}
          <button onClick={onSignUp} className="text-[#6C4AB6] font-medium hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
