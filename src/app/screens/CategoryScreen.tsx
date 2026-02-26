import { ServiceCard } from "../components/ServiceCard";

interface CategoryScreenProps {
  categoryName: string;
  subcategories: { name: string; image: string }[];
  onBack: () => void;
  onServiceClick: (serviceName: string) => void;
}

export function CategoryScreen({ categoryName, subcategories, onBack, onServiceClick }: CategoryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] to-white p-4">
      <button onClick={onBack} className="mb-4 text-[#6C4AB6] font-medium">← Back</button>
      <h2 className="text-2xl font-bold mb-6 text-[#1F1F1F]">{categoryName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {subcategories.map((sub) => (
          <ServiceCard key={sub.name} name={sub.name} image={sub.image} onClick={() => onServiceClick(sub.name)} />
        ))}
      </div>
    </div>
  );
}