import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose
        .connect('mongodb+srv://kbrflk8:LUR2cX2iwlP93EW0@blog-app.z3sxamu.mongodb.net/?retryWrites=true&w=majority&appName=blog-app')
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
};