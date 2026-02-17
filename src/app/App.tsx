import { useState } from "react";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { LoginRoleSelectionScreen } from "./screens/LoginRoleSelectionScreen";
import { SalonOwnerLoginScreen } from "./screens/SalonOwnerLoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ServiceListingScreen } from "./screens/ServiceListingScreen";
import { SalonDetailScreen } from "./screens/SalonDetailScreen";
import { BookingServiceScreen } from "./screens/BookingServiceScreen";
import { BookingStylistScreen } from "./screens/BookingStylistScreen";
import { BookingDateTimeScreen } from "./screens/BookingDateTimeScreen";
import { BookingSummaryScreen } from "./screens/BookingSummaryScreen";
import { AppointmentsScreen } from "./screens/AppointmentsScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { MyBookingsScreen } from "./screens/MyBookingsScreen";
import { FavoriteSalonsScreen } from "./screens/FavoriteSalonsScreen";
import { TodaysDealScreen } from "./screens/TodaysDealScreen";
import { RescheduleAppointmentScreen } from "./screens/RescheduleAppointmentScreen";
import { AdditionalServicesScreen } from "./screens/AdditionalServicesScreen";
import { AtHomeBeautyScreen } from "./screens/AtHomeBeautyScreen";
import { PhotographyScreen } from "./screens/PhotographyScreen";
import { FlowerDecorationScreen } from "./screens/FlowerDecorationScreen";
import { BoutiqueScreen } from "./screens/BoutiqueScreen";
import { SalonOwnerSignUpScreen } from "./screens/SalonOwnerSignUpScreen";
import { SalonOwnerVerificationScreen } from "./screens/SalonOwnerVerificationScreen";
import { SalonOwnerDashboardScreen } from "./screens/SalonOwnerDashboardScreen";
import { SalonTimingsScreen } from "./screens/SalonTimingsScreen";
import { SalonStaffScreen } from "./screens/SalonStaffScreen";
import { SalonOffersScreen } from "./screens/SalonOffersScreen";
import { SalonEarningsScreen } from "./screens/SalonEarningsScreen";
import { SalonBookingsScreen } from "./screens/SalonBookingsScreen";
import { AdminDashboardScreen } from "./screens/AdminDashboardScreen";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { salons, salonOwners, pendingSalonRegistrations } from "./data/mockData";
import type { SalonOwner } from "./data/mockData";

