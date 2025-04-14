import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specs: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ['New', 'Used']
    },
    image: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: false,
    },
    upvotes: {
      type: Number,
      default: 0, // Default value to start with 0
    },
    downvotes: {
      type: Number,
      default: 0, // Default value to start with 0
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Laptop = mongoose.model("Laptop", laptopSchema);

export default Laptop;
