import { allSchemaId } from "../utils/schema"
import {validateAll, validateToken} from "../middleware/validator"
import { addCatHandler, deletCatHandler, getCatHandler } from "../controller/cat.controller"
import { roleValidator } from "../middleware/roleValidator"
import { nameSchema } from "../schema/name.Schema"

const catRoute = require('express').Router()


catRoute.get('/' , validateToken,  roleValidator("admin") ,getCatHandler)
catRoute.post('/' , validateToken,roleValidator("admin") ,validateAll(nameSchema) , addCatHandler)
catRoute.delete('/' ,validateToken, validateAll(allSchemaId), roleValidator("admin") , deletCatHandler)

export default catRoute