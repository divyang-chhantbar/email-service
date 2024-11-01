import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const recipientSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Simple regex for email validation (you can improve this)
                return /^\S+@\S+\.\S+$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    name : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        enum : ['active', 'inactive'],
        default: 'active'
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
},{timestamps: true});

// Pre-save hook to set the name based on the email
recipientSchema.pre('save', function (next) {
    if (!this.name) {
        this.name = extractNameFromEmail(this.email); // Set the name if not provided
    }
    next();
});

// Function to extract name from email
function extractNameFromEmail(email) {
    const namePart = email.split('@')[0]; // Get the part before the '@'
    const name = namePart
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitalize each part
        .join(' '); // Join with space
    return name;
}

export default mongoose.model('Recipient', recipientSchema);