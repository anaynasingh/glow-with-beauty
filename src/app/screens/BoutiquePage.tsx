
import React from "react";
import embroideryImg from "../../images/embroidery.png";
import maggamImg from "../../images/maggamworks.png";
import computerEmbroideryImg from "../../images/computerembroidery.png";

const boutiqueCategories = [
  { title: "Embroidery", image: embroideryImg, onClick: "embroidery" },
  { title: "Maggam Work", image: maggamImg, onClick: "maggam" },
  { title: "Computer Embroidery Designs", image: computerEmbroideryImg, onClick: "computer-embroidery" },
];

export default function BoutiquePage({ onCategorySelect, onBack }: { onCategorySelect: (cat: string) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">Boutique</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {boutiqueCategories.map((cat) => (
          <div
            key={cat.title}
            className="bg-gray-50 rounded-xl shadow-sm flex flex-col items-center p-3 hover:shadow-md transition cursor-pointer"
            onClick={() => onCategorySelect(cat.onClick)}
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
