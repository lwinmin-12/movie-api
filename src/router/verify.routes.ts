const verifyRoute = require("express").Router();
import { Request, Response, NextFunction } from "express";
import { saveUser } from "../service/user.service";
import { checkToken } from "../utils/helper";
import path from "path";

verifyRoute.get(
  "/:token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = checkToken(req.params.token);
      let result = await saveUser(user);
      res.sendFile(path.join(__dirname, "../assets/index.html"));
    } catch (e) {
      next(Error(e));
    }
  }
);

export default verifyRoute;
