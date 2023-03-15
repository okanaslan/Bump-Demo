import express from "express";
import { Server as httpServer } from "http";

import { endpoints } from "./endpoints/registerEndpoints";

export class Server {
    static expressServer = express();
    static httpServer?: httpServer;

    static async start(port?: number): Promise<void> {
        Server.expressServer.use(express.json({ }));
        Server.expressServer.use(express.urlencoded({ extended: false }));

        // Listen endpoints
        for (const endpoint of endpoints) {
            endpoint.listen(this.expressServer);
        }

        try {
            Server.httpServer = Server.expressServer.listen({ port }, async () => console.info(`Service ready at port: ${port}`));
        } catch (error) {
            process.exit(1);
        }
    }
}
