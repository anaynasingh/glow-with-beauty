import React from "react";

import ganeshchaturthi from "../../images/ganeshchaturthi.png";
import navaratri from "../../images/navaratri.png";
import diwali from "../../images/diwali.png";
import christmas from "../../images/christmas.png";
import housewarming from "../../images/housewarming-flowerdecoration.png";
import namingceremony from "../../images/namingceremony.png";
import flowergarland from "../../images/flowergarland.png";
import specialevents from "../../images/specialevents.png";

const flowerDecorations = [
  { title: "Ganesh Chaturthi", image: ganeshchaturthi },
  { title: "Navaratri", image: navaratri },
  { title: "Diwali", image: diwali },
  { title: "Christmas", image: christmas },
  { title: "Housewarming", image: housewarming },
  { title: "Naming Ceremony", image: namingceremony },
  { title: "Flower Garland", image: flowergarland },
  { title: "Special Events", image: specialevents },
];

interface FlowerDecorationPageProps {
  onBack: () => void;
}

const FlowerDecorationPage: React.FC<FlowerDecorationPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">Flower Decoration</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {flowerDecorations.map((item) => (
          <div
            key={item.title}
            className="bg-gray-50 rounded-xl shadow-sm flex flex-col items-center p-3 hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-28 object-cover rounded-lg mb-2"
            />
            <div className="text-center text-sm font-medium mt-1">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerDecorationPage;
