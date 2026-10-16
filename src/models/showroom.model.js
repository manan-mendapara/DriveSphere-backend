
import mongoose from "mongoose";

const showroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (coordinates) =>
            coordinates.length === 2 &&
            coordinates.every(Number.isFinite) &&
            coordinates[0] >= -180 &&
            coordinates[0] <= 180 &&
            coordinates[1] >= -90 &&
            coordinates[1] <= 90,
          message:
            "Coordinates must contain valid longitude and latitude.",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Required for nearby location searches
showroomSchema.index({ location: "2dsphere" });

const Showroom = mongoose.model("Showroom", showroomSchema);

export default Showroom;
