import { ArrowLeft, Plus, Trash2, Image } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

interface GalleryItem {
  id: number;
  title: string;
  url: string;
}

interface SalonGalleryScreenProps {
  salonName: string;
  onBack: () => void;
}

export function SalonGalleryScreen({ salonName, onBack }: SalonGalleryScreenProps) {
  const [photos, setPhotos] = useState<GalleryItem[]>([
    {
      id: 1,
      title: "Bridal Makeup Look",
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    },
  ]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddPhoto = () => {
    if (!title.trim() || !url.trim()) return;
    setPhotos((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((item) => item.id)) + 1,
        title,
        url,
      },
    ]);
    setTitle("");
    setUrl("");
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#F8F7FF] to-white">
      <div className="bg-white border-b border-[#E0D9F0] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EEFF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F1F1F]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1F1F1F]">Upload Photos</h1>
            <p className="text-xs text-[#8A8A8A]">{salonName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
        <div className="bg-white border-2 border-[#E0D9F0] rounded-xl p-4 mb-5">
          <h2 className="text-sm font-semibold text-[#1F1F1F] mb-3">Add New Photo</h2>
          <div className="space-y-3">
            <Input
              placeholder="Photo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
            />
            <Input
              placeholder="Photo URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#F3EEFF] border-none rounded-xl px-4 py-3"
            />
            <button
              onClick={handleAddPhoto}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#6C4AB6] text-white rounded-xl py-3 font-medium hover:bg-[#5C3AA6] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Photo
            </button>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-10">
            <Image className="w-16 h-16 text-[#E0D9F0] mx-auto mb-4" />
            <p className="text-[#8A8A8A]">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white border-2 border-[#E0D9F0] rounded-xl overflow-hidden">
                <img src={photo.url} alt={photo.title} className="w-full h-28 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-medium text-[#1F1F1F] line-clamp-2 mb-2">{photo.title}</p>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="w-full inline-flex items-center justify-center gap-1 text-xs text-[#FF6B6B] hover:bg-[#FFE0E0] rounded-lg py-1.5 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
