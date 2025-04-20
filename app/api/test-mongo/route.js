import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    const dbURI = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export async function GET(req) {
  try {
    await connectDB();
    return new Response("MongoDB connected successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to connect:", error);
    return new Response("Failed to connect to MongoDB", { status: 500 });
  }
}
