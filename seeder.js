const mongoose = require('mongoose')
const Product = require('./models/product')
const Supplier = require('./models/supplier')
const Comment = require('./models/comment')
const productsJson = require('./seeding_data/Products.json')
const suppliersJson = require('./seeding_data/Suppliers.json')
mongoose.connect('mongodb://localhost:27017/manage_products', { useNewUrlParser: true })
console.log(productsJson);


async function seedProducts() {
    try {
        const products = await mapProducts(productsJson.products)
        Product.collection.drop()
        const createdProducts = await Product.create(products)        
    } catch (error) {
        console.log(error);
    }
}

async function seedSuppliers() {
    try {
        const suppliers = await mapSuppliers(suppliersJson)
        Supplier.collection.drop()
        const createdSuppliers = await Supplier.create(suppliers)
    } catch (error) {
        console.log(error);
    }
}

// Jak polaczyc supplier z products:
// Opcje: 1.ObjectId - podac 2. Nested Product 
//
// Jak wyszukac suppplier -> jesli chce ObjectId to musze to wyszukac z bazy
//

// Co sprobowac
// 1. find element in mongo i dodac object id
// 2. make query i polaczyc supplier i product w jedna reponse - alternatywnie mozna zrobic to na clientcie
// 3. 

function mapSuppliers(suppliers) {

    return suppliers.map(supp => {
        const newSupplier = {}
        newSupplier.name = supp.CompanyName
        newSupplier.contactName = supp.ContactName
        newSupplier.contactTitle = supp.ContactTitle
        newSupplier.address = supp.Address
        newSupplier.city = supp.City
        newSupplier.region = supp.Region
        newSupplier.postalCode = supp.PostalCode
        newSupplier.country = supp.Country
        return newSupplier
    })
}


async function mapProducts(products) {
    try {
        return await Promise.all(products.map(async prod => {
            const newProduct = {}

            // 1.find supplier name in json based on id
            const relatedSupplier = suppliersJson.find(supp => supp.SupplierID === prod.SupplierID)
            const supplierModel = await Supplier.find({ name: relatedSupplier.CompanyName }).exec()
            newProduct.name = prod.ProductName
            newProduct.unitsInStock = prod.UnitsInStock
            newProduct.unitsOnOrder = prod.UnitsOnOrder
            newProduct.price = prod.UnitPrice
            newProduct.supplier = supplierModel[0].id
            newProduct.discontinued = prod.Discontinued
            return newProduct
        }))
    } catch(error) {
        console.log(error)
    }
}

async function createComment() {
    const comment = new Comment({
        content:"Some stuff",
        product:"5d527188fc6b901958629121"
    })
    comment.save()
}

async function doSomething() {
        try {
            Comment.collection.drop()
            await seedSuppliers()
            await seedProducts()

        } catch (error) {
            console.log(error);
        }
    }

doSomething()
// createComment()