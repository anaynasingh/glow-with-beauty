import { ArrowLeft, Plus, Trash2, Edit2, Gift } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: number;
  validFrom: string;
  validTill: string;
}

interface SalonOffersScreenProps {
  salonName: string;
  onBack: () => void;
}

export function SalonOffersScreen({
  salonName,
  onBack,
}: SalonOffersScreenProps) {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      title: "20% off on Hair Services",
      description: "Get 20% discount on all hair services",
      discount: 20,
      validFrom: "2026-02-01",
      validTill: "2026-02-28",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 0,
    validFrom: "",
    validTill: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.discount <= 0 || formData.discount > 100)
      newErrors.discount = "Discount must be between 1-100%";
    if (!formData.validFrom) newErrors.validFrom = "Start date is required";
    if (!formData.validTill) newErrors.validTill = "End date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOffer = () => {
    if (validateForm()) {
      if (editingId !== null) {
        setOffers(
          offers.map((o) =>
            o.id === editingId ? { ...o, ...formData } : o
          )
        );
        setEditingId(null);
      } else {
        const newOffer: Offer = {
          id: Math.max(...offers.map((o) => o.id), 0) + 1,
          ...formData,
        };
        setOffers([...offers, newOffer]);
      }
      setFormData({
        title: "",
        description: "",
        discount: 0,
        validFrom: "",
        validTill: "",
      });
      setShowForm(false);
    }
  };

  const handleEdit = (offer: Offer) => {
    setFormData(offer);
    setEditingId(offer.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      discount: 0,
      validFrom: "",
      validTill: "",
    });
    setErrors({});
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      {/* Header */}
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
              <h1 className="text-xl font-bold text-[#1F1F1F]">
                Offers & Deals
              </h1>
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        {showForm ? (
          <>
            {/* Form Title */}
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              {editingId ? "Edit Offer" : "Create New Offer"}
            </h2>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Offer Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 20% off Hair Services"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your offer..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 text-sm resize-none h-20"
                />
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Discount (%) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="e.g., 20"
                  value={formData.discount || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.discount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.discount}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Valid From <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        validFrom: e.target.value,
                      })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.validFrom && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.validFrom}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#1F1F1F] mb-2">
                    Valid Till <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.validTill}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        validTill: e.target.value,
                      })
                    }
                    className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                  />
                  {errors.validTill && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.validTill}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-[#1F1F1F] rounded-xl py-3 font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOffer}
                className="bg-[#6C4AB6] text-white rounded-xl py-3 font-medium hover:bg-[#5C3AA6] transition-colors"
              >
                {editingId ? "Update" : "Add Offer"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">
              Active Offers ({offers.length})
            </h2>

            {offers.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
                <p className="text-[#8A8A8A] mb-4">
                  No offers created yet
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-[#6C4AB6] text-white px-4 py-2 rounded-lg hover:bg-[#5C3AA6] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Create First Offer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-gradient-to-r from-[#FFF3CD] to-[#FFE69C] border-2 border-[#FFE69C] rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#1F1F1F]">
                            {offer.title}
                          </h3>
                          <span className="bg-[#FF6B6B] text-white text-xs font-bold px-2 py-1 rounded">
                            -{offer.discount}%
                          </span>
                        </div>
                        {offer.description && (
                          <p className="text-sm text-[#FF8A00]">
                            {offer.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(offer)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-[#FF6F00]" />
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-[#FF6B6B]" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#FF8A00] mt-2">
                      Valid: {offer.validFrom} to {offer.validTill}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
