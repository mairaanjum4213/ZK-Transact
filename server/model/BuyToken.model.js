import mongoose from "mongoose";

const { Schema } = mongoose; 

export const BuyTokenSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    metamaskAddress: {
        type: String,
        required: [true, "Please provide metamask address"]
    },
    serviceProviderName: {
        type: String,
        required: [true, "Please provide a seller name"],
    },
    transactionFee: {
        type: Number,
    },
    localCurrency: {
        type: Number,
        required: [true, "Please provide local Currency Amount"]
    },
    TokensAmount: {
        type: Number
    },
    buyReceipt: {
        data: Buffer,
        type: String
    },
    dateTimeField: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model.BuyTokens || mongoose.model('BuyToken', BuyTokenSchema);