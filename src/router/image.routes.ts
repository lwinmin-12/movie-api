import { allSchemaId } from "../utils/schema"
import {validateAll, validateToken} from "../middleware/validator"
import { addImageHandler, deleteImageHandler, getImageHandler } from "../controller/image.controller"
import { saveImage } from "../utils/gallary"
import { roleValidator } from "../middleware/roleValidator"
import { imageSchema } from "../schema/image.Schema"

const imageRoute = require('express').Router()


imageRoute.get('/' , validateToken,getImageHandler)
imageRoute.post('/' ,saveImage, validateAll(imageSchema) ,addImageHandler)
imageRoute.delete('/', validateToken, roleValidator('admin'),validateAll(allSchemaId) , deleteImageHandler)

export default imageRoute