import { number, object, string } from "zod"

export const imageSchema = object({
    body : object({
        image : string({
            required_error : "image is required"
        })
    })
})