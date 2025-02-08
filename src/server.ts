import { app } from "./app";
import { env } from "./env";

const port = process.env.PORT;

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
    })
    .then(() => {
        console.log(`HTTP server running on: http://localhost:${port}`);
    })