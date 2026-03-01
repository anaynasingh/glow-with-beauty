
import engagement from "../../images/engagement.png";
import marriage from "../../images/marriage.png";
import babyshower from "../../images/babyshower.png";
import newborn from "../../images/newborn.png";
import birthday from "../../images/birthday.png";
import sweet16 from "../../images/sweet16.png";
import fashionshow from "../../images/fashionshow.png";
import corporateandfelicitationevents from "../../images/corporateandfelicitationevents.png";
import devotionalevents from "../../images/devotionalevents.png";
import housewarming from "../../images/housewarming.png";
import anniversary from "../../images/anniversary.png";
import productlaunch from "../../images/productlaunch.png";
import educational from "../../images/educational.png";

const events = [
  { title: "Engagement", image: engagement },
  { title: "Marriage", image: marriage },
  { title: "Baby Shower", image: babyshower },
  { title: "New Born", image: newborn },
  { title: "Birthday", image: birthday },
  { title: "Sweet 16", image: sweet16 },
  { title: "Fashion show", image: fashionshow },
  { title: "Corporate and Felicitation Events", image: corporateandfelicitationevents },
  { title: "Devotional events", image: devotionalevents },
  { title: "House Warming", image: housewarming },
  { title: "Wedding Anniversary", image: anniversary },
  { title: "Marriage Anniversary", image: anniversary },
  { title: "Product Launch", image: productlaunch },
  { title: "Educational", image: educational },
];

interface EventsScreenProps {
  onBack: () => void;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">Events</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.title}
            className="bg-gray-50 rounded-xl shadow-sm flex flex-col items-center p-3 hover:shadow-md transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <div className="text-center text-sm font-medium mt-1">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsScreen;
