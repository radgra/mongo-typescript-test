var express = require('express')
var router = express.Router()
const Product:Model<Product> = require('../models/product')
import { Request, Response } from 'express';
import { Product } from '../models/product';
import { Model } from 'mongoose';
import { Comment } from '../models/comment';
const Comment:Model<Comment> = require('../models/comment')
const { handleCastError, handleOtherErrors, handleValidationError, asyncMiddleware } = require('../middleware/errors')


router.get('/', asyncMiddleware(async (req:Request,res:Response) => {
    // jak join on object
    const products:Product[] = await Product.find({}).populate('supplier')
    res.send(products)
}))

router.post('/', asyncMiddleware(async(req:Request,res:Response) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send(newProduct)
}))


router.patch('/:id',asyncMiddleware(async(req:Request,res:Response) => {
    const product = await Product.findByIdAndUpdate({'_id':req.params.id},{$set:req.body},{new:true})
    res.send(product)
}))


router.get('/:id', asyncMiddleware(async (req:Request,res:Response) => {
    const params: {id:string} = req.params

    try {
        const product = await Product.findOne({'_id':params.id}).populate('comments')
        if(product) {
            const comments = await Comment.find({product:product.id})
            product.comments = comments
        }
        res.send(product)

    } catch(err) {
        console.log(err);
        
    }
}))

//* Jesli chce delete on cascade zaimplementowac
// userSchema.pre('remove', function(next) {
    // this.model('Message').deleteMany({ user: this._id }, next);
//   });

router.use(handleValidationError)
router.use(handleCastError)
router.use(handleOtherErrors)

export default router


// Problemy z mongo -> 
// 1. Trzeba od razu wszystko zaaplanowac co chec co potrzebuje na endpoincie itd
// 2. Jesli dzielimy na collections to nie mozna reverse foreign key bez 2 queries -> chyba ze przechowuje array of children na parent
// 3. Many to Many - jak to designowac taki model ?? 
// 4. Jesli wszytko pakujemy do collection 
//    a) to gdzies musimy te dane przerabiac(client/backend) -> chcemy np wszytkich pilkarzy -> jak wpakujemy do teams to musimy wsyztkie teamy pobrac jesli 
//       chcemy pilkarze na okreslonej pozycji i to prezrobic na cliencie/backendzie -> jungle-banana problem
// 5. jesli foreign key to problem bedzie querowac wszystkich pilkarzy ktorzy naleza do zespolu
// 6. powstaje problem nested of nested -> kiedys trzeba kolekcje rolaczyc i powstaje znowzu problem..........
// 7. updating/adding players - trzeba caly dokument updatowac -> bug nightmare
// 8. Many to many z nested colleciton nightmare
// 9. Jesli chcemy uniknac multiple queries to trzeba nested ale wtedy powstaje problem z getting tylko to co potrzbuje - jesl objekt staje sie zbyt duzy to kicha,


// Research
// Mozna tylko okreslone fieldy zwracac
// Mozna updatowac tylko okreslony nested fieldy
// Multiple nested levels beda jednak hard to maintain bez schema - tu typescript moze pomoc - enforce schema
// Schemalees sluza do read and display ale do czestego updatowania sie nie nadaja

// Problemy:
// Many to Many - multiple queries
// Musze wczesniej zdecydowac czy polaczyc parenta z children -> array of ids
// Nested collection cross queries
// Quering syntax dla prostych kwesti zaczyna byc skomplikowany

