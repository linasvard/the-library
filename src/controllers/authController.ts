import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import users from "../models/User"

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    try {
        const existingUser = await users.findOne({ username })
        if (!existingUser) {
            res.status(401).json({message: 'username/password are wrong'})
            return
        }

        const verifyPassword = await bcrypt.compare(password, existingUser.password)
        if (!verifyPassword) {
            res.status(401).json({message: 'username/password are wrong'})
            return
        }

        const accessToken = jwt.sign({username}, process.env.JWT_SECRET || "", {expiresIn: '7d'});
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7 
        })
        res.json({message: 'You are logged in', isLoggedIn: true})
        return;
    } 

    catch (e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const register = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    try {
        const existingUser = await users.findOne({ username })

        if (existingUser) {
            res.status(409).json({message: 'Username is already taken'})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new users({username, password: hashedPassword})
        await newUser.save()

        res.json({message: "You are registered", id: newUser._id, username: newUser.username})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'})
    }   
}

export const logout = async (req: Request, res: Response) => {
   try { 
    res.clearCookie('accessToken', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
})
    res.json({message: "You are logged out"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'})
    }
}