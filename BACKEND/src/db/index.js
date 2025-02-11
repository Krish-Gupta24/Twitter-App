import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"

const dbConnection = async () => {
    try {
        const connectionmongo = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MONGODB CONNECTED TO : HOST || ${connectionmongo.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED", error)
        process.exit(1)
    }
}

export default dbConnection