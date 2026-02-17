import { ArrowLeft, Clock, Check, Plus } from "lucide-react";
import { useState } from "react";

interface SalonTimingsScreenProps {
  salonName: string;
  onBack: () => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function SalonTimingsScreen({
  salonName,
  onBack,
}: SalonTimingsScreenProps) {
  const [timings, setTimings] = useState({
    Monday: { open: "10:00 AM", close: "9:00 PM", closed: false },
    Tuesday: { open: "10:00 AM", close: "9:00 PM", closed: false },
    Wednesday: { open: "10:00 AM", close: "9:00 PM", closed: false },
    Thursday: { open: "10:00 AM", close: "9:00 PM", closed: false },
    Friday: { open: "10:00 AM", close: "10:00 PM", closed: false },
    Saturday: { open: "10:00 AM", close: "10:00 PM", closed: false },
    Sunday: { open: "11:00 AM", close: "8:00 PM", closed: false },
  });

  const [saved, setSaved] = useState(false);

  const handleTimingChange = (
    day: string,
    field: "open" | "close",
    value: string
  ) => {
    setTimings({
      ...timings,
      [day]: { ...timings[day as keyof typeof timings], [field]: value },
    });
    setSaved(false);
  };

  const handleClosedToggle = (day: string) => {
    const currentDay = timings[day as keyof typeof timings];
    setTimings({
      ...timings,
      [day]: { ...currentDay, closed: !currentDay.closed },
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1F1F1F]">Set Timings</h1>
            <p className="text-xs text-[#8A8A8A]">{salonName}</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {/* Info Card */}
        <div className="bg-[#F9F7FF] border border-[#E0D9F0] rounded-xl p-4 mb-6 flex gap-3">
          <Clock className="w-5 h-5 text-[#6C4AB6] flex-shrink-0" />
          <p className="text-sm text-[#1F1F1F]">
            Set your salon's operating hours for each day. Mark days as closed if your salon doesn't operate.
          </p>
        </div>

        {/* Timings List */}
        <div className="space-y-4 mb-6">
          {DAYS.map((day) => {
            const dayData = timings[day as keyof typeof timings];
            return (
              <div
                key={day}
                className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1F1F1F]">{day}</h3>
                  <button
                    onClick={() => handleClosedToggle(day)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      dayData.closed
                        ? "bg-[#FFE0E0] text-[#FF6B6B]"
                        : "bg-[#E0F2F1] text-[#10B981]"
                    }`}
                  >
                    {dayData.closed ? "Closed" : "Open"}
                  </button>
                </div>

                {!dayData.closed && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8A8A8A] mb-1">
                        Opens
                      </label>
                      <input
                        type="time"
                        value={dayData.open.replace(/\s(AM|PM)/, "").match(/\d{1,2}:\d{2}/)?.[0] || "10:00"}
                        onChange={(e) =>
                          handleTimingChange(day, "open", e.target.value)
                        }
                        className="w-full bg-[#F3EEFF] border border-[#E0D9F0] rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8A8A8A] mb-1">
                        Closes
                      </label>
                      <input
                        type="time"
                        value={dayData.close.replace(/\s(AM|PM)/, "").match(/\d{1,2}:\d{2}/)?.[0] || "21:00"}
                        onChange={(e) =>
                          handleTimingChange(day, "close", e.target.value)
                        }
                        className="w-full bg-[#F3EEFF] border border-[#E0D9F0] rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full rounded-xl py-4 font-semibold transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#6C4AB6] text-white hover:bg-[#5C3AA6]"
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" /> Saved Successfully!
            </span>
          ) : (
            "Save Timings"
          )}
        </button>
      </div>
    </div>
  );
}
