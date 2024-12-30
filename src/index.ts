process.loadEnvFile(".env");
import { PORT, SERVER_ON } from "./server/consts";
import server from "./server/server";

// server-up

server.listen(PORT, () => console.log(SERVER_ON));
