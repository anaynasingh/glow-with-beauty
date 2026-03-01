import { useEffect } from "react";
import glowWithBeauty from "../../images/logo-glow-with-beauty.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#6C4AB6] to-[#3D2C8D]">
      <div className="flex flex-col items-center gap-6">
        <img
          src={glowWithBeauty}
          alt="Glow with Beauty"
          className="w-64 max-w-xs mb-4 drop-shadow-lg rounded-2xl bg-white/80 p-2"
          style={{ objectFit: 'contain' }}
        />
        <div className="text-center">
          <h1 className="text-white text-3xl mb-2 font-bold">Glow with Beauty</h1>
        </div>
      </div>
    </div>
  );
}
