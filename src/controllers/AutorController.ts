import { Request, Response } from "express"
import prisma from "../config/dbConnection"

class AutorController{
    static getAll = async (req: Request, res: Response) => {
        try{
            const autores = await prisma.autor.findMany({
                include: {livros: true}
            });

            res.status(200).send(autores);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const autor = await prisma.autor.findUnique({
                where: {id: Number(id)},
                include: {livros: true}
            });

            if(autor != null){
                res.status(200).send(autor);
            }else{
                res.status(404).send({
                    message: "Autor não encontrado"
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
            const autor = await prisma.autor.create({
                data: req.body
            })

            res.status(201).send(autor);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static update = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const autor = await prisma.autor.update({
                data: req.body,
                where: {id: Number(id)}
            })

            if(!autor){
                res.status(400).send({
                    message: "Erro ao atualizar autor"
                });
            }

            res.status(200).send(autor);
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            const autor = await prisma.autor.delete({
                where: {id: Number(id)}
            })

            if(!autor){
                res.status(400).send({
                    message: "Erro ao deletar autor"
                });
            }

            res.status(200).send({
                message: "Autor deletado com sucesso"
            });
        }catch(err){
            res.status(500).send({
                message: "Erro interno do servidor"
            });
        }
    }
}

export default AutorController;