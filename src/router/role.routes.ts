import { getRoleHandler , addRoleHandler, deletRoleHandler, roleAddPermitHandler , roleRemovePermitHandler } from "../controller/role.controller"
import { validateAll } from "../middleware/validator"
import { roleSchema } from "../utils/schema"

const roleRoute = require("express").Router()

roleRoute.get("/" , getRoleHandler)

roleRoute.post("/", validateAll(roleSchema) , addRoleHandler)

roleRoute.delete("/" ,  deletRoleHandler)

roleRoute.patch("/add/permit" , roleAddPermitHandler)

roleRoute.patch("/remove/permit" , roleRemovePermitHandler)

export default roleRoute