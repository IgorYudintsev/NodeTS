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
exports.todosRouter = void 0;
const express_1 = __importStar(require("express"));
const todos_repositories_1 = require("../repositories/todos-repositories");
exports.todosRouter = (0, express_1.Router)();
const app = (0, express_1.default)();
const textfieldValidationMidleware_1 = require("../midlewares/textfieldValidationMidleware");
const validations_1 = require("../midlewares/validations");
const switchErrors_1 = require("../midlewares/switchErrors");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // для парсинга URL-encoded тела запроса
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundTodos = yield todos_repositories_1.todosRepository.getTodos();
    if (!foundTodos || foundTodos.length === 0) {
        res.status(404).send("No todos found");
    }
    else {
        res.send(foundTodos);
    }
}));
exports.todosRouter.post("/", validations_1.titleValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const postedTodos = yield todos_repositories_1.todosRepository.postTodo(title);
    if (postedTodos) {
        res.status(201).json(postedTodos);
    }
    else {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.post("/task", validations_1.titleValidation, validations_1.idValidation, validations_1.priorityValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, priority = "medium" } = req.body;
    try {
        const postedTask = yield todos_repositories_1.todosRepository.postTask(id, title, priority);
        if (!postedTask) {
            res.status(404).json({ error: "Todolist not found" });
            return;
        }
        res.status(201).json(postedTask);
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosAfterRemove = yield todos_repositories_1.todosRepository.deleteTodo(req.params.id);
    if (todosAfterRemove) {
        res.send(todosAfterRemove);
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
}));
exports.todosRouter.delete("/:todolistID/tasks/:taskID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todolistID, taskID } = req.params;
        const result = yield todos_repositories_1.todosRepository.deleteTask(todolistID, taskID);
        res.send(result);
    }
    catch (error) {
        if (!(error instanceof Error)) {
            res.status(500).json({ message: "Unknown error occurred" });
            return;
        }
        (0, switchErrors_1.switchErrors)(res, error.message);
    }
}));
exports.todosRouter.put("/:id", validations_1.titleValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const updatedTodo = yield todos_repositories_1.todosRepository.putTodo(req.params.id, title);
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.put("/:todolistID/tasks/:taskID", validations_1.titleValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todolistID, taskID } = req.params;
        const { title } = req.body;
        const updatedTodos = yield todos_repositories_1.todosRepository.putTask(todolistID, taskID, title);
        res.status(200).json(updatedTodos);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, switchErrors_1.switchErrors)(res, error.message);
        }
        else {
            console.error("Unknown error updating task:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}));
