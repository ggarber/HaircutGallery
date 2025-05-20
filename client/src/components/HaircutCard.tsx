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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Create Google Images search URL
  const getGoogleImagesUrl = () => {
    const searchQuery = `${name} ${gender} haircut`;
    return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;
  };

  // Try loading image with proper path
  useEffect(() => {
    const loadImage = async () => {
      setImageLoading(true);
      setImageError(false);
      
      // Use the API endpoint to serve images instead of direct static path
      // Alternatively use the correct static path based on server configuration
      const imagePath = `/images/haircuts/${gender}-${id}.png`;
      // Alternative approaches if the above doesn't work:
      // const imagePath = `${process.env.PUBLIC_URL || ''}/images/haircuts/${gender}-${id}.png`;
      // const imagePath = `${window.location.origin}/api/static/haircuts/${gender}-${id}.png`;
      
      try {
        // Create a promise that resolves if image loads and rejects if it errors
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = imagePath;
        });
        
        // If we get here, the image loaded successfully
        setImageUrl(imagePath);
        setImageLoading(false);
      } catch (e) {
        // Image failed to load
        console.error("Failed to load image:", imagePath);
        setImageLoading(false);
        setImageError(true);
        setImageUrl(null);
      }
    };

    loadImage();
  }, [gender, id]);

  return (
    <div className="haircut-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="w-full h-64 bg-neutral-200 flex items-center justify-center overflow-hidden relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={`${name} hairstyle`} 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            style={{ display: imageError ? 'none' : 'block' }}
          />
        ) : null}
        
        {(!imageUrl || imageError) && !imageLoading && placeholderSvg}
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
        
        <div className="flex justify-end mt-3">
          <a 
            href={getGoogleImagesUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Real Examples →
          </a>
        </div>
      </div>
    </div>
  );
}
