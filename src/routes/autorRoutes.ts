import { Router } from "express";
import AutorController from "../controllers/AutorController";

const autorRoutes = Router();

autorRoutes
    .get('/autores', AutorController.getAll)
    .get('/autores/:id', AutorController.getById)
    .post('/autores', AutorController.create)
    .put('/autores/:id', AutorController.update)
    .delete('/autores/:id', AutorController.delete)

export default autorRoutes;