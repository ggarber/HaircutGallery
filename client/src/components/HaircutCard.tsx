import { getHaircutPlaceholder } from "@/lib/placeholders";

interface HaircutCardProps {
  name: string;
  tags: string[];
  imageIndex: number;
}

export default function HaircutCard({ name, tags, imageIndex }: HaircutCardProps) {
  const placeholderSvg = getHaircutPlaceholder(imageIndex);

  return (
    <div className="haircut-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="w-full h-64 bg-neutral-200 flex items-center justify-center overflow-hidden">
        {placeholderSvg}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="tag bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
