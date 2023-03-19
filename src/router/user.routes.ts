const userRoute = require('express').Router()
import { deleteAllUserHandler, deleteUserHandler, getUserHandler, loginUserHandler, registerUserHandler, updateUserHandler, userAddPermitHandler, userAddRoleHandler, userRemovePermitHandler, userRemoveRoleHandler } from "../controller/user.controller"
import { roleValidator } from "../middleware/roleValidator"
import { validateToken , validateAll } from "../middleware/validator"
import { allSchemaId } from "../utils/schema"


userRoute.post("/register" , registerUserHandler)
userRoute.post("/login" , loginUserHandler)

userRoute.get("/admin", validateToken ,  roleValidator("admin"), getUserHandler )
userRoute.get("/" , validateToken , validateAll(allSchemaId) , getUserHandler)

userRoute.patch("/" , validateToken , updateUserHandler)

//beware deleting all user route
userRoute.delete('/admin' , validateToken , roleValidator('admin') , deleteAllUserHandler)

//delete each user
userRoute.delete("/" , validateToken ,validateAll(allSchemaId) , deleteUserHandler)

//adding role in user
userRoute.patch('/add/role', validateToken, roleValidator('admin') , userAddRoleHandler)
userRoute.patch('/remove/role', validateToken, roleValidator('admin') , userRemoveRoleHandler)

//adding permit in user
userRoute.patch("/add/permit", validateToken, roleValidator('admin') , userAddPermitHandler)
userRoute.patch('/remove/permit', validateToken, roleValidator('admin') , userRemovePermitHandler)



export default userRoute
