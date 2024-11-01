import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'],
    },    
    email : {
        type : String,
        required  : [true , "Email is Required !"],
        unique : true,
        match : [/^\S+@\S+\.\S+$/,"please provide a valid email address !"]
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
        minlength : [8, 'Password must be at least 8 characters long'],
    },
    fullname : {
        type: String,
        required: true,
    },
    isLoggedIn : {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('User', userSchema);