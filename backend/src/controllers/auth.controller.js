import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const { fullName, email, password } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ msg: "All fields are required"})
        };

        if (password.length < 6) {
            return res.status(400).json({ msg: "password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        };

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists, please use a different one"});
        };

        const ind = Math.floor(Math.random()*100) + 1 //generate a num between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${ind}.png`

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            });
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error creating Stream user:", error);
        }
        

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({ success: true, user: newUser })

    } catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "internal Server Error"});
    }
};


export async function login(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required!"});
        };

        const user = await User.findOne({ email });
        console.log("user",user)
        if (!user) return res.status(404).json({ msg: "Invalid email or password"});

        const isPasswordCorrect = await user.matchPassword(password);

        if (!isPasswordCorrect) return res.status(401).json({ msg: "Invalid password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })
        
        res.status(200).json({ success: true, user });
    
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ msg: "interval server Error"});
    }
};


export function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, msg: "logout successfull"});
}