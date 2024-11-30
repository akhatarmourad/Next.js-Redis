import { createClient } from "redis";

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

/* Check for errors */
client.on("error", (error) => {
    console.log(error);
})

/* Connect to DB */
if(!client.isOpen) client.connect();

/* Export Client */
export { client }