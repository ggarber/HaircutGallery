import { Request, Response, type Express } from "express";
import { createServer, type Server } from "http";
import { maleHaircuts, femaleHaircuts } from "../client/src/data/haircuts";

export async function registerRoutes(app: Express): Promise<Server> {
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
  
  const httpServer = createServer(app);
  return httpServer;
}
