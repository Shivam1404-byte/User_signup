import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()

export const middleware = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        if(!token){
            return res.status(201).json({Error:"Taken not found"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.userId = decoded.userId
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error:"Middleware Error"})
    }
}