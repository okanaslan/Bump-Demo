import express from "express";
import { Server as httpServer } from "http";
import { getUserEndpoint } from "./endpoints/auth/getUser";

export class Server {
    static expressServer = express();
    static httpServer?: httpServer;

    static async start(port?: number): Promise<void> {
        Server.expressServer.use(express.json({}));

        // Listen endpoints
        this.expressServer.get(getUserEndpoint.path, getUserEndpoint.handler);

        try {
            Server.httpServer = Server.expressServer.listen({ port }, async () => console.info(`Service ready at port: ${port}`));
        } catch (error) {
            process.exit(1);
        }
    }
}
