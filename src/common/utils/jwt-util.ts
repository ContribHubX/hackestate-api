import jwt,{ JwtPayload, SignOptions } from "jsonwebtoken"
import { env } from "./env-config";

export function provideToken(payload: JwtPayload): string {
    const expiration = env.jwtExpiration;
    const token = jwt.sign(
        payload,
        env.jwtSecret,
        {expiresIn: expiration || "1d"} as SignOptions
    )

    return token;
}

export function providePasswordResetToken(userId: string): string {
    return jwt.sign({id: userId},
        env.resetTokenSecret,
        {expiresIn: "1d"}
    )
}

export function verifyPasswordResetToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, env.resetTokenSecret) as { id: string };
      return decoded.id;
    } catch (error) {
      console.error("Invalid or expired token:", error);
      return null;
    }
}


export function verifyLocalToken(token: string): {ok: boolean, decoded: JwtPayload | undefined} {
    try {
        const decoded = jwt.verify(token, env.jwtSecret as string);
        return { ok: true, decoded: decoded as JwtPayload};
    } catch(error) {
        throw error;
    }
}

export function parseLocalToken(rawToken: string): string {
    const provider =  rawToken.split("_")[0];
    return rawToken.substring(provider.length + 1);
}
