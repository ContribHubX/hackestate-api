import { User } from "@/database/schema";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
            token?: string;
        }
    }
}
