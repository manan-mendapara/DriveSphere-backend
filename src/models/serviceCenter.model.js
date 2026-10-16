
import mongoose from "mongoose";

const serviceCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    supportedBrands: {
      type: [String],
      required: true,
      validate: {
        validator: (brands) =>
          Array.isArray(brands) && brands.length > 0,
        message: "At least one supported brand is required.",
      },
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
          message: "Invalid longitude or latitude.",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

serviceCenterSchema.index({ location: "2dsphere" });

const ServiceCenter = mongoose.model(
  "ServiceCenter",
  serviceCenterSchema
);

export default ServiceCenter;
