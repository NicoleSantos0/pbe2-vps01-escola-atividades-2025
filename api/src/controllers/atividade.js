const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: req.body
        })
        return res.status(201).json(atividade)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const read = async (req, res) => {
    try {
        const atividades = await prisma.atividade.findMany()
        return res.json(atividades)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const readOne = async (req, res) => {
    try {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada' })
        }
        return res.json(atividade)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const atividade = await prisma.atividade.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })

        // Se foi enviada nota, calcula parcial automaticamente
        if (req.body.nota) {
            const parcial = req.body.nota
                ? (req.body.nota * req.body.peso) / 10
                : null

            const atualizada = await prisma.atividade.update({
                where: { id: parseInt(req.params.id) },
                data: { parcial }
            })
            return res.json(atualizada)
        }

        return res.status(202).json(atividade)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const remove = async (req, res) => {
    try {
        await prisma.atividade.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(204).send()
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = { create, read, readOne, update, remove }