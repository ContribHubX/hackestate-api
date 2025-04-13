import { passwordSchema } from "@/common/utils/common-validation";
import { Admin, adminRole } from "@/database/schema/admin";
import { User } from "@/database/schema/user";
import {z} from "zod";


export const loginSchema = z.object(
    {
        pid: z.string(),
        password: passwordSchema
    }
)

export const loginAdminSchema = z.object({
    email: z.string().email(),
    password: passwordSchema
})

export const registerSchema = z.object(
    {
        pid : z.string()
    }
)

export const registerAdminSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
    role : z.enum([...adminRole.enumValues])
})

export const forgotPasswordSchema = z.object({
    email: z.string().email()
});

export const changePasswordSchema = z.object({
    passwordResetToken: z.string(),
    newPassword: passwordSchema
});

export const checkPidSchema = z.object({
  pid: z.string()
});

export const updateUserPasswordSchema = z.object({
  pid: z.string(),
  password: passwordSchema
});



export type LoginSchema = z.infer<typeof loginSchema>
export type LoginResponse = {
    token: string;
    user: User;
}

export type LoginAdminSchema = z.infer<typeof loginAdminSchema>;
export type LoginAdminResponse = {
    token: string;
    admin: Admin;
}

export type RegisterSchema = z.infer<typeof registerSchema>
export type RegisterAdminSchema = z.infer<typeof registerAdminSchema>;

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordResponse = {

}

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordResponse = {

}


export type CheckPidSchema =z.infer<typeof checkPidSchema>;

export type CheckPidResponse = {
    hasPassword : boolean;
    hasPid: boolean;
    pid : string;
}
