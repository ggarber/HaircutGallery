import { useState } from "react";
import GenderToggle from "./GenderToggle";
import HaircutCard from "./HaircutCard";
import { maleHaircuts, femaleHaircuts } from "@/data/haircuts";

type Gender = "male" | "female";

export default function HaircutGallery() {
  const [activeGender, setActiveGender] = useState<Gender>("male");

  const handleGenderToggle = (gender: Gender) => {
    setActiveGender(gender);
  };

  const haircuts = activeGender === "male" ? maleHaircuts : femaleHaircuts;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Trendy Haircut Styles</h1>
        <p className="text-neutral-600 text-center mb-8">Discover popular haircut styles for all preferences</p>
        
        <GenderToggle active={activeGender} onChange={handleGenderToggle} />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {haircuts.map((haircut) => (
          <HaircutCard 
            key={haircut.id} 
            name={haircut.name} 
            tags={haircut.tags} 
            imageIndex={haircut.imageIndex} 
          />
        ))}
      </div>
    </div>
  );
}
