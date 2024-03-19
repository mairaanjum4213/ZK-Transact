import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
    accountNumber: {
        type: String,
        required: [true, "Please provide an account number"],
    },
    accountType: {
        type: String,
        required: [true, "Please provide an account type"],
    },
    accountName: {
        type: String,
        required: [true, "Please provide an account holder name"],
    },

}, {timestamps:true})

export default mongoose.model('Accounts', AccountSchema);