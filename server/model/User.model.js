import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    fullName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    kycStatus: {
        type: Boolean,
        default:false 
    },
    region: {
        type: String,
        required : [true, "Please provide your region"],
       
    },
    
});

//if already have user model in mongodb database then use exisiting model otherwise return new one
export default mongoose.model.Users || mongoose.model('User', UserSchema);