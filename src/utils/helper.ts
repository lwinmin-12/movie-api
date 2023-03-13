import {Response} from 'express'
import config from 'config'
import bcrypt from 'bcrypt'

const secretKey = config.get<string>('secretKey')
const saltWorkFactor = config.get<number>("saltWorkFactor")
const salt = bcrypt.genSaltSync(saltWorkFactor)
export const encode =  (payload : string  ) =>  bcrypt.hashSync(payload , salt )

export const compass =  (payload : string , dbPass : string) =>  bcrypt.compareSync(payload , dbPass)



const fMsg = (res : Response , msg : string ='all success' , result : any =[] ) =>{
    res.status(200).json({con:true , msg , result})
  }

export default fMsg 
