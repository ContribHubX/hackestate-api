import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { Container } from "typedi";
import TestResultService from "./test-result.service";
import { verifyAuth } from "@/common/middleware/verify-auth";

export const testResultRouter: Router = Router();

// TODO need to extreact into common/config
const storage = multer.memoryStorage();
const upload = multer({ storage });

testResultRouter.post(
  "/test-result",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`File: ${req.file}`);

    try {
      if (!req.file) {
         res.status(400).json({ message: "No file uploaded" });
         return;
      }

      const file = req.file as Express.Multer.File;

      const testResultService = Container.get(TestResultService);
      const results = await testResultService.UploadTestResult(file);
      // Reflect.deleteProperty(results, "binaryPdf");

      res.status(201).json({ results });
    } catch (error) {
      next(error);
    }
  }
);

testResultRouter.get(
  "/test-result",
  verifyAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const testResultService = Container.get(TestResultService);
      const results = await testResultService.GetTestResults();

      res.status(200).json([ ...results ]);
    } catch (error) {
      next(error);
    }
  }
);

testResultRouter.get(
    "/test-result/:id",
    verifyAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        console.log(`user id: ${id}`);

        if(!id){
          res.status(400).json({ message: "Test result ID is required" });
          return;
        }

        const testResultService = Container.get(TestResultService);
        const result = await testResultService.GetTestResult(id);
        console.log(`res: ${result}`);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );


