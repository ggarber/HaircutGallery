import { Request, Response, type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerOpenAIRoutes } from "./openai";
import { maleHaircuts, femaleHaircuts } from "../client/src/data/haircuts";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register OpenAI routes for image generation
  registerOpenAIRoutes(app);
  
  // API endpoint to get all haircuts
  app.get("/api/haircuts", (req: Request, res: Response) => {
    const gender = req.query.gender as string;
    
    if (gender === "male") {
      res.json(maleHaircuts);
    } else if (gender === "female") {
      res.json(femaleHaircuts);
    } else {
      res.json([...maleHaircuts, ...femaleHaircuts]);
    }
  });
  
  // API endpoint to generate a sample image
  app.post("/api/generate-sample-images", async (req: Request, res: Response) => {
    try {
      // Generate a sample male haircut image
      const maleHaircut = maleHaircuts[0];
      
      // Make a request to our own API to generate a male haircut image
      const maleResponse = await fetch(`http://localhost:${app.get("port")}/api/generate-haircut-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: maleHaircut.id,
          name: maleHaircut.name,
          gender: maleHaircut.gender,
          tags: maleHaircut.tags
        })
      });
      
      const maleData = await maleResponse.json();
      
      // Generate a female haircut image
      const femaleHaircut = femaleHaircuts[0];
      
      const femaleResponse = await fetch(`http://localhost:${app.get("port")}/api/generate-haircut-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: femaleHaircut.id,
          name: femaleHaircut.name,
          gender: femaleHaircut.gender,
          tags: femaleHaircut.tags
        })
      });
      
      const femaleData = await femaleResponse.json();
      
      res.json({
        male: maleData,
        female: femaleData
      });
    } catch (error: any) {
      console.error("Error generating sample images:", error);
      res.status(500).json({
        error: "Failed to generate sample images",
        message: error.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
