import { ArrowLeft, Plus, Edit2, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SalonProductsScreenProps {
  salonName: string;
  onBack: () => void;
}

export function SalonProductsScreen({ salonName, onBack }: SalonProductsScreenProps) {
  const [products, setProducts] = useState<ProductItem[]>([
    { id: 1, name: "Argan Hair Serum", category: "Hair Care", price: 899, quantity: 20 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const resetForm = () => {
    setFormData({ name: "", category: "", price: "", quantity: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.price || !formData.quantity) {
      return;
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    if (editingId !== null) {
      setProducts((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item)));
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((item) => item.id)) + 1,
          ...payload,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (product: ProductItem) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      quantity: String(product.quantity),
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
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
              <h1 className="text-xl font-bold text-[#1F1F1F]">Add Products</h1>
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
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
                {editingId ? "Update" : "Save Product"}
              </button>
            </div>
          </>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
            <p className="text-[#8A8A8A] mb-4">No products added yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-[#6C4AB6] text-white px-4 py-2 rounded-lg hover:bg-[#5C3AA6] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add First Product
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F]">{product.name}</h3>
                    <p className="text-xs text-[#8A8A8A]">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 hover:bg-[#F3EEFF] rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-[#6C4AB6]" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-[#FFE0E0] rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-[#FF6B6B]" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#8A8A8A]">₹{product.price.toLocaleString()} • Stock: {product.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
