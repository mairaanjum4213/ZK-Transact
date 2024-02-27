import mongoose, { Schema } from "mongoose";
const TransferTokenSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    beneficiaryMetamask: {
        type: String,
        required: [true, "Please provide a  beneficiary metamask address"]
    },
    senderMetamask: {
        type: String,
        required: [true, "Please provide a  sender metamask address"]
    },
    transferTokenAmount: {
        type: Number,
        required: [true, "Please provide tranfre token amount"],
    },
    transferContractHash: {
        type: String,
        required: [true, "Please provide an transfer token contract hash  number"],
    },
    transferTokendateTimeField: {
        type: Date   
    }
});
export default mongoose.models.TransferToken || mongoose.model('TransferToken', TransferTokenSchema);
