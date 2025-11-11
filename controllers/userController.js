import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const saltRounds = 10;
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: '3d' });
};

const register = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user already exists
    const exists = await User.findOne({ name });
    if (exists) {
      throw Error('Username already in use');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const create_user = await User.create({ name, password: hashedPassword });

    // Generate a token
    const token = createToken(create_user._id);

    // Send a success response with the token
    res.status(200).json({ name, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name
    const userCredentials = await User.findOne({ name });

    if (!userCredentials) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passOk = await bcrypt.compare(password, userCredentials.password);

    if (passOk) {
      // Generate a JWT token
      const token = createToken(userCredentials._id);

      // Set the token as a cookie and send a response
      res.cookie('token', token, { httpOnly: true, secure: true }).json({
        id: userCredentials._id,
        name: userCredentials.name,
        token
      });
    } else {
      res.status(400).json({ message: 'Wrong credentials' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export {
  login,
  register
};
