"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Comment = require('../models/comment');
var _a = require('../middleware/errors'), handleCastError = _a.handleCastError, handleOtherErrors = _a.handleOtherErrors, handleValidationError = _a.handleValidationError, asyncMiddleware = _a.asyncMiddleware;
router.get('/', asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find({}).populate('supplier')];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/', asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newProduct = new Product(req.body);
                return [4 /*yield*/, newProduct.save()];
            case 1:
                _a.sent();
                res.send(newProduct);
                return [2 /*return*/];
        }
    });
}); }));
router.patch('/:id', asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findByIdAndUpdate({ '_id': req.params.id }, { $set: req.body }, { new: true })];
            case 1:
                product = _a.sent();
                res.send(product);
                return [2 /*return*/];
        }
    });
}); }));
router.get('/:id', asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var params, product, comments, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.params;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Product.findOne({ '_id': params.id }).populate('comments')];
            case 2:
                product = _a.sent();
                if (!product) return [3 /*break*/, 4];
                return [4 /*yield*/, Comment.find({ product: product.id })];
            case 3:
                comments = _a.sent();
                product.comments = comments;
                _a.label = 4;
            case 4:
                res.send(product);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
//* Jesli chce delete on cascade zaimplementowac
// userSchema.pre('remove', function(next) {
// this.model('Message').deleteMany({ user: this._id }, next);
//   });
router.use(handleValidationError);
router.use(handleCastError);
router.use(handleOtherErrors);
exports.default = router;
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
