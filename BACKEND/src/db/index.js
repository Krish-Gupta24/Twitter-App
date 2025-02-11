import mongoose  from "mongoose"

const dbConnection = async () => {
    try {
        const connectionmongo = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MONGODB CONNECTED TO : HOST || ${connectionmongo.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED", error)
        process.exit(1)
    }
}

export default dbConnection