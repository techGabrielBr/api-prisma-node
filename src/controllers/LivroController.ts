import { Request, Response } from "express"
import prisma from "../config/dbConnection"

class LivroController{
    static getAll = async (req: Request, res: Response) => {
        try{
            const livros = await prisma.livro.findMany({
                include: {autor: true}
            });

            res.status(200).send(livros);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const livro = await prisma.livro.findUnique({
                where: {id: Number(id)},
                include: {autor: true}
            });

            if(livro != null){
                res.status(200).send(livro);
            }else{
                res.status(404).send({
                    message: "Livro não encontrado"
                })
            }
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static create = async (req: Request, res: Response) => {
        try{
            const livro = await prisma.livro.create({
                data: req.body
            })

            res.status(201).send(livro);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static update = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const livro = await prisma.livro.update({
                data: req.body,
                where: {id: Number(id)}
            })

            if(!livro){
                res.status(400).send({
                    message: "Erro ao atualizar livro"
                });
            }

            res.status(200).send(livro);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const livro = await prisma.livro.delete({
                where: {id: Number(id)}
            })

            if(!livro){
                res.status(400).send({
                    message: "Erro ao deletar livro"
                });
            }

            res.status(200).send({
                message: "Livro deletado com sucesso"
            });
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }
}

export default LivroController;