import { Request, Response } from 'express';
import users from '../models/User.js'
import bcrypt from 'bcrypt';

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

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await users.findByIdAndUpdate(userId, updates, { new: true }).select('-password'); // Exclude the password field from the response
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const deletedUser = await users.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};