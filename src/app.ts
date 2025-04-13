import "reflect-metadata";
import express from "express";
import { env } from "./common/utils/env-config";
import { Server } from "http";
import { corsConfig } from "./common/utils/cors";

async function main() {
    const app = express();
    const PORT = env.port;
    let serverListener: Server;

    ((await import("./startups/express")).default(app));

    serverListener = app.listen(PORT, () => {
        console.log(`Running on port: ${PORT}`)
    })
}


main();
