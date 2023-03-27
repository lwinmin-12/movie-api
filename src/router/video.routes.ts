import { addVideoHandler, deleteVideoHandler, getVideoHandler, updateVideoHandler, videoAddCatHandler, videoRemoveCatHandler } from "../controller/video.controller"
import { roleValidator } from "../middleware/roleValidator"
import { validateAll, validateToken } from "../middleware/validator"
import { videoSchema } from "../schema/video.Schema"
import { saveVideo } from "../utils/gallary"
import { allSchemaId } from "../utils/schema"

const videoRoute = require("express").Router()

videoRoute.get("/",validateToken, getVideoHandler)

videoRoute.post("/", validateToken, roleValidator('admin'), saveVideo , validateAll(videoSchema) , addVideoHandler)

videoRoute.delete("/"  , validateToken, roleValidator('admin'), deleteVideoHandler)

videoRoute.patch("/" ,  validateToken, roleValidator('admin'), updateVideoHandler)

videoRoute.patch("/add/cat"  , validateToken, roleValidator('admin'),  videoAddCatHandler)

videoRoute.patch("/remove/cat"  ,validateToken, roleValidator('admin'), validateAll(allSchemaId), videoRemoveCatHandler)

export default videoRoute