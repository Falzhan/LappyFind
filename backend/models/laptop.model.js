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
		image: {
			type: String,
			required: true,
		},
	}, {
		timestamps: true, // createdAt, updatedAt
	});

const Laptop = mongoose.model("Laptop", laptopSchema);

export default Laptop;
