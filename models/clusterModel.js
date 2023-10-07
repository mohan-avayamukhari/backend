import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clusterName: String,
  fqdnIp: String,
  port: Number,
  token: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Cluster = mongoose.model('Cluster', userSchema);

export default Cluster;
