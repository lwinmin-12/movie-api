import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6,"Passwrod too short should be 6 characters minimum"),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: "Email is required"
        }).email('Valid email is required')
    }).refine((data)=> data.password === data.passwordConfirmation,{
        message: 'Password do not match',
        path: ["Password Confirmation"]
    })
})

export const loginUserSchema = object({
    body : object({
        email :string({
            required_error: "Email is required"
        }).email('Valid email is required'),
        password :string({
            required_error: 'Password is required'
        })
    })
})
