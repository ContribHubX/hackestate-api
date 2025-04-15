import { NextFunction, Router, Response, Request } from "express";
import { Container } from "typedi";
import PersonaService from "./persona.service";
import { user } from "@/database/schema";

export const personaRouter: Router = Router();

personaRouter.get("/personas", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // In a real implementation, you would fetch from your database here
      // const personas = await personaService.getAllPersonas();
        const personaService = Container.get(PersonaService);
        const personas = await personaService.getAll();
        res.status(200).json(
            personas
        );
    } catch (error) {
      next(error); 
    }
});

personaRouter.post("/personas", 
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const listingName = req.body.listingName;   
        const personaDetails = req.body.personaDetails;   
        if(!userId){
            res.status(400).json({ message: "User Id is required" });
        }

        if(!listingName){
            res.status(400).json({ message: "listing name is required" });
        }

        const personaService = Container.get(PersonaService);
        const persona = await personaService.create(userId, listingName, personaDetails);
        res.status(200).json({
            persona
        });
    } catch (error) {
      next(error); 
    }
});

personaRouter.post("/personas/update", 
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.id;
        const approved = req.body.approved as boolean;
        if(!id){
            res.status(400).json({ message: "id is required" });
        }
        const personaService = Container.get(PersonaService);
        const result = await personaService.updateApproval(id, approved);
        res.status(200).json({result});
    } catch (error) {
      next(error); 
    }
});