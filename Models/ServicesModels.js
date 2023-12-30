import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name:  { type: String, required: true },
        img : { type: String, required: true },
        description :  { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const Services = mongoose.model("services", serviceSchema)
export default Services;