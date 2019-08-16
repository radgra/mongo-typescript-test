import { Application } from "express";
import express from 'express'
import mongoose from 'mongoose'
import products from './controllers/products'
import comments from './controllers/comments'
const cors = require('cors')


const app:Application = express()
const port = 3100

mongoose.connect('mongodb://localhost:27017/manage_products', { useNewUrlParser: true })
    .then(() => console.log("Connected to Db"))
    .catch(console.log)

app.use(express.json())
app.use(cors())

app.use('/products', products)
app.use('/comments', comments)

app.listen(port, () => console.log('App listening on port '+port))


// Zeby odpalic debuggera trzeba uzyc attachProcess node -> jest lepszy bo pozwala na hot reloading cool !!!!
// Moze jest lepsze rozwiazanie ale nie wiem
//  
//
// Types dla mongoose bez powtarzania interface 
// https://github.com/szokodiakos/typegoose
// 
// Oni uzywaja typescript/mongoose/express/typegoose

// co mama sie nauczyc -> (sucks bo mongo)
// a) jak ustawic typescript na node js
// b) popytac sie jak designowac schema w mongo
// c) jak napisac wlasny dekorator
// d) mongooose 
// e) patterny..
// d) typegoose... pozniej


// Jak poradzic sobie z tags validity - to jest post wiec moze byc wolniejszy ! - sprawdzam czy tag istnieje ? to gdzie je przechowuje ???
// Moge je zrobic unique i nie przechowywac oddzielnie -> jak ktos doda kolejny to bedzie kolejny - jesli chce ograniczyc tagi i nie mozna ich kreowac to musze
// dodac kolejna kolekcje - jesli ma byc wolnosci w dodawaniu to nie trzeba kolejnej kolekcji tworzyc 
// premature optimization.....
// 


// How update duplicate data -> at least two queries where data is referenced.