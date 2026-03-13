import { useState } from "react";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { LoginRoleSelectionScreen } from "./screens/LoginRoleSelectionScreen";
import { SalonOwnerLoginScreen } from "./screens/SalonOwnerLoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CategoryScreen } from "./screens/CategoryScreen";
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
import BoutiquePage from "./screens/BoutiquePage";
import { BoutiqueScreen } from "./screens/BoutiqueScreen";
import { SalonCategoryScreen } from "./screens/SalonCategoryScreen";
import BeautyCategoryScreen from "./screens/BeautyCategoryScreen";
import SpaCategoryScreen from "./screens/SpaCategoryScreen";
import EventsScreen from "./screens/EventsScreen";
import FlowerDecorationPage from "./screens/FlowerDecorationPage";
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
  | { type: "category"; categoryName: string }
  | { type: "service-listing"; serviceName: string }
  | { type: "salon-detail"; salonId: number }
  | { type: "salon-category" }
  | { type: "beauty-category" }
  | { type: "spa-category" }
  | { type: "events" }
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
  | { type: "embroidery-category" }
  | { type: "maggam-category" }
  | { type: "computer-embroidery-category" }
  | { type: "outfit-stitching"; category: string }
  | { type: "book-consultation" }
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
      setScreen({ type: "boutique" }); // Screen type remains 'boutique', only label changes
    }
  };

  const showBottomNav =
    screen.type !== "splash" && screen.type !== "login";

  const showBottomNavForScreen =
    showBottomNav &&
    (screen.type === "home" ||
      screen.type === "additional-services" ||
      screen.type === "appointments" ||
      screen.type === "boutique");

  // Helper to get current salon for owner screens
  function getCurrentSalon() {
    return allSalons.find((s) => s.id === currentSalonId) || null;
  }

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-white shadow-lg md:rounded-xl md:my-4">
      {/* Splash and Auth Screens */}
      {/* SplashScreen: requires onComplete prop */}
      {screen.type === "splash" && <SplashScreen onComplete={() => setScreen({ type: "login-role-selection" })} />}

      {/* LoginRoleSelectionScreen: onSelectCustomer, onSelectSalonOwner, onBack */}
      {screen.type === "login-role-selection" && (
        <LoginRoleSelectionScreen
          onSelectCustomer={() => {
            setUserRole("user");
            setScreen({ type: "login" });
          }}
          onSelectSalonOwner={() => {
            setUserRole("salon-owner");
            setScreen({ type: "salon-owner-login" });
          }}
          onBack={() => setScreen({ type: "splash" })}
        />
      )}

      {screen.type === "login" && (
        <LoginScreen
          onLogin={() => setScreen({ type: "home" })}
          onSignUp={() => setScreen({ type: "sign-up" })}
        />
      )}

      {screen.type === "salon-owner-login" && (
        <SalonOwnerLoginScreen
          onSignIn={() => {
            setCurrentSalonId(1);
            setScreen({ type: "salon-owner-dashboard" });
          }}
          onBack={() => setScreen({ type: "login-role-selection" })}
        />
      )}

      {/* SignUpScreen: restore navigation props for sign up and back */}
      {screen.type === "sign-up" && (
        <SignUpScreen
          onSignUp={(role) => setScreen({ type: "home" })}
          onBack={() => setScreen({ type: "login" })}
        />
      )}

      {/* SalonOwnerLoginScreen: just render */}
      {/* Removed invalid 'salon-owner-login' screen type usage */}

      {/* Main App Screens */}
      {screen.type === "home" && (
        <HomeScreen
          onServiceClick={(serviceName) => setScreen({ type: "service-listing", serviceName })}
          onSalonClick={(salonId) => setScreen({ type: "salon-detail", salonId })}
          onSpecialOffersClick={() => setScreen({ type: "todays-deals" })}
          onFavoriteSalonsClick={() => setScreen({ type: "favorite-salons" })}
          onAccountClick={() => { setScreen({ type: "account" }); setActiveTab("home"); }}
          onCategoryClick={(categoryName) => {
            if (categoryName === "Salon") setScreen({ type: "salon-category" });
            else if (categoryName === "Beauty") setScreen({ type: "beauty-category" });
            else if (categoryName === "Spa") setScreen({ type: "spa-category" });
            else if (categoryName === "Events") setScreen({ type: "events" });
            else if (categoryName === "Beauty at Home") setScreen({ type: "at-home-beauty" });
            else if (categoryName === "Photography") setScreen({ type: "photography" });
            else if (categoryName === "Flower Decoration") setScreen({ type: "flower-decoration" });
            else if (categoryName === "Boutique") setScreen({ type: "boutique" });
            else if (categoryName === "More Services") setScreen({ type: "additional-services" });
            else setScreen({ type: "category", categoryName });
          }}
        />
      )}
      {screen.type === "events" && <EventsScreen onBack={() => setScreen({ type: "home" })} />}
      {screen.type === "spa-category" && (
        <SpaCategoryScreen onBack={() => setScreen({ type: "home" })} />
      )}
      {screen.type === "beauty-category" && (
        <BeautyCategoryScreen
          onBack={() => setScreen({ type: "home" })}
          onSalonClick={(salonId) => setScreen({ type: "salon-detail", salonId })}
          onServiceClick={(serviceName) => setScreen({ type: "service-listing", serviceName })}
          onFavoriteSalonsClick={() => setScreen({ type: "favorite-salons" })}
          onAccountClick={() => { setScreen({ type: "account" }); setActiveTab("home"); }}
        />
      )}
      {screen.type === "salon-category" && (
        <SalonCategoryScreen
          onBack={() => setScreen({ type: "home" })}
          onSalonClick={(salonId) => setScreen({ type: "salon-detail", salonId })}
          onServiceClick={(serviceName) => setScreen({ type: "service-listing", serviceName })}
          onFavoriteSalonsClick={() => setScreen({ type: "favorite-salons" })}
          onAccountClick={() => { setScreen({ type: "account" }); setActiveTab("home"); }}
        />
      )}
      {screen.type === "category" && (
        <CategoryScreen
          categoryName={screen.categoryName}
          subcategories={(() => {
            // Both men and women categories
            const menCategories = [
              {
                name: "Beard",
                image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80",
                subcategories: [
                  { name: "Beard Grooming", image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80" },
                  { name: "Beard Trimming", image: "https://tse1.mm.bing.net/th/id/OIP.nNk4WkJf15U9xKJ1RS1KPwHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
                ],
              },
              {
                name: "Hair",
                image: "https://tse1.explicit.bing.net/th/id/OIP.hgRSJdaxN1c6UZ63pHR4VgHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
                subcategories: [
                  { name: "Haircut", image: "https://tse1.explicit.bing.net/th/id/OIP.hgRSJdaxN1c6UZ63pHR4VgHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
                  { name: "Hair Coloring", image: "https://tse3.mm.bing.net/th/id/OIP.Gq1i64GgOt_mnheWYLIPsgHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
                ],
              },
              {
                name: "Massage",
                image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1660029164522-d7a9e5.png",
                subcategories: [
                  { name: "Head Massage", image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1660029164522-d7a9e5.png" },
                  { name: "Face Massage", image: "https://thumbs.dreamstime.com/b/man-receiving-head-massage-medical-office-51614593.jpg" },
                ],
              },
              {
                name: "Shaving",
                image: "https://tse4.mm.bing.net/th/id/OIP.psUDhiH06F70GevV7F2e0QHaE8?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3",
                subcategories: [
                  { name: "Shaving", image: "https://tse4.mm.bing.net/th/id/OIP.psUDhiH06F70GevV7F2e0QHaE8?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3" },
                ],
              },
              {
                name: "Eyebrow",
                image: "https://browheaven.com/wp-content/uploads/2022/03/2-1024x577.png",
                subcategories: [
                  { name: "Eyebrow Plucking", image: "https://browheaven.com/wp-content/uploads/2022/03/2-1024x577.png" },
                ],
              },
            ];
            const womenCategories = [
              {
                name: "Hair",
                image: "https://images.unsplash.com/photo-1659036354224-48dd0a9a6b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Hair Style", image: "https://images.unsplash.com/photo-1659036354224-48dd0a9a6b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Hair Color", image: "https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Haircut & Style", image: "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Keratin Hair Spa", image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
                  { name: "Balayage Hair Color", image: "https://images.pexels.com/photos/8468036/pexels-photo-8468036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
                ],
              },
              {
                name: "Nails",
                image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Nail Art", image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Mani Pedi", image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Russian Manicure", image: "https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
                ],
              },
              {
                name: "Face",
                image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Facial", image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Glass Skin Facial", image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
                  { name: "Skincare", image: "https://images.unsplash.com/photo-1608571899793-a1c0c27a7555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                ],
              },
              {
                name: "Makeup",
                image: "https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Makeup", image: "https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                  { name: "Bridal Makeup", image: "https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                ],
              },
              {
                name: "Massage",
                image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Massage", image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                ],
              },
              {
                name: "Waxing",
                image: "https://images.unsplash.com/photo-1744722293334-7c57f57c49ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                subcategories: [
                  { name: "Waxing", image: "https://images.unsplash.com/photo-1744722293334-7c57f57c49ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
                ],
              },
            ];
            const found =
              (screen.categoryName && menCategories.find((cat) => cat.name === screen.categoryName)) ||
              (screen.categoryName && womenCategories.find((cat) => cat.name === screen.categoryName));
            return found ? found.subcategories : [];
          })()}
          onBack={() => setScreen({ type: "home" })}
          onServiceClick={(serviceName) => setScreen({ type: "service-listing", serviceName })}
        />
      )}
      {screen.type === "service-listing" && <ServiceListingScreen serviceName={screen.serviceName} onBack={() => setScreen({ type: "home" })} onSalonClick={(salonId) => setScreen({ type: "salon-detail", salonId })} />}
      {screen.type === "salon-detail" && <SalonDetailScreen salonId={screen.salonId} onBack={() => setScreen({ type: "home" })} onBookNow={(salonId) => setScreen({ type: "booking-service", salonId })} />}
      {screen.type === "booking-service" && <BookingServiceScreen salonId={screen.salonId} onBack={() => setScreen({ type: "salon-detail", salonId: screen.salonId })} onContinue={(serviceIds) => setScreen({ type: "booking-stylist", salonId: screen.salonId, serviceIds })} />}
      {screen.type === "booking-stylist" && <BookingStylistScreen salonId={screen.salonId} onBack={() => setScreen({ type: "booking-service", salonId: screen.salonId })} onContinue={(stylistId) => setScreen({ type: "booking-datetime", salonId: screen.salonId, serviceIds: screen.serviceIds, stylistId })} />}
      {screen.type === "booking-datetime" && <BookingDateTimeScreen onBack={() => setScreen({ type: "booking-stylist", salonId: screen.salonId, serviceIds: screen.serviceIds })} onContinue={(date, time) => setScreen({ type: "booking-summary", salonId: screen.salonId, serviceIds: screen.serviceIds, stylistId: screen.stylistId, date, time })} />}
      {screen.type === "booking-summary" && <BookingSummaryScreen salonId={screen.salonId} serviceIds={screen.serviceIds} stylistId={screen.stylistId} date={screen.date} time={screen.time} onBack={() => setScreen({ type: "booking-datetime", salonId: screen.salonId, serviceIds: screen.serviceIds, stylistId: screen.stylistId })} onConfirm={() => {
        const salon = salons.find((s) => s.id === screen.salonId);
        const selectedServices = salon?.services.filter((s) => screen.serviceIds.includes(s.id));
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
        toast.success("Booking confirmed! 🎉", { description: "You'll receive a confirmation shortly." });
        setScreen({ type: "appointments" });
        setActiveTab("appointments");
      }} />}
      {screen.type === "appointments" && <AppointmentsScreen appointments={bookedAppointments} onReschedule={(appointmentId) => setScreen({ type: "reschedule-appointment", appointmentId })} />}
      {/* AccountScreen: just render */}
      {screen.type === "account" && <AccountScreen />}
      {screen.type === "my-bookings" && <MyBookingsScreen appointments={bookedAppointments} onBack={() => setScreen({ type: "account" })} />}
      {/* FavoriteSalonsScreen: salons, onBack, onSalonClick */}
      {screen.type === "favorite-salons" && (
        <FavoriteSalonsScreen
          salons={salons as any}
          onBack={() => setScreen({ type: "account" })}
          onSalonClick={(salonId: number) => setScreen({ type: "salon-detail", salonId })}
        />
      )}
      {screen.type === "todays-deals" && <TodaysDealScreen onBack={() => setScreen({ type: "home" })} onDealClick={(salonId) => setScreen({ type: "salon-detail", salonId })} />}
      {screen.type === "reschedule-appointment" && <RescheduleAppointmentScreen appointment={bookedAppointments.find((apt) => apt.id === screen.appointmentId) || bookedAppointments[0]} onBack={() => setScreen({ type: "appointments" })} onConfirm={(appointmentId, newDate, newTime) => { setBookedAppointments((prevAppointments) => prevAppointments.map((apt) => apt.id === appointmentId ? { ...apt, date: newDate, time: newTime } : apt)); }} />}
      {screen.type === "additional-services" && <AdditionalServicesScreen onBack={() => setScreen({ type: "account" })} onServiceClick={(serviceName) => {
        if (serviceName === "At Home Beauty Services") setScreen({ type: "at-home-beauty" });
        else if (serviceName === "Photography") setScreen({ type: "photography" });
        else if (serviceName === "Flower Decoration") setScreen({ type: "flower-decoration" });
        else if (serviceName === "Boutique") setScreen({ type: "boutique" });
      }} />}
      {screen.type === "at-home-beauty" && <AtHomeBeautyScreen onBack={() => setScreen({ type: "home" })} />}
      {screen.type === "photography" && <PhotographyScreen onBack={() => setScreen({ type: "home" })} />}
      {screen.type === "flower-decoration" && <FlowerDecorationScreen onBack={() => setScreen({ type: "home" })} />}
      {screen.type === "boutique" && (
        <BoutiqueScreen
          onBack={() => { setScreen({ type: "home" }); setActiveTab("home"); }}
        />
      )}

      {/* Salon Owner Screens */}
      {screen.type === "salon-owner-signup" && <SalonOwnerSignUpScreen ownerName={screen.ownerName} ownerEmail={screen.ownerEmail} ownerPhone={screen.ownerPhone} onSignUp={(salonData) => {
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
        toast.success("Salon registered! Waiting for verification...", { description: "Admin will review your details soon." });
      }} onBack={() => setScreen({ type: "sign-up" })} />}
      {screen.type === "salon-owner-verification" && <SalonOwnerVerificationScreen salonName={getCurrentSalon()?.shopName || "Your Salon"} registrationDate={getCurrentSalon()?.createdAt || new Date().toISOString()} onBack={() => { if (getCurrentSalon()?.status === "approved") setScreen({ type: "salon-owner-dashboard" }); else setScreen({ type: "login" }); }} />}
      {screen.type === "salon-owner-dashboard" && <SalonOwnerDashboardScreen salonName={getCurrentSalon()?.shopName || "My Salon"} totalEarnings={getCurrentSalon()?.earnings?.total || 0} monthlyEarnings={getCurrentSalon()?.earnings?.thisMonth || 0} weeklyEarnings={getCurrentSalon()?.earnings?.thisWeek || 0} pendingBookings={3} locations={getCurrentSalon()?.locations || []} onNavigate={(page) => {
        switch (page) {
          case "calendar": setScreen({ type: "salon-calendar" }); break;
          case "staff": setScreen({ type: "salon-staff" }); break;
          case "bookings": setScreen({ type: "salon-bookings" }); break;
          case "offers": setScreen({ type: "salon-offers" }); break;
          case "gallery": setScreen({ type: "salon-gallery" }); break;
          case "products": setScreen({ type: "salon-products" }); break;
          case "earnings": setScreen({ type: "salon-earnings" }); break;
          case "settings": setScreen({ type: "salon-settings" }); break;
        }
      }} onLogout={() => { setUserRole(null); setCurrentSalonId(null); setScreen({ type: "login" }); }} />}
      {screen.type === "salon-calendar" && <SalonTimingsScreen salonName={getCurrentSalon()?.shopName || "My Salon"} onBack={() => setScreen({ type: "salon-owner-dashboard" })} />}
      {screen.type === "salon-staff" && <SalonStaffScreen salonName={getCurrentSalon()?.shopName || "My Salon"} initialStaff={getCurrentSalon()?.staff || []} onBack={() => setScreen({ type: "salon-owner-dashboard" })} />}
      {screen.type === "salon-bookings" && <SalonBookingsScreen salonName={getCurrentSalon()?.shopName || "My Salon"} onBack={() => setScreen({ type: "salon-owner-dashboard" })} />}
      {screen.type === "salon-offers" && <SalonOffersScreen salonName={getCurrentSalon()?.shopName || "My Salon"} onBack={() => setScreen({ type: "salon-owner-dashboard" })} />}
      {screen.type === "salon-earnings" && <SalonEarningsScreen salonName={getCurrentSalon()?.shopName || "My Salon"} totalEarnings={getCurrentSalon()?.earnings?.total || 0} monthlyEarnings={getCurrentSalon()?.earnings?.thisMonth || 0} weeklyEarnings={getCurrentSalon()?.earnings?.thisWeek || 0} onBack={() => setScreen({ type: "salon-owner-dashboard" })} />}
      {screen.type === "salon-gallery" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Gallery Feature</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Upload your salon photos here</p>
            <button onClick={() => setScreen({ type: "salon-owner-dashboard" })} className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg">Back to Dashboard</button>
          </div>
        </div>
      )}
      {screen.type === "salon-products" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Products Management</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Manage your products here</p>
            <button onClick={() => setScreen({ type: "salon-owner-dashboard" })} className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg">Back to Dashboard</button>
          </div>
        </div>
      )}
      {screen.type === "salon-settings" && (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-[#8A8A8A] mb-4">Salon Settings</p>
            <p className="text-sm text-[#8A8A8A] mb-4">Manage your salon preferences</p>
            <button onClick={() => setScreen({ type: "salon-owner-dashboard" })} className="px-6 py-2 bg-[#6C4AB6] text-white rounded-lg">Back to Dashboard</button>
          </div>
        </div>
      )}

      {/* Admin Screens */}
      {/* AdminDashboardScreen: just render */}
      {screen.type === "admin-dashboard" && <AdminDashboardScreen onLogout={() => { setUserRole(null); setScreen({ type: "login" }); }} />}

      {/* Bottom Navigation */}
      {showBottomNavForScreen && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}
      <Toaster />
    </div>
  );
}