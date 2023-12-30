import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import RootRouter from "./Routes/RootRoute.js";
import UserRoutes from "./Routes/UserRoutes.js";
import ServiceRoutes from "./Routes/ServicesRoutes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })); 
app.use('/uploads', express.static(join(__dirname, 'uploads'))); 

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Successfully Connected to DB")
})
.catch((err)=>console.log(err))


app.use("/api/root", RootRouter)
app.use("/api/root", UserRoutes)
app.use("/api/root", ServiceRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((err,req,res,next)=>{
    res.status(500).send({ message : err.message })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})