import app from "./app.js"

const PORT = 5000
const hostname = '127.0.0.1'

app.listen(PORT,hostname,()=>{
    console.log("App is running")
})