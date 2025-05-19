import { getHaircutPlaceholder } from "@/lib/placeholders";
import { Badge } from "@/components/ui/badge";

interface HaircutCardProps {
  name: string;
  tags: string[];
  imageIndex: number;
  onTagClick?: (tag: string) => void;
}

export default function HaircutCard({ name, tags, imageIndex, onTagClick }: HaircutCardProps) {
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
            <Badge 
              key={index} 
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => onTagClick && onTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
