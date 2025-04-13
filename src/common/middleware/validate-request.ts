import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

export interface ValidationError {
  field: string;
  expected: string;
  received: string;
  message: string;
}

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
            const errorDetails: ValidationError[] = [];

            error.errors.forEach((issue) => {
              const field = issue.path.join(".");
              errorDetails.push({
                field: issue.path.join("."),
                expected: (issue as any).expected,
                received: (issue as any).received,
                message: issue.message
              })
            })

            res.status(400).json({ error: 'Invalid data', details: errorDetails });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    };
  }