interface Appointment {
  id: number;
  salon: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

type UserRole = "user" | "salon-owner" | "admin" | null;

type Screen =
  | { type: "splash" }
  | { type: "login-role-selection" }
  | { type: "login" }
  | { type: "sign-up" }
  | { type: "home" }
  | { type: "service-listing"; serviceName: string }
  | { type: "salon-detail"; salonId: number }
  | { type: "booking-service"; salonId: number }
  | { type: "booking-stylist"; salonId: number; serviceIds: number[] }
  | { type: "booking-datetime"; salonId: number; serviceIds: number[]; stylistId: number }
  | {
      type: "booking-summary";
      salonId: number;
      serviceIds: number[];
      stylistId: number;
      date: string;
      time: string;
    }
  | { type: "appointments" }
  | { type: "account" }
  | { type: "my-bookings" }
  | { type: "favorite-salons" }
  | { type: "todays-deals" }
  | { type: "reschedule-appointment"; appointmentId: number }
  | { type: "additional-services" }
  | { type: "at-home-beauty" }
  | { type: "photography" }
  | { type: "flower-decoration" }
  | { type: "boutique" }
  // Salon Owner Screens
  | { type: "salon-owner-signup"; ownerName: string; ownerEmail: string; ownerPhone: string }
  | { type: "salon-owner-verification"; salonId: number }
  | { type: "salon-owner-dashboard" }
  | { type: "salon-calendar" }
  | { type: "salon-staff" }
  | { type: "salon-bookings" }
  | { type: "salon-offers" }
  | { type: "salon-earnings" }
  | { type: "salon-gallery" }
  | { type: "salon-products" }
  | { type: "salon-settings" }
  // Admin Screens
  | { type: "admin-dashboard" };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "splash" });
  const [activeTab, setActiveTab] = useState("home");
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentSalonId, setCurrentSalonId] = useState<number | null>(null);
  const [allSalons, setAllSalons] = useState<SalonOwner[]>([
    ...salonOwners,
    ...pendingSalonRegistrations,
  ]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserPhone, setCurrentUserPhone] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      setScreen({ type: "home" });
    } else if (tab === "services") {
      setScreen({ type: "additional-services" });
    } else if (tab === "appointments") {
      setScreen({ type: "appointments" });
    } else if (tab === "boutique") {
      setScreen({ type: "boutique" });
    }
  };

  const showBottomNav =
    screen.type !== "splash" && screen.type !== "login";

  const showBottomNavForScreen =
    showBottomNav &&
    (screen.type === "home" ||
      screen.type === "additional-services" ||
      screen.type === "appointments");

  const getCurrentSalon = (): SalonOwner | undefined => {
    return allSalons.find((s) => s.id === currentSalonId);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-[#F8F7FF] to-white relative">
      {/* Screens */}
      {screen.type === "splash" && (
        <SplashScreen onComplete={() => setScreen({ type: "sign-up" })} />
      )}

      {screen.type === "login-role-selection" && (
        <LoginRoleSelectionScreen
          onSelectCustomer={() => setScreen({ type: "login" })}
          onSelectSalonOwner={() => setScreen({ type: "salon-owner-login" })}
          onBack={() => setScreen({ type: "sign-up" })}
        />
      )}

      {screen.type === "login" && (
        <LoginScreen
          onLogin={() => {
            setScreen({ type: "home" });
            setActiveTab("home");
          }}
          onSignUp={() => setScreen({ type: "sign-up" })}
        />
      )}

      {screen.type === "salon-owner-login" && (
        <SalonOwnerLoginScreen
          onSignIn={() => {
            setUserRole("salon-owner");
            const approvedSalon =
              allSalons.find((s) => s.status === "approved") || allSalons[0];
            if (approvedSalon) {
              setCurrentSalonId(approvedSalon.id);
            }
            setScreen({ type: "salon-owner-dashboard" });
          }}
          onBack={() => setScreen({ type: "login-role-selection" })}
        />
      )}

      {screen.type === "sign-up" && (
        <SignUpScreen
          onSignUp={(role) => {
            if (role === "user") {
              setUserRole("user");
              setScreen({ type: "home" });
              setActiveTab("home");
            } else if (role === "salon") {
              setUserRole("salon-owner");
              // In a real app, we'd have form data passed here
              setCurrentUserName("Sample Salon Owner");
              setCurrentUserEmail("owner@salon.com");
              setCurrentUserPhone("9876543210");
              setScreen({
                type: "salon-owner-signup",
                ownerName: "Sample Salon Owner",
                ownerEmail: "owner@salon.com",
                ownerPhone: "9876543210",
              });
            }
          }}
          onBack={() => setScreen({ type: "login-role-selection" })}
        />
      )}

      {screen.type === "home" && (
        <HomeScreen
          onServiceClick={(serviceName) =>
            setScreen({ type: "service-listing", serviceName })
          }
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
          onSpecialOffersClick={() =>
            setScreen({ type: "todays-deals" })
          }
          onFavoriteSalonsClick={() =>
            setScreen({ type: "favorite-salons" })
          }
          onAccountClick={() => {
            setScreen({ type: "account" });
            setActiveTab("home"); // Keep home tab active since account is not in nav
          }}
        />
      )}

      {screen.type === "service-listing" && (
        <ServiceListingScreen
          serviceName={screen.serviceName}
          onBack={() => setScreen({ type: "home" })}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "salon-detail" && (
        <SalonDetailScreen
          salonId={screen.salonId}
          onBack={() => setScreen({ type: "home" })}
          onBookNow={(salonId) =>
            setScreen({ type: "booking-service", salonId })
          }
        />
      )}

      {screen.type === "booking-service" && (
        <BookingServiceScreen
          salonId={screen.salonId}
          onBack={() => setScreen({ type: "salon-detail", salonId: screen.salonId })}
          onContinue={(serviceIds) =>
            setScreen({
              type: "booking-stylist",
              salonId: screen.salonId,
              serviceIds,
            })
          }
        />
      )}

      {screen.type === "booking-stylist" && (
        <BookingStylistScreen
          salonId={screen.salonId}
          onBack={() =>
            setScreen({ type: "booking-service", salonId: screen.salonId })
          }
          onContinue={(stylistId) =>
            setScreen({
              type: "booking-datetime",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId,
            })
          }
        />
      )}

      {screen.type === "booking-datetime" && (
        <BookingDateTimeScreen
          onBack={() =>
            setScreen({
              type: "booking-stylist",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
            })
          }
          onContinue={(date, time) =>
            setScreen({
              type: "booking-summary",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId: screen.stylistId,
              date,
              time,
            })
          }
        />
      )}

      {screen.type === "booking-summary" && (
        <BookingSummaryScreen
          salonId={screen.salonId}
          serviceIds={screen.serviceIds}
          stylistId={screen.stylistId}
          date={screen.date}
          time={screen.time}
          onBack={() =>
            setScreen({
              type: "booking-datetime",
              salonId: screen.salonId,
              serviceIds: screen.serviceIds,
              stylistId: screen.stylistId,
            })
          }
          onConfirm={() => {
            const salon = salons.find((s) => s.id === screen.salonId);
            const selectedServices = salon?.services.filter((s) =>
              screen.serviceIds.includes(s.id)
            );
            const stylist = salon?.stylists.find((s) => s.id === screen.stylistId);

            if (salon && selectedServices && stylist) {
              const serviceNames = selectedServices.map((s) => s.name).join(", ");
              const newAppointment: Appointment = {
                id: Date.now(),
                salon: salon.name,
                service: serviceNames,
                stylist: stylist.name,
                date: screen.date,
                time: screen.time,
                status: "upcoming",
              };
              setBookedAppointments([...bookedAppointments, newAppointment]);
            }

            toast.success("Booking confirmed! 🎉", {
              description: "You'll receive a confirmation shortly.",
            });
            setScreen({ type: "appointments" });
            setActiveTab("appointments");
          }}
        />
      )}

      {screen.type === "search" && (
        <SearchScreen
          initialQuery={screen.query || ""}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "appointments" && (
        <AppointmentsScreen
          appointments={bookedAppointments}
          onReschedule={(appointmentId) =>
            setScreen({ type: "reschedule-appointment", appointmentId })
          }
        />
      )}

      {screen.type === "account" && (
        <AccountScreen
          onMyBookingsClick={() => setScreen({ type: "my-bookings" })}
          onBack={() => {
            setScreen({ type: "home" });
            setActiveTab("home");
          }}
        />
      )}

      {screen.type === "my-bookings" && (
        <MyBookingsScreen
          appointments={bookedAppointments}
          onBack={() => setScreen({ type: "account" })}
        />
      )}

      {screen.type === "favorite-salons" && (
        <FavoriteSalonsScreen
          salons={salons}
          onBack={() => setScreen({ type: "account" })}
          onSalonClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "todays-deals" && (
        <TodaysDealScreen
          onBack={() => setScreen({ type: "home" })}
          onDealClick={(salonId) =>
            setScreen({ type: "salon-detail", salonId })
          }
        />
      )}

      {screen.type === "reschedule-appointment" && (
        <RescheduleAppointmentScreen
          appointment={
            bookedAppointments.find((apt) => apt.id === screen.appointmentId) ||
            bookedAppointments[0]
          }
          onBack={() => setScreen({ type: "appointments" })}
          onConfirm={(appointmentId, newDate, newTime) => {
            setBookedAppointments((prevAppointments) =>
              prevAppointments.map((apt) =>
                apt.id === appointmentId
                  ? { ...apt, date: newDate, time: newTime }
                  : apt
              )
            );
          }}
        />
      )}

      {screen.type === "additional-services" && (
        <AdditionalServicesScreen
          onBack={() => setScreen({ type: "account" })}
          onServiceClick={(serviceName) => {
            if (serviceName === "At Home Beauty Services") {
              setScreen({ type: "at-home-beauty" });
            } else if (serviceName === "Photography") {
              setScreen({ type: "photography" });
            } else if (serviceName === "Flower Decoration") {
              setScreen({ type: "flower-decoration" });
            } else if (serviceName === "Boutique") {
              setScreen({ type: "boutique" });
            }
          }}
        />
      )}

      {screen.type === "at-home-beauty" && (
        <AtHomeBeautyScreen
          onBack={() => setScreen({ type: "additional-services" })}
        />
      )}

      {screen.type === "photography" && (
        <PhotographyScreen
          onBack={() => setScreen({ type: "additional-services" })}
        />
      )}

      {screen.type === "flower-decoration" && (
        <FlowerDecorationScreen
          onBack={() => setScreen({ type: "additional-services" })}
        />
      )}

      {screen.type === "boutique" && (
        <BoutiqueScreen
          onBack={() => {
            setScreen({ type: "home" });
            setActiveTab("home");
          }}
        />
      )}

      {/* Salon Owner Screens */}
      {screen.type === "salon-owner-signup" && (
        <SalonOwnerSignUpScreen
          ownerName={screen.ownerName}
          ownerEmail={screen.ownerEmail}
          ownerPhone={screen.ownerPhone}
          onSignUp={(salonData) => {
            const newSalon: SalonOwner = {
              id: Math.max(...allSalons.map((s) => s.id), 0) + 1,
              userId: Date.now(),
              status: "pending",
              createdAt: new Date().toISOString(),
              ...salonData,
              email: screen.ownerEmail,
              phone: screen.ownerPhone,
            };
            setAllSalons([...allSalons, newSalon]);
            setCurrentSalonId(newSalon.id);
            setScreen({ type: "salon-owner-verification", salonId: newSalon.id });
            toast.success("Salon registered! Waiting for verification...", {
              description: "Admin will review your details soon.",
            });
          }}
          onBack={() => setScreen({ type: "sign-up" })}
        />
      )}

      {screen.type === "salon-owner-verification" && (
        <SalonOwnerVerificationScreen
          salonName={getCurrentSalon()?.shopName || "Your Salon"}
          registrationDate={getCurrentSalon()?.createdAt || new Date().toISOString()}
          onBack={() => {
            if (getCurrentSalon()?.status === "approved") {
              setScreen({ type: "salon-owner-dashboard" });
            } else {
              setScreen({ type: "login" });
            }
          }}
        />
      )}

      {screen.type === "salon-owner-dashboard" && (
        <SalonOwnerDashboardScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          totalEarnings={getCurrentSalon()?.earnings?.total || 0}
          monthlyEarnings={getCurrentSalon()?.earnings?.thisMonth || 0}
          weeklyEarnings={getCurrentSalon()?.earnings?.thisWeek || 0}
          pendingBookings={3}
          onNavigate={(page) => {
            switch (page) {
              case "calendar":
                setScreen({ type: "salon-calendar" });
                break;
              case "staff":
                setScreen({ type: "salon-staff" });
                break;
              case "bookings":
                setScreen({ type: "salon-bookings" });
                break;
              case "offers":
                setScreen({ type: "salon-offers" });
                break;
              case "gallery":
                setScreen({ type: "salon-gallery" });
                break;
              case "products":
                setScreen({ type: "salon-products" });
                break;
              case "earnings":
                setScreen({ type: "salon-earnings" });
                break;
              case "settings":
                setScreen({ type: "salon-settings" });
                break;
            }
          }}
          onLogout={() => {
            setUserRole(null);
            setCurrentSalonId(null);
            setScreen({ type: "login" });
          }}
        />
      )}

      {screen.type === "salon-calendar" && (
        <SalonTimingsScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          onBack={() => setScreen({ type: "salon-owner-dashboard" })}
        />
      )}

      {screen.type === "salon-staff" && (
        <SalonStaffScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          initialStaff={getCurrentSalon()?.staff || []}
          onBack={() => setScreen({ type: "salon-owner-dashboard" })}
        />
      )}

      {screen.type === "salon-bookings" && (
        <SalonBookingsScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          onBack={() => setScreen({ type: "salon-owner-dashboard" })}
        />
      )}

      {screen.type === "salon-offers" && (
        <SalonOffersScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          onBack={() => setScreen({ type: "salon-owner-dashboard" })}
        />
      )}

      {screen.type === "salon-earnings" && (
        <SalonEarningsScreen
          salonName={getCurrentSalon()?.shopName || "My Salon"}
          totalEarnings={getCurrentSalon()?.earnings?.total || 0}
          monthlyEarnings={getCurrentSalon()?.earnings?.thisMonth || 0}
          weeklyEarnings={getCurrentSalon()?.earnings?.thisWeek || 0}
          onBack={() => setScreen({ type: "salon-owner-dashboard" })}
        />
      )}

      {screen.type === "salon-gallery" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Gallery Feature</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Upload your salon photos here</p>
            <button
              onClick={() => setScreen({ type: "salon-owner-dashboard" })}
              className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {screen.type === "salon-products" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Products Management</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Manage your products here</p>
            <button
              onClick={() => setScreen({ type: "salon-owner-dashboard" })}
              className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {screen.type === "salon-settings" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Salon Settings</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Manage your salon preferences</p>
            <button
              onClick={() => setScreen({ type: "salon-owner-dashboard" })}
              className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Admin Screens */}
      {screen.type === "admin-dashboard" && (
        <AdminDashboardScreen
          pendingSalonings={allSalons}
          onApproveSalon={(salonId) => {
            setAllSalons(
              allSalons.map((s) =>
                s.id === salonId
                  ? {
                      ...s,
                      status: "approved",
                      approvedAt: new Date().toISOString(),
                    }
                  : s
              )
            );
            toast.success("Salon approved!", {
              description: "The salon owner has been notified.",
            });
          }}
          onRejectSalon={(salonId) => {
            setAllSalons(
              allSalons.map((s) =>
                s.id === salonId ? { ...s, status: "rejected" } : s
              )
            );
            toast.error("Salon rejected", {
              description: "The salon owner has been notified.",
            });
          }}
          onBack={() => setScreen({ type: "login" })}
        />
      )}

      {/* Bottom Navigation */}
      {showBottomNavForScreen && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <Toaster />
    </div>
  );
}