import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default function connect () {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already Connected");
        return;
    }
    
    if (connectionState === 2) {
        console.log("Connecting...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "EcomexResources",
            bufferCommands: true
        });
        console.log("connected");
        
    } catch (err: unknown) {
        console.log("Error: ", err);
        throw new Error(String(err))

    }


}