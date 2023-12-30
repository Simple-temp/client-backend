import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import { generateToken, isAuth } from "../Utilits.js";

const UserRoutes = express.Router()

UserRoutes.post("/register", expressAsyncHandler(async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    console.log(user)
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })

}))

UserRoutes.post("/login", expressAsyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        }
    }
    res.status(401).send({ message: "Invalid email or password" })

}))



export default UserRoutes;