import { useState, useEffect } from "react";
import { getHaircutPlaceholder } from "@/lib/placeholders";
import { Badge } from "@/components/ui/badge";

interface HaircutCardProps {
  name: string;
  tags: string[];
  imageIndex: number;
  gender: "male" | "female";
  id: number;
  onTagClick?: (tag: string) => void;
}

export default function HaircutCard({ name, tags, imageIndex, gender, id, onTagClick }: HaircutCardProps) {
  const placeholderSvg = getHaircutPlaceholder(imageIndex);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if the image exists in the public folder
  useEffect(() => {
    const checkImage = async () => {
      try {
        // Try both .png and .jpg extensions
        const extensions = ['.png', '.jpg', '.jpeg'];
        
        for (const ext of extensions) {
          const imagePath = `/images/haircuts/${gender}-${id}${ext}`;
          try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            if (response.ok) {
              setImageUrl(imagePath);
              return; // Exit if we find a valid image
            }
          } catch (e) {
            // Continue to next extension
          }
        }
        
        // If we get here, no valid image was found
        setImageUrl(null);
      } catch (error) {
        setImageUrl(null);
      }
    };

    checkImage();
  }, [gender, id]);

  return (
    <div className="haircut-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="w-full h-64 bg-neutral-200 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${name} hairstyle`} 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            style={{ display: imageError ? 'none' : 'block' }}
          />
        ) : null}
        
        {(!imageUrl || imageError) && placeholderSvg}
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
