import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js"
import {config} from "dotenv"
config()

export const register = async (req,res)=>{
    const {email,password,orgName} = req.body
    try{
        if(!email || !password){
            return res.status(401).json({Message:"Enter email and password"})
        }

        const userExist = await prisma.user.findMany(
            {where:{email:email}}
        )

        if(userExist.length > 0){
            return res.status(402).json({Message:"User already exist"})
        }

        const passwordHash = await bcrypt.hash(password,10)

        const result = await prisma.$transaction(async(t)=>{
            const user = await t.user.create({
                data:{
                    email:email,
                    password:passwordHash
                }
            })
            
            const org = await t.organisation.create({
                data:{
                    name:orgName
                }
            })


                await t.membership.create({
                    data:{
                        orgId:org.id,
                        userId:user.id,
                        status:"ACTIVE",
                        Role:"VIEWER"
                    }
                })
        })

        res.json({
            Message:"User successfully created"
        })
    }
    catch(err){
        console.log(err)
    }
}

export const login = async (req,res)=>{
    const {email,password,role} = req.body
    try{
        if(!email || !password){
            return res.status(401).json({Error:"Email,Password and role are required"})
        }

        const user = await prisma.user.findUnique({
            where:{email:email}
        })

        if(!user){
            return res.status(400).json({Error:"Invalid mail and password"})
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword){
            return res.status(403).json({Error:"Invalid mail and Password"})
        }

        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({
            Message:"User login Successful",
            token,
            User:{Id:user.id,Email:user.email,}
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Message:"Server Error"})
    }
}