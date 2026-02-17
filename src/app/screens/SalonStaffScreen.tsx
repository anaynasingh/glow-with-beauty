import { ArrowLeft, Plus, Trash2, Edit2, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface StaffMember {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
}

interface SalonStaffScreenProps {
  salonName: string;
  initialStaff: StaffMember[];
  onBack: () => void;
}

export function SalonStaffScreen({
  salonName,
  initialStaff,
  onBack,
}: SalonStaffScreenProps) {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStaff = () => {
    if (validateForm()) {
      if (editingId !== null) {
        setStaff(
          staff.map((s) =>
            s.id === editingId ? { ...s, ...formData } : s
          )
        );
        setEditingId(null);
      } else {
        const newStaff: StaffMember = {
          id: Math.max(...staff.map((s) => s.id), 0) + 1,
          ...formData,
        };
        setStaff([...staff, newStaff]);
      }
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
      });
      setShowForm(false);
    }
  };

  const handleEdit = (member: StaffMember) => {
    setFormData(member);
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      phone: "",
      email: "",
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
                Manage Staff
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
              {editingId ? "Edit Staff Member" : "Add New Staff Member"}
            </h2>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter staff name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Hair Styling, Makeup, Nails"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialization: e.target.value,
                    })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Experience
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 5 years"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
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
                onClick={handleAddStaff}
                className="bg-[#6C4AB6] text-white rounded-xl py-3 font-medium hover:bg-[#5C3AA6] transition-colors"
              >
                {editingId ? "Update" : "Add Staff"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Staff List Info */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F1F1F]">
                Staff Members ({staff.length})
              </h2>
            </div>

            {staff.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
                <p className="text-[#8A8A8A] mb-4">
                  No staff members added yet
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-[#6C4AB6] text-white px-4 py-2 rounded-lg hover:bg-[#5C3AA6] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add First Staff Member
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#1F1F1F]">
                          {member.name}
                        </h3>
                        <p className="text-sm text-[#8A8A8A]">
                          {member.specialization}
                        </p>
                        {member.experience && (
                          <p className="text-xs text-[#8A8A8A] mt-1">
                            Experience: {member.experience}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 hover:bg-[#F3EEFF] rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-[#6C4AB6]" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 hover:bg-[#FFE0E0] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-[#FF6B6B]" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-[#8A8A8A] space-y-1">
                      <p>📞 {member.phone}</p>
                      {member.email && <p>📧 {member.email}</p>}
                    </div>
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
