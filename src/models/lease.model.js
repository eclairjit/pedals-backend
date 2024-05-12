import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const leaseSchema = new mongoose.Schema(
  {
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

leaseSchema.plugin(aggregatePaginate);

export const Lease = mongoose.model("Lease", leaseSchema);
