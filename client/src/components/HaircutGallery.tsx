import { useState, useEffect } from "react";
import GenderToggle from "./GenderToggle";
import HaircutCard from "./HaircutCard";
import { maleHaircuts, femaleHaircuts, tagCategories } from "@/data/haircuts";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type Gender = "male" | "female";

export default function HaircutGallery() {
  const [activeGender, setActiveGender] = useState<Gender>("male");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredHaircuts, setFilteredHaircuts] = useState(activeGender === "male" ? maleHaircuts : femaleHaircuts);
  
  // All available tags for the category
  const allTags = [...tagCategories.style, ...tagCategories.length];

  // Handle tag selection/deselection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      // Add tag if not already selected
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter haircuts based on selected tags
  useEffect(() => {
    const haircuts = activeGender === "male" ? maleHaircuts : femaleHaircuts;
    
    if (selectedTags.length === 0) {
      // If no tags selected, show all haircuts
      setFilteredHaircuts(haircuts);
    } else {
      // Filter haircuts that have all selected tags
      setFilteredHaircuts(
        haircuts.filter(haircut => {
          return selectedTags.every(tag => haircut.tags.includes(tag));
        })
      );
    }
  }, [activeGender, selectedTags]);

  const handleGenderToggle = (gender: Gender) => {
    setActiveGender(gender);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Trendy Haircut Styles</h1>
        <p className="text-neutral-600 text-center mb-8">Discover popular haircut styles for all preferences</p>
        
        <GenderToggle active={activeGender} onChange={handleGenderToggle} />
        
        {/* Selected tags display */}
        {selectedTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="default" 
                className="px-3 py-1 cursor-pointer flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Tag filter options */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2 text-center">Filter by Style & Length</h2>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {allTags.map(tag => (
            <Badge 
              key={tag} 
              variant={selectedTags.includes(tag) ? "outline" : "secondary"}
              className={`px-3 py-1 cursor-pointer transition-all ${
                selectedTags.includes(tag) 
                  ? "border-primary text-primary hover:bg-primary/10" 
                  : "hover:bg-secondary/80"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Display filtered haircuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {filteredHaircuts.length > 0 ? (
          filteredHaircuts.map((haircut) => (
            <HaircutCard 
              key={haircut.id} 
              id={haircut.id}
              name={haircut.name} 
              tags={haircut.tags} 
              imageIndex={haircut.imageIndex}
              gender={haircut.gender}
              onTagClick={toggleTag}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-neutral-500">
            <p className="text-lg mb-2">No haircuts match the selected filters</p>
            <p>Try selecting different tags or removing some filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
