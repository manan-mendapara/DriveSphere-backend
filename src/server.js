import dotenv from "dotenv";
import dns from "node:dns";
import app from "./app.js";
import connectDatabase from "./config/mongo.config.js";

dotenv.config();

// Local Node.js development only
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 5100;
const HOST = "127.0.0.1";

console.log("PORT from .env:", process.env.PORT);
console.log("PORT used by server:", PORT);

const startServer = async () => {
    try {
        await connectDatabase();

        const server = app.listen(PORT, HOST, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`🌐 URL: http://${HOST}:${PORT}`);
        });

        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`❌ Port ${PORT} is already in use.`);
                process.exit(1);
            }

            console.error("❌ Server error:", error);
            process.exit(1);
        });

    } catch (error) {
        // console.error("❌ Failed to start server:");
        console.error(error);
        process.exit(1);
    }
};

startServer();