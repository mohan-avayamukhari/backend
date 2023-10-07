import Users from "../models/authModel.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt  from "jsonwebtoken";

dotenv.config();



const createUser = async (req, res) => {
  try {

    // Validate user and psw

    const hashedPsw = await bcrypt.hash(req.body.psw, await bcrypt.genSalt())
    const newUser = new Users({
      name: req.body.name,
      psw: hashedPsw
    });

    await newUser.save();

    res.status(201).json(newUser.toJSON());
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const login = async(req, res) => {
  try {
    const user = await Users.findOne({ name: req.body.name });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "Authentication failed. User does not exist" });
    }

    const isPasswordValid = bcrypt.compareSync(req.body.psw, user.psw);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      const accessToken = jwt.sign({ name: req.body.name }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
      return res.status(200).end()
    } else {
      return res.status(401).json({ error: "Authentication failed. Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}


const refreshToken = (req, res) => {
  try {
    const name = req.user.name;

    const accessToken = jwt.sign({ name: name }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.status(200).end();
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const checkAuthStatus = (req, res) => {
  const user = req.user.name;
  if(user){
    res.status(200).json({ authenticated: true, user });
  }
};


export {createUser, login, refreshToken, checkAuthStatus}
