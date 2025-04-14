import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Container, Inject, Service } from "typedi";
import * as schema from "@/database/schema";
import { User, UserInsert } from "@/database/schema";
import {
  LoginSchema,
  LoginResponse,
  RegisterSchema,
  ForgotPasswordSchema,
  ChangePasswordSchema,
  CheckPidResponse,
  LoginAdminSchema,
  LoginAdminResponse,
  RegisterAdminSchema,
} from "./auth.contracts";
import { eq } from "drizzle-orm";
import { AppError } from "@/common/app-error";
import bcrypt from "bcrypt";
import {
  providePasswordResetToken,
  provideToken,
  verifyPasswordResetToken,
} from "@/common/utils/jwt-util";
import { HttpContextService } from "@/common/http-context";
import EmailService from "@/common/utils/email-service";

@Service()
class AuthService {
  @Inject(() => HttpContextService)
  private readonly httpContext!: HttpContextService;

  @Inject(() => EmailService)
  private readonly emailService!: EmailService;

  private readonly db!: NodePgDatabase<typeof schema>;

  constructor() {
    this.db = Container.get("database");
  }

  async GetUsers(): Promise<User[]> {
    const users = await this.db.query.user.findMany({});
    return users;
  }

  async CreateUser(registerRequest: RegisterSchema): Promise<User> {
    const [createdUser] = await this.db
      .insert(schema.user)
      .values({ ...registerRequest })
      .returning();
    return createdUser;
  }

  // async UpdateUser(user: UserInsert): Promise<User> {
  //   // NOTE only update password
  //   const { pid, dob, createdAt, ...fieldsUpdated } = user;

  //   const hashedPassword = await bcrypt.hash(fieldsUpdated.password!, 10);

  //   const [updatedUser] = await this.db
  //     .update(schema.user)
  //     .set({ ...fieldsUpdated, password: hashedPassword})
  //     .where(eq(schema.user.pid, user.pid!))
  //     .returning();

  //   return updatedUser;
  // }

  async Register(registerRequest: RegisterSchema) {
    const existingUser = await this.db.query.user.findFirst({
      where: eq(schema.user.email, registerRequest.email),
    });

    if (existingUser) {
      throw AppError.badRequest("User already exist");
    }

    await this.CreateUser({
      ...registerRequest,
    });
  }

  // async RegisterAdmin(
  //   registerAdminRequest: RegisterAdminSchema
  // ): Promise<Admin> {
  //   const existingAdmin = await this.db.query.admin.findFirst({
  //     where: eq(schema.admin.email, registerAdminRequest.email),
  //   });

  //   if (existingAdmin) {
  //     throw AppError.badRequest("admin already exists");
  //   }

  //   const hashedPassword = await bcrypt.hash(registerAdminRequest.password, 10);

  //   const [createdAdmin] = await this.db
  //     .insert(schema.admin)
  //     .values({
  //       ...registerAdminRequest,
  //       password: hashedPassword
  //     })
  //     .returning();

  //   return createdAdmin;
  // }

  async Login(loginRequest: LoginSchema): Promise<LoginResponse> {
    const existingUser = await this.db.query.user.findFirst({
      where: eq(schema.user.email, loginRequest.email),
    });

    if (!existingUser) {
      throw AppError.notFound("User doesn't exist");
    }

    const isMatch = await bcrypt.compare(
      loginRequest.password,
      existingUser.password!
    );

    if (!isMatch) {
      throw AppError.forbidden("Invalid Credentials");
    }

    const token = provideToken(existingUser);

    return {
      user: existingUser,
      token,
    };
  }

  // async LoginAdmin(
  //   loginAdminSchema: LoginAdminSchema
  // ): Promise<LoginAdminResponse> {
  //   const existingAdmin = await this.db.query.admin.findFirst({
  //     where: eq(schema.admin.email, loginAdminSchema.email),
  //   });

  //   if (!existingAdmin) {
  //     throw AppError.notFound("User doesn't exist");
  //   }

  //   const isMatch = await bcrypt.compare(
  //     loginAdminSchema.password,
  //     existingAdmin.password!
  //   );

  //   if (!isMatch) {
  //     throw AppError.forbidden("Invalid Credentials");
  //   }

  //   const token = provideToken(existingAdmin);

  //   return {
  //     admin: existingAdmin,
  //     token,
  //   };
  // }

  // async CheckPid(pid: string): Promise<CheckPidResponse> {
  //   const existingUser = await this.db.query.user.findFirst({
  //     where: eq(schema.user.pid, pid),
  //   });

  //   if (!existingUser) {
  //     return {
  //       hasPassword: false,
  //       hasPid: false,
  //       pid,
  //     };
  //   }

  //   if (!existingUser.password) {
  //     return {
  //       hasPassword: false,
  //       hasPid: true,
  //       pid,
  //     };
  //   }

  //   return {
  //     hasPassword: true,
  //     hasPid: true,
  //     pid,
  //   };
  // }

  async GetUser(): Promise<User | undefined> {
    return this.httpContext.getRequest().currentUser;
  }
}

export default AuthService;
