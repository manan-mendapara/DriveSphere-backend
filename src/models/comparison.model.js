
import mongoose from "mongoose";

const comparisonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cars: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Car",
          required: true,
        },
      ],
      required: true,
      validate: {
        validator: (cars) =>
          Array.isArray(cars) &&
          cars.length === 2 &&
          cars[0].toString() !== cars[1].toString(),
        message: "Select exactly 2 different cars to compare.",
      },
    },
  },
  {
    timestamps: true,
  }
);

comparisonSchema.index({ userId: 1 }, { unique: true });

const Comparison = mongoose.model("Comparison", comparisonSchema);

export default Comparison;
