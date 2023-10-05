import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  psw: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Users = mongoose.model('Users', userSchema);

export default Users;
