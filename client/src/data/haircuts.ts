import { Haircut } from "@shared/schema";

// Available tag categories
export const tagCategories = {
  style: ["Classic", "Modern"],
  length: ["Short", "Medium", "Long"]
};

// Male haircuts data
export const maleHaircuts: Haircut[] = [
  {
    id: 1,
    name: "Undercut",
    tags: ["Modern", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 2,
    name: "Crew Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 3,
    name: "Fade",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 4,
    name: "Pompadour",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 5,
    name: "Side Part",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 6,
    name: "Buzz Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 7,
    name: "Quiff",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 8,
    name: "Slicked Back",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 9,
    name: "Textured Crop",
    tags: ["Modern", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 10,
    name: "Faux Hawk",
    tags: ["Modern", "Medium"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 11,
    name: "Comb Over",
    tags: ["Classic", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 12,
    name: "French Crop",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 13,
    name: "Taper Cut",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 14,
    name: "Ivy League",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 15,
    name: "Messy Textured",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 16,
    name: "Bro Flow",
    tags: ["Modern", "Long"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 17,
    name: "High and Tight",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 18,
    name: "Regulation Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 19,
    name: "Man Bun",
    tags: ["Modern", "Long"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 20,
    name: "Hard Part",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "male"
  }
];

// Female haircuts data
export const femaleHaircuts: Haircut[] = [
  {
    id: 21,
    name: "Bob",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 22,
    name: "Layered Cut",
    tags: ["Classic", "Long"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 23,
    name: "Pixie Cut",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 24,
    name: "Lob (Long Bob)",
    tags: ["Modern", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 25,
    name: "Bangs",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 26,
    name: "Shag Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 27,
    name: "Beach Waves",
    tags: ["Modern", "Long"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 28,
    name: "Blunt Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 29,
    name: "Asymmetrical Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 30,
    name: "Feathered Layers",
    tags: ["Classic", "Medium"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 31,
    name: "Curtain Bangs",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 32,
    name: "Undercut (Female)",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 33,
    name: "French Bob",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 34,
    name: "Wolf Cut",
    tags: ["Modern", "Short"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 35,
    name: "Hime Cut",
    tags: ["Classic", "Long"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 36,
    name: "Rachel Cut",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 37,
    name: "Butterfly Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 38,
    name: "Chin-Length Bob",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 39,
    name: "A-Line Bob",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 40,
    name: "Bixie Cut",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "female"
  }
];
