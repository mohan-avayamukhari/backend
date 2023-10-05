import Users from "../models/authModel.js";
import bcrypt from "bcrypt"

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
    if (!user) {
      return res.status(404).json({ error: "Authentication failed. User does not exist" });
    }
    if (bcrypt.compare(req.body.psw, user.psw)) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Authentication failed. Invalid password" });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

export {createUser, login}
