"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const errands = [
    {
        id: 0,
        description: 'descricao foda',
        detail: 'detalhe foda',
    },
    {
        id: 1,
        description: 'tamanadua de',
        detail: 'angola',
    },
];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
app.get('/errands', (request, response) => {
    return response.status(200).json({
        msg: "Todos os recados",
        errands
    });
});
app.post('/errands', (request, response) => {
    const { description, detail } = request.body;
    const newItem = {
        id: getRandomInt(0, 100),
        description: description,
        detail: detail
    };
    errands.push(newItem);
    return response.status(201).json({
        msg: "Criado com sucesso",
        newItem
    });
});
app.put('/errands/:id', (request, response) => {
    const { id } = request.params;
    const { description, detail } = request.body;
    const item = errands.find((f) => f.id === parseInt(id));
    if (item) {
        item.description = description,
            item.detail = detail;
    }
    return response.status(200).json({
        msg: "Recado alterado",
        errands
    });
});
app.delete('/errands/:id', (request, response) => {
    const { id } = request.params;
    const position = errands.findIndex((f) => f.id === parseInt(id));
    errands.splice(position, 1);
    return response.status(200).json({
        msg: "Recado apagado",
        errands
    });
});
app.listen(process.env.PORT || 3333, () => {
    console.log('servidor rodando');
});
