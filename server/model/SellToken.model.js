import mongoose from "mongoose";

export const SellTokenSchema = new mongoose.Schema({
    seller : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sellerMetamask : {
        type: String,
        required : [true, "Please provide metamask address"]
    },
    purchaserName: {
        type: String,
        required: [true, "Please provide a purchaser name"],
    },
    accountNumber: {
        type: String,
        required: [true, "Please provide a account number"],
    },
    accountComments:{
        type: String,
        required: [true, "Please provide a account title or comments"],
    },
    transactionFee: {
        type: Number,
    },
    localCurrencyAmount: { type: Number, required : [true, "Please provide local Currency Amount"]},
    Tokens : { type : Number}, 
});
export default mongoose.model.SellTokens || mongoose.model('SellToken', SellTokenSchema);