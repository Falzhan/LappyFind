import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+\@.+\..+/, "Invalid email address"],
		},
		password: {
			type: String,
			required: true,
		},
	}, 
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
	}
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
