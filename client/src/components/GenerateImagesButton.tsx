import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GenerateImagesButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSampleImages = async () => {
    try {
      setIsGenerating(true);
      
      const response = await fetch('/api/generate-sample-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate images');
      }

      const data = await response.json();
      
      toast({
        title: "Images generated successfully!",
        description: "Sample male and female haircut images have been created.",
        duration: 5000,
      });
      
      // Force a refresh to show the new images
      window.location.reload();
      
    } catch (error: any) {
      console.error('Error generating images:', error);
      
      toast({
        title: "Image generation failed",
        description: error.message || "There was an error generating the images. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={generateSampleImages} 
      disabled={isGenerating}
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating samples...
        </>
      ) : (
        <>
          <ImagePlus className="h-4 w-4" />
          Generate sample images
        </>
      )}
    </Button>
  );
}