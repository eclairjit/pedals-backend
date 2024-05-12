import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const cycleSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rentRate: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    cycleType: {
      type: String,
      enum: ["gear", "non-gear"],
      required: true,
    },
    landmark: {
      type: String,
      enum: [
        "aquamarine",
        "jasper",
        "nac",
        "rosaline",
        "heritage",
        "penman",
        "sac",
        "library",
      ],
    },
    availableTill: {
      type: String,
    },
  },
  { timestamps: true }
);

cycleSchema.plugin(aggregatePaginate);

export const Cycle = mongoose.model("Cycle", cycleSchema);
