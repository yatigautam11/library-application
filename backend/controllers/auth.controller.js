import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

const authController = {

  //Signup: Register User
  signup: async (req, res) => {
    const {name, email, password} = req.body;

    try {
      if (User.findByEmail(email)) {
        return res.status(400).json({ error: 'User already exists.' });
      }

      const normalizedPassword = password.trim();
      const hashedPassword = await bcrypt.hash(normalizedPassword, 10); 


      User.create({name,  email, password: hashedPassword});

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong! Try again.' });
    }
  },


  //Login: Authenticate User
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email.' });
      }

      // Check if the password is correct
      const normalizedPassword = password.trim();
      const isPasswordValid = await bcrypt.compare(normalizedPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password.' });
      }

      // Generate token only if password is valid
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Send token for safe user info (do NOT send password)
     res.status(201).json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
      });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong! Try again.' });
    }
  }
}
export default authController;

