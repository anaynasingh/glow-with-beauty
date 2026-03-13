import { ChevronLeft, MapPin, Star, Phone, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface BoutiqueItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface BoutiqueShop {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  phone: string;
  image: string;
  categories: string[];
  description: string;
  items?: BoutiqueItem[];
}

interface BoutiqueScreenProps {
  onBack: () => void;
  onShopClick?: (shopId: number) => void;
}

export function BoutiqueScreen({ onBack, onShopClick }: BoutiqueScreenProps) {
  const [selectedShop, setSelectedShop] = useState<BoutiqueShop | null>(null);

  const shops: BoutiqueShop[] = [
    {
      id: 1,
      name: "Ethnic Elegance",
      rating: 4.8,
      reviews: 312,
      location: "Khan Market, Delhi",
      distance: "6.5 km",
      phone: "+91 98765 43210",
      image: "https://tse2.mm.bing.net/th/id/OIP.rB0r1E-JLncrdvpqNP4q9QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      categories: ["Lehenga", "Sarees", "Designer Blouses", "Dupattas"],
      description: "Premium ethnic wear collection",
      items: [
        { id: 1, name: "Silk Lehenga", price: 15999, image: "https://i.pinimg.com/originals/4c/a1/45/4ca145c769b6c2b580abfc55900c4bfd.png", category: "Lehenga", rating: 4.7 },
        { id: 2, name: "Designer Blouse", price: 4999, image: "https://m.media-amazon.com/images/I/918pmUg7JmL._AC_UY1100_.jpg", category: "Designer Blouses", rating: 4.8 },
        { id: 3, name: "Embroidered Dupatta", price: 2999, image: "https://tse2.mm.bing.net/th/id/OIP.GrXcjVefyoel3slPMwfxXAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Dupattas", rating: 4.6 },
        { id: 4, name: "Silk Saree", price: 12999, image: "https://th.bing.com/th/id/OIP.fjWxwuwNWj1QyHj1ZuCXZgHaPv?w=164&h=350&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", category: "Sarees", rating: 4.9 },
      ],
    },
    {
      id: 2,
      name: "Fashion Forward",
      rating: 4.7,
      reviews: 267,
      location: "Sector 18, Noida",
      distance: "4.2 km",
      phone: "+91 87654 32109",
      image: "https://i.pinimg.com/736x/c7/a9/a3/c7a9a3e6803a0e00e8dd87d5423a318b.jpg",
      categories: ["Crop Tops", "Jackets", "Jeans", "Casual Wear"],
      description: "Latest western fashion trends",
      items: [
        { id: 5, name: "Denim Jacket", price: 3499, image: "https://tse2.mm.bing.net/th/id/OIP.IiPseQaNZsjFfxmVyax14QHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Jackets", rating: 4.8 },
        { id: 6, name: "Crop Top", price: 1999, image: "https://pictures.kartmax.in/inside/live/1600x1200/quality=6/sites/9s145MyZrWdIAwpU0JYS/product-images/only_coral_pink_printed_crop_top_17162714899002859006(pinklemonade)_1.jpg", category: "Crop Tops", rating: 4.7 },
        { id: 7, name: "Skinny Jeans", price: 2999, image: "https://tse3.mm.bing.net/th/id/OIP.Kye32gfbajeNLeQrvZ1jOAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Jeans", rating: 4.6 },
        { id: 8, name: "Leather Jacket", price: 7999, image: "https://img.freepik.com/premium-photo/brown-leather-jacket-with-black-shirt-it_1122354-4941.jpg", category: "Jackets", rating: 4.9 },
      ],
    },
    {
      id: 3,
      name: "Wall Work Wonders",
      rating: 4.6,
      reviews: 189,
      location: "South Delhi",
      distance: "8.1 km",
      phone: "+91 76543 21098",
      image: "https://tse1.mm.bing.net/th/id/OIP.H3tVbAOP58sYwjrf52lIrQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      categories: ["Embroidered Items", "Wall Hangings", "Tapestries", "Cushions"],
      description: "Handcrafted wall decor and embroideries",
      items: [
        { id: 9, name: "Embroidered Cushion", price: 1299, image: "https://th.bing.com/th?id=OPHS.U7rKQ%2bbgRiFjyQ474C474&w=592&h=550&qlt=20&o=5&dpr=1.3&pid=21.1", category: "Cushions", rating: 4.7 },
        { id: 10, name: "Wall Tapestry", price: 2499, image: "https://th.bing.com/th/id/R.87438819891f033171104e47d6ed31e7?rik=q5Bq3FgFpeZXJw&pid=ImgRaw&r=0", category: "Tapestries", rating: 4.8 },
        { id: 11, name: "Wall Hanging", price: 1999, image: "https://tse4.mm.bing.net/th/id/OIP.LoNjbRJ_WdPJcRXCEG_c-gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Wall Hangings", rating: 4.6 },
        { id: 12, name: "Embroidered Cloth", price: 3999, image: "https://i.etsystatic.com/25602509/r/il/4316df/5617685605/il_1080xN.5617685605_bmbd.jpg", category: "Embroidered Items", rating: 4.9 },
      ],
    },
  ];

  if (selectedShop) {
    return (
      <div className="pb-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#E6C97A] to-[#D4A574] px-6 pt-6 pb-8 rounded-b-3xl">
          <button
            onClick={() => setSelectedShop(null)}
            className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">{selectedShop.name}</h1>
          <p className="text-white text-sm opacity-90">{selectedShop.description}</p>
        </div>

        {/* Shop Info */}
        <div className="px-6 py-4 bg-white mx-6 rounded-2xl mt-4" style={{ boxShadow: "0 2px 12px rgba(230, 201, 122, 0.15)" }}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 fill-[#E6C97A] text-[#E6C97A]" />
                <span className="font-bold text-[#1F1F1F]">{selectedShop.rating}</span>
                <span className="text-xs text-[#8A8A8A]">({selectedShop.reviews})</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                <MapPin className="w-4 h-4" />
                {selectedShop.distance}
              </div>
            </div>
            <button className="bg-[#E6C97A] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Call
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedShop.categories.map((category, idx) => (
              <button
                key={idx}
                className="bg-[#FFF5E6] text-[#E6C97A] px-3 py-2 rounded-full text-sm font-semibold"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {selectedShop.items && (
          <div className="px-6 pb-6">
            <h2 className="text-lg font-bold text-[#1F1F1F] mb-4">Featured Items</h2>
            <div className="grid grid-cols-2 gap-4">
              {selectedShop.items.map((item) => (
                <button
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden active:scale-[0.95] transition-all"
                  style={{ boxShadow: "0 2px 12px rgba(230, 201, 122, 0.15)" }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-[#E6C97A] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      {item.category.split(" ")[0]}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#E6C97A]">₹{item.price}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#E6C97A] text-[#E6C97A]" />
                        <span className="text-xs text-[#1F1F1F]">{item.rating}</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#E6C97A] text-white py-1.5 rounded-lg text-xs font-semibold mt-2">
                      Add to Cart
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#E6C97A] to-[#D4A574] px-6 pt-6 pb-8 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-white text-sm opacity-90">Explore amazing fashion and collections</p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {["All", "Ethnic", "Western", "Trending"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === "All"
                ? "bg-[#E6C97A] text-white"
                : "bg-[#FFF5E6] text-[#D4A574]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Shops List */}
      <div className="px-6 pb-6 space-y-4">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => {
              setSelectedShop(shop);
              onShopClick?.(shop.id);
            }}
            className="bg-white rounded-2xl overflow-hidden active:scale-[0.98] transition-all w-full flex flex-col"
            style={{ boxShadow: "0 2px 12px rgba(230, 201, 122, 0.15)" }}
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray-200 flex-shrink-0 relative">
              <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-[#E6C97A] text-white px-2 py-1 rounded-full text-xs font-semibold">
                {shop.categories.length} Categories
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2 line-clamp-1">{shop.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#E6C97A] text-[#E6C97A]" />
                  <span className="font-semibold text-[#1F1F1F] text-sm">{shop.rating}</span>
                </div>
                <span className="text-xs text-[#8A8A8A]">({shop.reviews})</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-2 text-xs text-[#8A8A8A]">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{shop.location}</span>
                <span className="text-[#D4A574] text-xs">{shop.distance}</span>
              </div>

              {/* Shop Button */}
              <button className="w-full bg-gradient-to-r from-[#E6C97A] to-[#D4A574] text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity text-sm">
                <ShoppingBag className="w-4 h-4" />
                Browse Shop
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
