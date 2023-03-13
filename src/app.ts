import express ,{NextFunction , Request , Response } from "express";
import mongoose from "mongoose";
import config from "config"
import permitRoute from "./router/permit.routes";
import fileUpload from "express-fileupload";
import roleRoute from "./router/role.routes";
import userRoute from "./router/user.routes";

const app  = express()
const server = require('http').createServer(app)

const port = config.get<number>("port")
const host = config.get<string>("host")
const dbUrl = config.get<string>('dbUrl')

app.use(express.json())
app.use(fileUpload())
mongoose.connect(dbUrl)


app.get('/' , (req : Request , res : Response , next : NextFunction)=>{
    res.send("ok")
})

app.use('/permit' , permitRoute)
app.use("/role" , roleRoute)
app.use("/user" , userRoute)

app.use((err :any , req :Request , res :Response , next :NextFunction) => {
    err.status = err.status || 409;
    res.status(err.status).json({
      con: false,
      msg: err.message,
    });
})

server.listen(port, ()=> console.log(`server is running in  http://${host}:${port}`))