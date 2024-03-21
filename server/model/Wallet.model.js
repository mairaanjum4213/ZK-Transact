import mongoose, { Schema } from "mongoose";

const WalletSchema = new Schema({
    metamaskAddress: {
        type: String,
        required: [true, "Please provide an metamask address"],
    },
    zkTokens: {
        type: String,
        required: [true, "Please provide an account type"],
    }
}, {timestamps:true})

export default mongoose.model('Wallet', WalletSchema);