/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction,Request,Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest=(schema:AnyZodObject)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            await schema.parseAsync({
                body : req.body,
            });
            next();
        }catch (err:any) {
            const errorResponse = {
                success: false,
                message: "Validation error",
                statusCode: 400,
                error: {
                  details: err.errors,
                },
                stack: err.stack,
              };
        
              res.status(400).json(errorResponse);
          }
    }
}

export default validateRequest;