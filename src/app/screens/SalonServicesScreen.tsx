import { ArrowLeft, Plus, Edit2, Trash2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface ServiceItem {
  id: number;
  name: string;
  duration: string;
  price: number;
  category: string;
}

interface SalonServicesScreenProps {
  salonName: string;
  onBack: () => void;
}

export function SalonServicesScreen({ salonName, onBack }: SalonServicesScreenProps) {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, name: "Haircut & Styling", duration: "45 min", price: 699, category: "Hair" },
    { id: 2, name: "Facial Cleanup", duration: "60 min", price: 1199, category: "Skin" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    category: "",
  });

  const resetForm = () => {
    setFormData({ name: "", duration: "", price: "", category: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.duration.trim() || !formData.price || !formData.category.trim()) {
      return;
    }

    const payload = {
      name: formData.name,
      duration: formData.duration,
      price: Number(formData.price),
      category: formData.category,
    };

    if (editingId !== null) {
      setServices((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item)));
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((item) => item.id)) + 1,
          ...payload,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (service: ServiceItem) => {
    setFormData({
      name: service.name,
      duration: service.duration,
      price: String(service.price),
      category: service.category,
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#1F1F1F]">Manage Services</h1>
              <p className="text-xs text-[#8A8A8A]">{salonName}</p>
            </div>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#6C4AB6] text-white rounded-lg p-2 hover:bg-[#5C3AA6] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {showForm ? (
          <>
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              {editingId ? "Edit Service" : "Add New Service"}
            </h2>
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Service name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              <Input
                placeholder="Duration (e.g., 45 min)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              <Input
                placeholder="Category (Hair, Skin, Nails...)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetForm}
                className="bg-gray-300 text-[#1F1F1F] rounded-xl py-3 font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#6C4AB6] text-white rounded-xl py-3 font-medium hover:bg-[#5C3AA6] transition-colors"
              >
                {editingId ? "Update" : "Add Service"}
              </button>
            </div>
          </>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
            <p className="text-[#8A8A8A] mb-4">No services added yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#6C4AB6] text-white px-4 py-2 rounded-lg hover:bg-[#5C3AA6] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add First Service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F]">{service.name}</h3>
                    <p className="text-xs text-[#8A8A8A]">{service.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="p-2 hover:bg-[#F3EEFF] rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-[#6C4AB6]" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-[#FFE0E0] rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-[#FF6B6B]" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#8A8A8A]">{service.duration} • ₹{service.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
