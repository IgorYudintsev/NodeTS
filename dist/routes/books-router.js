"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importStar(require("express"));
// import {booksRepository, BookType} from "../repositories/books-repositories";
exports.booksRouter = (0, express_1.Router)();
const app = (0, express_1.default)();
const express_validator_1 = require("express-validator");
// import {booksDBRepository, BookType} from "../repositories/booksDB-repositories";
const booksDB_repositories_1 = require("../repositories/booksDB-repositories");
// import {booksRepository} from "../repositories/books-repositories";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // для парсинга URL-encoded тела запроса
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBooks = yield booksDB_repositories_1.booksDBRepositories.getBooks();
    res.send(foundBooks);
}));
exports.booksRouter.post("/", (0, express_validator_1.body)('volume').isLength({ min: 3, max: 30 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: "Invalid volume: min:1, max:30" });
    }
    const { volume } = req.body;
    const newBookPromise = yield booksDB_repositories_1.booksDBRepositories.postBooks(volume);
    res.status(201).json(newBookPromise);
}));
exports.booksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let currentBook = yield booksDB_repositories_1.booksDBRepositories.deleteBooks(req.params.id);
    if (currentBook) {
        res.send(currentBook);
    }
    else {
        res.status(404).json({ message: "Book Not Found" });
    }
}));
