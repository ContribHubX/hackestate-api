import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "./auth.service";
import {
  checkPidSchema,
  loginAdminSchema,
  loginSchema,
  registerAdminSchema,
  registerSchema,
  updateUserPasswordSchema,
} from "./auth.contracts";
import { validateData } from "@/common/middleware/validate-request";
import { verifyAuth } from "@/common/middleware/verify-auth";


export const authRouter: Router = Router();

authRouter.post(
  "/auth/login",
  validateData(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const { user, token } = await authService.Login(req.body);

      Reflect.deleteProperty(user, "password");
      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/admin/login",
  validateData(loginAdminSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const { admin, token } = await authService.LoginAdmin(req.body);

      Reflect.deleteProperty(admin, "password");
      res.status(200).json({
        admin,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/admin/register",
  validateData(registerAdminSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const admin = await authService.RegisterAdmin(req.body);

      Reflect.deleteProperty(admin, "password");
      res.status(200).json({
        admin
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  "/auth/me",
  verifyAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const admin = await authService.GetUser();

      res.status(200).json({
        admin,
        token: req.token
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/check-pid",
  validateData(checkPidSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { pid } = req.body;

    try {
      const authService = Container.get(AuthService);
      const result = await authService.CheckPid(pid);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.put(
  "/auth/update-user",
  validateData(updateUserPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    try {
      const authService = Container.get(AuthService);
      const updatedUser = await authService.UpdateUser(user);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);







