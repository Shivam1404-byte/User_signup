import {Router} from "express"
import { createTask,getTask } from "../controllers/taskController.js"
import { middleware } from "../middleware/middleware.js"

export const taskRoute = Router()

taskRoute.post('/create',middleware,createTask)
taskRoute.get("/get",middleware,getTask)                                                                                                   