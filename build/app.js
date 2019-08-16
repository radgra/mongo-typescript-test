"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var products_1 = __importDefault(require("./controllers/products"));
var comments_1 = __importDefault(require("./controllers/comments"));
var cors = require('cors');
var app = express_1.default();
var port = 3100;
mongoose_1.default.connect('mongodb://localhost:27017/manage_products', { useNewUrlParser: true })
    .then(function () { return console.log("Connected to Db"); })
    .catch(console.log);
app.use(express_1.default.json());
app.use(cors());
app.use('/products', products_1.default);
app.use('/comments', comments_1.default);
app.listen(port, function () { return console.log('App listening on port ' + port); });
