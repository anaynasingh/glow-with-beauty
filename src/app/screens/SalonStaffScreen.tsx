import { ArrowLeft, Plus, Trash2, Edit2, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";
import type { Location, Staff } from "../data/mockData";

interface SalonStaffScreenProps {
  salonName: string;
  initialStaff: Staff[];
  locations: Location[];
  onStaffChange?: (staff: Staff[]) => void;
  onBack: () => void;
}

interface StaffFormData {
  name: string;
  specialization: string;
  experience: string;
  phone: string;
  email: string;
  locationId: string;
}

const emptyForm: StaffFormData = {
  name: "",
  specialization: "",
  experience: "",
  phone: "",
  email: "",
  locationId: "",
};

export function SalonStaffScreen({
  salonName,
  initialStaff,
  locations,
  onStaffChange,
  onBack,
}: SalonStaffScreenProps) {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>("all");
  const [formData, setFormData] = useState<StaffFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.specialization.trim()) {
      nextErrors.specialization = "Specialization is required";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required";
    if (!formData.locationId) nextErrors.locationId = "Location is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleSaveStaff = () => {
    if (!validateForm()) return;

    const selectedLocation = locations.find(
      (loc) => loc.id === Number(formData.locationId)
    );

    const staffPayload: Omit<Staff, "id" | "joinDate"> = {
      name: formData.name,
      specialization: formData.specialization,
      experience: formData.experience,
      phone: formData.phone,
      email: formData.email,
      locationId: Number(formData.locationId),
      locationName: selectedLocation?.name || "Not assigned",
    };

    let updatedStaff: Staff[];

    if (editingId !== null) {
      updatedStaff = staff.map((member) =>
        member.id === editingId ? { ...member, ...staffPayload } : member
      );
    } else {
      updatedStaff = [
        ...staff,
        {
          id: Math.max(0, ...staff.map((member) => member.id)) + 1,
          joinDate: new Date().toISOString().split("T")[0],
          ...staffPayload,
        },
      ];
    }

    setStaff(updatedStaff);
    onStaffChange?.(updatedStaff);
    resetForm();
  };

  const handleEdit = (member: Staff) => {
    setFormData({
      name: member.name,
      specialization: member.specialization,
      experience: member.experience,
      phone: member.phone,
      email: member.email,
      locationId: member.locationId ? String(member.locationId) : "",
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updatedStaff = staff.filter((member) => member.id !== id);
    setStaff(updatedStaff);
    onStaffChange?.(updatedStaff);
  };

  const filteredStaff =
    selectedLocationFilter === "all"
      ? staff
      : selectedLocationFilter === "unassigned"
      ? staff.filter((member) => !member.locationId)
      : staff.filter(
          (member) => member.locationId === Number(selectedLocationFilter)
        );

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
              <h1 className="text-xl font-bold text-[#1F1F1F]">Manage Staff</h1>
              <p className="text-xs text-[#8A8A8A]">{salonName}</p>
            </div>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              disabled={locations.length === 0}
              className="bg-[#6C4AB6] text-white rounded-lg p-2 hover:bg-[#5C3AA6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={locations.length === 0 ? "Add locations first" : "Add staff"}
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
              {editingId ? "Edit Staff Member" : "Add New Staff Member"}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter staff name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">Experience</label>
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm text-[#1F1F1F] mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.locationId}
                  onChange={(e) =>
                    setFormData({ ...formData, locationId: e.target.value })
                  }
                  className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 text-[#1F1F1F]"
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <p className="text-red-500 text-xs mt-1">{errors.locationId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetForm}
                className="bg-gray-300 text-[#1F1F1F] rounded-xl py-3 font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStaff}
                className="bg-[#6C4AB6] text-white rounded-xl py-3 font-medium hover:bg-[#5C3AA6] transition-colors"
              >
                {editingId ? "Update" : "Add Staff"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F1F1F]">
                Staff Members ({filteredStaff.length})
              </h2>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-[#1F1F1F] mb-2">Filter by Location</label>
              <select
                value={selectedLocationFilter}
                onChange={(e) => setSelectedLocationFilter(e.target.value)}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3 text-[#1F1F1F]"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
                <option value="unassigned">Not assigned</option>
              </select>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
                <p className="text-[#8A8A8A] mb-4">No staff members found for this selection</p>
                {locations.length === 0 && (
                  <p className="text-xs text-[#8A8A8A] mb-4">Add salon locations to start assigning staff.</p>
                )}
                <button
                  onClick={() => setShowForm(true)}
                  disabled={locations.length === 0}
                  className="inline-flex items-center gap-2 bg-[#6C4AB6] text-white px-4 py-2 rounded-lg hover:bg-[#5C3AA6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" /> Add Staff Member
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredStaff.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 hover:border-[#6C4AB6] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#1F1F1F]">{member.name}</h3>
                        <p className="text-sm text-[#8A8A8A]">{member.specialization}</p>
                        {member.experience && (
                          <p className="text-xs text-[#8A8A8A] mt-1">Experience: {member.experience}</p>
                        )}
                        <p className="text-xs mt-2 inline-block bg-[#F3EEFF] text-[#6C4AB6] px-2 py-1 rounded-full">
                          {member.locationName || "Not assigned"}
                        </p>
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
                      <p>Phone: {member.phone}</p>
                      {member.email && <p>Email: {member.email}</p>}
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
