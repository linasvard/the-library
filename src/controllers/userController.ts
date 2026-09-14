import { Request, Response } from 'express';
import users from '../models/User.js'

export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await users.find().select('-password'); // Exclude the password field from the response
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const fetchUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await users.findById(userId).select('-password'); // Exclude the password field from the response
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};