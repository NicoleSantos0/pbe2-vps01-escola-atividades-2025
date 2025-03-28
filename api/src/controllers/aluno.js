const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        })
        return res.status(201).json(aluno)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany()
        return res.json(alunos)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        if (!aluno) {
            return res.status(404).json({ error: 'aluno não encontrado' })
        }
        return res.json(aluno)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const aluno = await prisma.aluno.update({
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

            const atualizada = await prisma.aluno.update({
                where: { id: parseInt(req.params.id) },
                data: { parcial }
            })
            return res.json(atualizada)
        }

        return res.status(202).json(aluno)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const remove = async (req, res) => {
    try {
        await prisma.aluno.delete({
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