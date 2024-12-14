import mongoose from "mongoose";
import Laptop from "../models/laptop.model.js"

export const getLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find({});
        res.status(200).json({ success: true, data: laptops });
    } catch (error) {
        console. log("error in fetching laptops:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
        }
};

export const createLaptop = async (req, res) => {
    const laptop = req.body; //user send data
    
    if(!laptop.name || !laptop.specs || !laptop.price || !laptop.image) {
            return res.status(400).json({ success:false, message: "Please fill all fields" });
     }
    
    const newLaptop = new Laptop(laptop);
    
    try {
        await newLaptop.save();
            res.status (201).json({ success: true, data: newLaptop});
    }   catch (error) {
            console.error("Error in Adding Laptop: ", error.message);
            res.status(500).json({success:false, message: "Server Error"});
        }
};

export const updateLaptop = async (req, res) => {
    const { id } = req.params;

    const laptop = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Laptop ID" });
    }

    try {
        const updatedLaptop = await Laptop.findByIdAndUpdate(id, laptop,{new:true});
        res.status(200).json({ success: true, data: updatedLaptop });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}; 

export const deleteLaptop = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Laptop ID" });
    }
    try {
        await Laptop.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Laptop deleted" });
        } catch (error) {
            console.error("Error in Deleting Laptop: ", error.message);
            res.status(500).json({ success: false, message: "Server Error" });
        }
};