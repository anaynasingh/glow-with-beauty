import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServiceCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function ServiceCard({ name, image, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md active:scale-95 transition-transform"
      style={{ minWidth: 0 }}
    >
      {/* Background Image */}
      <ImageWithFallback
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C8D]/90 via-[#6C4AB6]/60 to-transparent" />
      {/* Service Name */}
      <div className="absolute bottom-0 left-0 right-0 pb-2 flex items-end justify-center">
        <span
          className={
            `text-white font-semibold drop-shadow-lg text-center px-1 w-full block ` +
            (name === 'Photography'
              ? 'text-[0.62rem] leading-tight whitespace-nowrap overflow-hidden text-ellipsis'
              : name.trim().split(/\s+/).length > 1
                ? 'text-[0.72rem] leading-tight break-words whitespace-normal'
                : 'text-[0.72rem] leading-tight whitespace-nowrap overflow-hidden text-ellipsis')
          }
          style={{ maxWidth: '100%' }}
        >
          {name}
        </span>
      </div>
    </button>
  );
}