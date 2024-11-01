import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true});

export default mongoose.model('Category', categorySchema);