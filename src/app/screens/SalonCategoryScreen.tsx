
import { Star } from "lucide-react";

interface SalonCategoryScreenProps {
  onBack: () => void;
  onSalonClick: (salonId: number) => void;
}

const services = [
  {
    name: "Haircut",
    image: "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sub: [
      {
        name: "Haircut for Men",
        rating: 4.5,
        reviews: 4,
        price: 250,
        desc: "Professional men's haircut services for a sharp, stylish look tailored to your preferences and hair type.",
        image: "https://images.unsplash.com/photo-1654097801176-cb1795fd0c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      },
      {
        name: "Kids Haircut",
        rating: 4.8,
        reviews: 4,
        price: 250,
        desc: "Enjoy a fun and gentle kids' haircut experience, ensuring your child leaves with a stylish and comfortable look!",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    name: "Shave & Beard",
    image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80",
    sub: [
      {
        name: "Beard Trimming & Styling",
        rating: 5.0,
        reviews: 2,
        price: 200,
        desc: "Expert beard trimming and styling for a clean, sharp look.",
        image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    name: "Facial",
    image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sub: [
      {
        name: "Classic Facial",
        rating: 4.7,
        reviews: 3,
        price: 400,
        desc: "Rejuvenate your skin with our classic facial treatment.",
        image: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      }
    ]
  },
  {
    name: "Detan",
    image: "https://slimmingsolutionsspa.com/wp-content/uploads/2025/07/Chemical-Peels-Risks-and-Side-Effects.jpg",
    sub: [
      {
        name: "Detan Treatment",
        rating: 4.6,
        reviews: 2,
        price: 350,
        desc: "Brighten and refresh your skin with our detan treatment.",
        image: "https://slimmingsolutionsspa.com/wp-content/uploads/2025/07/Chemical-Peels-Risks-and-Side-Effects.jpg"
      }
    ]
  },
  {
    name: "Hair Color",
    image: "https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sub: [
      {
        name: "Global Hair Color",
        rating: 4.9,
        reviews: 5,
        price: 1200,
        desc: "Vibrant, long-lasting hair color for a fresh new look.",
        image: "https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      }
    ]
  },
  {
    name: "Mani-Pedi",
    image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sub: [
      {
        name: "Classic Mani-Pedi",
        rating: 4.6,
        reviews: 3,
        price: 500,
        desc: "Pamper your hands and feet with our classic mani-pedi.",
        image: "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      }
    ]
  },
  {
    name: "Keratin Hair Spa",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    sub: [
      {
        name: "Keratin Spa",
        rating: 4.8,
        reviews: 2,
        price: 1500,
        desc: "Deep conditioning keratin spa for smooth, shiny hair.",
        image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
    ]
  },
  {
    name: "Head Massage",
    image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sub: [
      {
        name: "Relaxing Head Massage",
        rating: 4.7,
        reviews: 3,
        price: 300,
        desc: "Relax and unwind with a soothing head massage.",
        image: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      }
    ]
  }
];

export function SalonCategoryScreen({ onBack }: SalonCategoryScreenProps) {
  return (
    <div className="min-h-screen bg-white pb-20">
      <button onClick={onBack} className="m-4 text-[#6C4AB6] font-medium">← Back</button>
      <div className="px-4">
        <h2 className="text-xl font-bold mb-4 text-[#1F1F1F]">What service do you need ?</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {services.map((svc) => (
            <div key={svc.name} className="flex flex-col items-center">
              <img src={svc.image} alt={svc.name} className="w-20 h-20 object-cover rounded-xl mb-2" />
              <span className="text-sm text-[#1F1F1F] text-center">{svc.name}</span>
            </div>
          ))}
        </div>

        {services.map((svc) => (
          <div key={svc.name} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{svc.name}</h3>
            {svc.sub.map((sub) => (
              <div key={sub.name} className="flex flex-col md:flex-row md:items-center bg-[#F8F7FF] rounded-xl p-4 mb-4 shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#1F1F1F]">{sub.name}</span>
                    <span className="flex items-center text-yellow-500 text-sm ml-2">
                      <Star className="w-4 h-4 mr-1" fill="#FFD700" />
                      {sub.rating} <span className="text-[#888] ml-1">({sub.reviews} reviews)</span>
                    </span>
                  </div>
                  <div className="text-[#6C4AB6] font-semibold text-sm mb-1">Starts at ₹{sub.price}</div>
                  <div className="text-[#444] text-sm mb-2">{sub.desc}</div>
                  <button className="text-[#6C4AB6] text-xs font-medium underline mb-2">Show more &gt;</button>
                </div>
                <div className="flex flex-col items-center gap-2 ml-4">
                  <img src={sub.image} alt={sub.name} className="w-20 h-20 object-cover rounded-lg" />
                  <button className="border border-[#6C4AB6] text-[#6C4AB6] rounded-lg px-4 py-1 text-xs font-semibold hover:bg-[#6C4AB6] hover:text-white transition">Add</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
