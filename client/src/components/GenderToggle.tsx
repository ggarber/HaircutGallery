import { motion } from "framer-motion";

type Gender = "male" | "female";

interface GenderToggleProps {
  active: Gender;
  onChange: (gender: Gender) => void;
}

export default function GenderToggle({ active, onChange }: GenderToggleProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative inline-block w-64 mx-auto">
        <div className="flex justify-center items-center bg-neutral-200 rounded-full p-1">
          <button
            onClick={() => onChange("male")}
            className={`relative w-1/2 py-2 text-center rounded-full z-10 transition-all duration-300 font-medium ${
              active === "male" ? "text-primary font-semibold" : "text-neutral-600"
            }`}
          >
            Male
          </button>
          <button
            onClick={() => onChange("female")}
            className={`relative w-1/2 py-2 text-center rounded-full z-10 transition-all duration-300 font-medium ${
              active === "female" ? "text-primary font-semibold" : "text-neutral-600"
            }`}
          >
            Female
          </button>
          <motion.div
            className="absolute top-1 left-1 w-[calc(50%-2px)] h-[calc(100%-8px)] bg-white rounded-full shadow-md"
            initial={{ x: active === "female" ? "100%" : 0 }}
            animate={{ x: active === "female" ? "100%" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </div>
  );
}
