import { createApp } from "./app";
import dotenv from "dotenv";

dotenv.config()

const port = process.env.PORT;
const app = createApp();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api/`)
});