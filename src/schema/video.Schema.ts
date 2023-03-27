import { number, object, string } from "zod"

export const videoSchema = object({
    body : object({
        title :  string({
            required_error: 'Name is required'
        }),
        video : string({
            required_error: 'video is required'
        }),
        rating : string({
            required_error: 'rating is required'
        }),
        des : string({
            required_error: "description is required"
        }),
        trailer : string({
            required_error: "trailer is required"
        }),
        image : string({
            required_error: "Image is required"
        }),
    })
})