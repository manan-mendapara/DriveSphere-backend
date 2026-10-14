
import mongoose from "mongoose";

const carCategory = [
  "Budget",
  "Mid-Range",
  "Premium",
  "Luxury",
  "Sports",
  "Supercar",
  "Family",
  "Off-Road",
  "Commercial",
  "Vintage",
];

const carBodyType = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "MPV",
  "Wagon",
  "Limousine",
  "Pickup Truck",
  "Off-Road",
];

const fuelType = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
  "CNG",
];

const transmission = [
  "Automatic",
  "Manual",
  "CVT",
  "AMT",
  "DCT",
  "iMT",
];

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      match: /^[a-zA-Z0-9&.\-\s]+$/,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    variant: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    year: {
      type: Number,
      required: true,
      min: 1886,
      max: new Date().getFullYear() + 1,
      validate: {
        validator: Number.isInteger,
        message: "Year must be a whole number.",
      },
    },

    bodyType: {
      type: String,
      enum: carBodyType,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: carCategory,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    specification: {
      fuelType: {
        type: String,
        enum: fuelType,
        required: true,
      },

      transmission: {
        type: String,
        enum: transmission,
        required: true,
      },

      // EVs don't have engine displacement in CC.
      engineCC: {
        type: Number,
        default: null,
        min: 0,
      },

      horsepower: {
        type: Number,
        required: true,
        min: 0,
      },

      torque: {
        type: Number,
        required: true,
        min: 0,
      },

      seatingCapacity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
          validator: Number.isInteger,
          message: "Seating capacity must be a whole number.",
        },
      },

      // Fuel economy in km/L; use a separate range field for EVs.
      mileage: {
        type: Number,
        default: null,
        min: 0,
      },

      // Useful for electric vehicles; range in km.
      rangeKm: {
        type: Number,
        default: null,
        min: 0,
      },
    },

    features: {
      sunroof: { type: Boolean, default: false, required: true },
      parkingCamera: { type: Boolean, default: false, required: true },
      climateControl: { type: Boolean, default: false, required: true },
      powerWindow: { type: Boolean, default: false, required: true },
      adas: { type: Boolean, default: false, required: true },
      parkingSensors: { type: Boolean, default: false, required: true },
      seatVentilation: { type: Boolean, default: false, required: true },
      cruiseControl: { type: Boolean, default: false, required: true },
      androidAuto: { type: Boolean, default: false, required: true },
      wirelessCharging: { type: Boolean, default: false, required: true },
    },

    safety: {
      airbags: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: Number.isInteger,
          message: "Airbag count must be a whole number.",
        },
      },

      abs: { type: Boolean, default: false },
      esc: { type: Boolean, default: false },
    },

    images: {
      thumbnail: {
        type: String,
        required: true,
        trim: true,
      },

      gallery: {
        type: [String],
        default: [],
      },
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
