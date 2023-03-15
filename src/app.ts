import { Server } from "./server";

/**
 * Application start point
 */
export class App {
    static start = async () => {
        const port = parseInt(process.env["PORT"] ?? "3000");
        try {
            await Server.start(port);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    };
}
