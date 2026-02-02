import  prisma  from "../config/prisma.js"


export const createTask = async (req,res)=>{
    try{
        const {title,description} = req.body
        const userId = req.userId
        
        if(!title || !description){
            return res.status(401).json({Message:"Enter title and description"})
        }

        const task = await prisma.task.create({
            data:{
                userId:userId,
                title:title,
                description:description
            }
        })

        res.json({
            Message:"Task Created Successfully",
            Task:{title:task.title,description:task.description}
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Internal Server error"})
    }
}

export const getTask = async(req,res)=>{
    try{
        const userId = req.userId
            
        const task = await prisma.task.findMany({
            where:{
                userId:userId
            }
        })

        if(task.length == 0){
            return res.status(400).json({Message:"No task created"})
        }

        res.json({
            Task:task
        })
    }

    catch(err){
        console.log(err)
        res.status(500).json({Error:"Internal Server error"})
    }
}