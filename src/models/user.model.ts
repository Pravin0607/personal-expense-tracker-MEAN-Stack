import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    password: string;
    token?: string;
    generateToken: () => string;
}

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
}, { timestamps: true });

// Pre-save middleware to hash the password before saving
userSchema.pre<UserDocument>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (error:any) {
        return next(error);
    }
});



// Method to generate a token for the user
userSchema.methods.generateToken = function (): string {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string); // Replace "your_secret_key" with your actual secret key
    user.token = token;
    return token;
};

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this;
    return await bcrypt.compare(candidatePassword, user.password);
};

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument };
