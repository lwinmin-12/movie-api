import { addSeriesHandler, deletSeriesHandler, getSeriesHandler, seriesAddVideoHandler, seriesRemovevideoHandler } from "../controller/series.controller"
import { roleValidator } from "../middleware/roleValidator"
import { validateToken } from "../middleware/validator"
import { seriesAddVideo } from "../service/series.service"

const seriesRoute = require("express").Router()

seriesRoute.get("/", validateToken ,getSeriesHandler)

seriesRoute.post("/" , validateToken, roleValidator('admin'),addSeriesHandler)

seriesRoute.delete("/"  , validateToken, roleValidator('admin'), deletSeriesHandler)

seriesRoute.patch("/add/eps" ,  seriesAddVideoHandler)

seriesRoute.patch("/remove/eps"  , seriesRemovevideoHandler)

export default seriesRoute