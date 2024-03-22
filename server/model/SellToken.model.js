import mongoose, { Schema } from "mongoose";

const SellTokenSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sellerMetamask: {
        type: String,
        required: [true, "Please provide a metamask address"]
    },
    purchaserName: {
        type: String,
        required: [true, "Please provide a purchaser name"],
    },
    accountNumber: {
        type: String,
        required: [true, "Please provide an account number"],
    },
    accountComments: {
        type: String,
        required: [true, "Please provide an account title or comments"],
    },

    accountName: {
        type: String,
        required: [true, "Please provide an account title or comments"],
    },

    contractHash: {
        type: String,
        required: [true, "Please provide an account title or comments"],
    },

    transactionFee: {
        type: Number,
    },
    localCurrencyAmount: {
        type: Number,
        required: [true, "Please provide a local Currency Amount"]
    },
    Tokens: {
        type: Number
    },
    SellTokendateTimeField: {
        type: Date,
        default: Date.now
    },
    transactionStatus:{
        type:String,
        enum: ["Pending", "Approved", "Declined"]
    },
    commentsByAdmin:{
        type:String
    }
    
});

export default mongoose.models.SellToken || mongoose.model('SellToken', SellTokenSchema);
