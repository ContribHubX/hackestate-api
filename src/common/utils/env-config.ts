import dotenv from "dotenv";

dotenv.config();

export const env: EnvConfig = {
    port: process.env.PORT || "3001",
    databaseUrl: process.env.DATABASE_URL as string,

    //
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: process.env.JWT_EXPIRATION || "1d",
    resetTokenSecret: process.env.RESET_TOKEN_SECRET as string,

    //Google Secrets
    googleClientId: process.env.GOOGE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGE_CLIENT_SECRET as string,
    googleRedirectUrl: process.env.GOOGE_REDIRECT_URL as string,

    //Github Secrets
    githubClientId: process.env.GITHUB_CLIENT_ID as string,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    githubRedirectUrl: process.env.GITHUB_REDIRECT_URL as string
};


export const emailConfig: EmailConfig = {
    host: process.env.EMAIL_HOST || "localhost",
    port: Number(process.env.EMAIL_PORT) || 25,
    username: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    secure: process.env.EMAIL_SECURE === "true",
    rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED === "true",
};

export const cloudinaryConfig: CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    secret: process.env.CLOUDINARY_API_SECRET as string,
}


export type EnvConfig = {
    port: string;
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
    resetTokenSecret: string;

    //Google Secrets
    googleClientId: string;
    googleClientSecret: string;
    googleRedirectUrl: string;

    //
    githubClientId: string;
    githubClientSecret: string;
    githubRedirectUrl: string;

};

export type EmailConfig = {
    host: string,
    port: number,
    username: string,
    password: string, 
    secure: boolean,
    rejectUnauthorized: boolean
}

export type CloudinaryConfig = {
    cloudName: string,
    apiKey: string,
    secret: string,
}