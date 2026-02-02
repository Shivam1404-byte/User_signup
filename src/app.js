import express from "express";
import {router} from "./routes/authRoutes.js"
import { taskRoute } from "./routes/taskRoute.js";
const app = express()

app.set("trust proxy", 1);
app.use(express.json())


app.use('/auth',router)
app.use('/task',taskRoute)

app.get("/",(req,res)=>{
    res.status(200).json({Message: "App is runnning on 5000 port"})
})

export default app;