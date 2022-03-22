import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

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
]

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/errands', (request: Request, response: Response) => {
    return response.status(200).json({
        msg: "Todos os recados",
        errands
    })
})

app.post('/errands', (request: Request, response: Response) => {
    const { description, detail } = request.body

    const newItem = {
        id: getRandomInt(0, 100),
        description: description,
        detail: detail
    }

    errands.push(newItem)

    return response.status(201).json({
        msg: "Criado com sucesso",
        newItem
    })
})

app.put('/errands/:id', (request: Request, response: Response) => {
    const { id } = request.params
    const { description, detail } = request.body

    const item = errands.find((f) => f.id === parseInt(id))

    if(item) {
        item.description = description,
        item.detail = detail
    }

    return response.status(200).json({
        msg: "Recado alterado",
        errands
    })
})

app.delete('/errands/:id', (request: Request, response: Response) => {
    const { id } = request.params

    const position = errands.findIndex((f) => f.id === parseInt(id))

    errands.splice(position, 1)

    return response.status(200).json({
        msg: "Recado apagado",
        errands
    })
})

app.listen(3333, () => {
    console.log('servidor rodando')
})