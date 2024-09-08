import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body; //data coming from the frontend
    try {
        let user = await User.findOne({ email }); //check the DB if user email exists
        if(user) {
            return res.status(400).json({message: "User already exists"}); //return this error if user exists
        }

        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName, 
            lastName,
            email,
            password: hashedPassword
        });

        /*
            {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        */

        await user.save();
        // res.json({message: "User is saved"});

        const payload = {
            user: {
                id: user._id
            },
        } //sending the user id to the frontend to request for the token that jwt will provide

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: "1hr"},
            (error, token) => {
                if(error) throw error;
                res.json({message: "User Registered Successfully", token});
            }
        ); 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.user.id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

export const loginUser = (req, res) => res.send({message: "Login user"})