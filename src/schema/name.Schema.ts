import { object, string } from "zod"

export const nameSchema = object({
    body : object({
        name: string({
            required_error: 'Name is required'
        }),
    })
})