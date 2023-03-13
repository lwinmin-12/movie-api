import {AnyZodObject} from 'zod'
import { NextFunction , Response , Request } from "express";

 const validateAll =
   (schema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      let result = await schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
     return next()
    } catch (e: any) {
      return next(new Error(e.errors[0].message))
    }
  };

  export default validateAll