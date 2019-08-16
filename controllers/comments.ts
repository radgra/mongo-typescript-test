import { Request, Response, Router } from "express";
import mongoose from 'mongoose'
import express from 'express'
import {Supplier} from '../models/supplier'
import {Comment} from '../models/comment'
import CommentModel from '../models/comment'
const router:Router = express.Router()
const { handleCastError, handleOtherErrors, handleValidationError, asyncMiddleware } = require('../middleware/errors')


router.get('/', asyncMiddleware(async (req:Request,res:Response) => {
    // musi byc z malej literki !!! bo odnosi sie do pola
    const queryObject:{product?:string} = {}
    // zeby supplier byl importowany
    console.log(Supplier);
    
    if(req.query.product && mongoose.Types.ObjectId.isValid(req.query.product)) {
        queryObject.product = req.query.product
    }
    const comments = await CommentModel.find(queryObject).populate("product")
    res.send(comments)
}))


router.post('/', asyncMiddleware(async (req:Request,res:Response) => {
    const newComment = new CommentModel({
        content:req.body.content,
        product:req.body.product,
    })
    
    newComment.save()
    res.send(newComment)
}))

export default router as Router
