import express from "express";
import user from "../FakeData.js"
import User from "../Models/UserModel.js";

const RootRouter = express.Router()

RootRouter.get("/", async( req, res )=>{
    await User.deleteMany({})
    const createUsers = await User.insertMany(user)
    res.send({ createUsers })
})

export default RootRouter;