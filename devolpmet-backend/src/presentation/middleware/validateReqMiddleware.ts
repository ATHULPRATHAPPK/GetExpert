import { Request,Response,NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })
        console.log('data is ok: ',req.body)
        next()
    } catch (error: any) {
        console.log('bad request',error)
        return res.status(400).json(error.errors)
    }
}

export default validate