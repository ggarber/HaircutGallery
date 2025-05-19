import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

// Generate image for a haircut style
export async function generateHaircutImage(
  name: string, 
  gender: "male" | "female", 
  tags: string[]
): Promise<string> {
  try {
    const lengthTag = tags.find(tag => ["Short", "Medium", "Long"].includes(tag)) || "";
    const styleTag = tags.find(tag => ["Classic", "Modern"].includes(tag)) || "";
    
    const prompt = `A professional, realistic photo of a ${gender} model with a ${lengthTag.toLowerCase()} ${name} hairstyle. ${styleTag} style. Clear focus on the hair, fashion photoshoot quality, neutral studio background, photorealistic.`;
    
    console.log(`Generating image for: ${name} (${gender})`);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("No image data returned");
    }

    return response.data[0].url || "";
  } catch (error: any) {
    console.error("Error generating image:", error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}