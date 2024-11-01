import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    subject : {
        type: String,
        required: true,
        maxlength : [100, 'Message subject is too long'],
        trim: true
    },
    content : {
        type: String,
        required: true,
        maxlength : [300, 'Message content is too long'],
        trim: true
    },
    sender : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: [{
        type: Schema.Types.ObjectId,
        ref: 'Recaipient',
        required: true
    }],
    attachment : {
        type: String,
        validate: {
            validator: function (attachment) {
                return attachment === null || attachment.match(/^http(s?):\/\//);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },    
    status : {
        type: String,
        required: true,
        enum : ['sent', 'delivered', 'read'],
        default: 'sent'
    }
},{timestamps: true});