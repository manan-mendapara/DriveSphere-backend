import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
  },
  {
    timestamps: true,
  },
);

wishlistSchema.index({ userId: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
