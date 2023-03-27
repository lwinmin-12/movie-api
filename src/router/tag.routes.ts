import { allSchemaId } from "../utils/schema"
import {validateAll, validateToken} from "../middleware/validator"
import { addTagHandler, deleteTagHandler, getTagHandler } from "../controller/tag.controller"
import { nameSchema } from "../schema/name.Schema"
import { roleValidator } from "../middleware/roleValidator"

const tagRoute = require('express').Router()


tagRoute.get('/' , validateToken , roleValidator('admin') ,  getTagHandler)
tagRoute.post('/' , validateToken , roleValidator('admin') ,  validateAll(nameSchema) , addTagHandler)
tagRoute.delete('/' , validateToken , roleValidator('admin') ,  validateAll(allSchemaId) , deleteTagHandler)

export default tagRoute