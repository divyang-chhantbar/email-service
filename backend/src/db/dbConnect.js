import mongoose from "mongoose";

const connectDB = async () => {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
        console.log("DB is already connected");
        return;
    }
    
    try {
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI || '');
        
        if (dbConnect.connection.readyState === 1) {
            console.log("DB is connected successfully");
        } else if (dbConnect.connection.readyState === 2) {
            console.log("Connecting to DB...");
        } else {
            console.error("Unexpected DB connection state:", dbConnect.connection.readyState);
        }

    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
