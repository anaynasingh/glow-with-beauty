import boutique1 from "../../images/boutique1.png";
import boutique2 from "../../images/boutique2.png";
import embroidery from "../../images/embroidery.png";
import maggamworks from "../../images/maggamworks.png";
import computerembroidery from "../../images/computerembroidery.png";

export function BoutiqueScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-2 text-lg">←</button>
        <h1 className="text-xl font-semibold">Boutique</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <img src={boutique1} alt="Designer Blouse and Outfits" className="w-full h-64 object-cover rounded-lg" />
        <img src={boutique2} alt="Ladies Outfits and Custom Stitching" className="w-full h-64 object-cover rounded-lg" />
        <img src={embroidery} alt="Embroidery" className="w-full h-64 object-cover rounded-lg" />
        <img src={maggamworks} alt="Maggam Work's" className="w-full h-64 object-cover rounded-lg" />
      </div>
      <div className="flex justify-center gap-16 mt-2">
        <div className="text-center font-semibold italic text-2xl">Embroidery</div>
        <div className="text-center font-semibold italic text-2xl">Maggam Work's</div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <img src={computerembroidery} alt="Computer Embroidery Designs" className="w-72 h-56 object-cover rounded-lg" />
        <div className="text-center font-semibold italic mt-2 text-lg">
          <span className="italic">Computer<br />Embroidery Designs</span>
        </div>
      </div>
    </div>
  );
}
