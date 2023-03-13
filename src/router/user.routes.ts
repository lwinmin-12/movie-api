const userRoute = require('express').Router()
import { getUserHandler, registerUserHandler } from "../controller/user.controller"


userRoute.post("/register" , registerUserHandler)
userRoute.get("/" , getUserHandler )

export default userRoute
