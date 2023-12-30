import express from "express"
import multer from "multer";
import Services from "../Models/ServicesModels.js";

const ServiceRoutes = express.Router()

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        return cb(null, "./uploads/")
    },

    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }

})

const upload = multer({ storage })

ServiceRoutes.get("/getdata", async (req, res) => {
    const service = await Services.find()
    res.send(service)
})

ServiceRoutes.post("/addnew", upload.single("file"), async (req, res) => {

    try {

        const { filename } = req.file
        const fileUrl = `http://localhost:4000/uploads/${filename}`

        const services = new Services({
            ...req.body,
            img: fileUrl
        })
        await services.save()
        res.status(200).send({ message: "Data Saved Successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error saving data' });
    }

})

ServiceRoutes.delete("/deleteservice/:id", async (req, res) => {

    const service = await Services.findById(req.params.id)
    if (service) {
        await service.deleteOne()
        res.send({ message: "deleted" })
    } else {
        res.status(404).send({ message: "delete not complete" })
    }

})


export default ServiceRoutes;