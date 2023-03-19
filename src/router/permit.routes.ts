import { getPermitHandler , addPermitHandler, deletPermitHandler} from "../controller/permit.controller"
import {  permitSchema , allSchemaId } from "../utils/schema"
import {validateAll} from "../middleware/validator"

const permitRoute = require('express').Router()


permitRoute.get('/' , getPermitHandler)
permitRoute.post('/' , validateAll(permitSchema) , addPermitHandler)
permitRoute.delete('/' , validateAll(allSchemaId) , deletPermitHandler)

export default permitRoute
