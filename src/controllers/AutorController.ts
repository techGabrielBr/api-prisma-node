import { Request, Response } from "express"
import prisma from "../config/dbConnection"
import redisClient from "../config/redisClient";

class AutorController{
    static getAll = async (req: Request, res: Response) => {
        try{
            let autores = [];
            let fromCache = false;

            const isCached = await redisClient.get('all_autores');

            if(isCached){
                autores = JSON.parse(isCached);
                fromCache = true;
            }else{
                autores = await prisma.autor.findMany({
                    include: {livros: true}
                });

                redisClient.set('all_autores', JSON.stringify(autores));

                //cache expires in 30 seconds
                redisClient.expire('all_autores', 30);
            }

            res.status(200).send({
                fromCache: fromCache,
                result: autores
            });
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