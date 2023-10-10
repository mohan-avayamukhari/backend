import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "./routes/auth.js"
import clusterRoutes from "./routes/clusters.js"
import cookieParser from "cookie-parser"


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}))
app.use(cookieParser())

app.use("/auth", authRoutes);
app.use("/cluster", clusterRoutes);

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));