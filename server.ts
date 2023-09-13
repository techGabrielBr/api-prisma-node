import app from "./src/app";
import "dotenv/config";
import redisClient from "./src/config/redisClient";

app.listen(process.env.PORT, async () => {
    //connect to redis db
    await redisClient.connect();
    
    console.log("Server is running");
});