import { ChevronLeft, MapPin, Star, Phone, Zap } from "lucide-react";
import marriage from "../../images/marriage.png";
import babyshower from "../../images/babyshower.png";
import newborn from "../../images/newborn.png";
import prebirthday from "../../images/prebirthday.png";
import birthday from "../../images/birthday.png";
import sweet16 from "../../images/sweet16.png";
import portfolio from "../../images/portfolio.png";
import corporateparties from "../../images/corporateparties.png";
import ecommerce from "../../images/ecommerce.png";
import specialevents from "../../images/specialevents.png";

const photographyCategories = [
  { title: "Marriage", image: marriage },
  { title: "Baby Shower", image: babyshower },
  { title: "New Born", image: newborn },
  { title: "Pre Birthday", image: prebirthday },
  { title: "Birthday", image: birthday },
  { title: "Sweet 16", image: sweet16 },
  { title: "Portfolio", image: portfolio },
  { title: "Corporate Parties", image: corporateparties },
  { title: "eCommerce", image: ecommerce },
  { title: "Special Events!", image: specialevents },
];

export function PhotographyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">Photography</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {photographyCategories.map((cat) => (
          <div
            key={cat.title}
            className="bg-gray-50 rounded-xl shadow-sm flex flex-col items-center p-3 hover:shadow-md transition"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <div className="text-center text-sm font-medium mt-1">{cat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
