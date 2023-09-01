import { Router } from "express";
import LivroController from "../controllers/LivroController";

const livroRoutes = Router();

livroRoutes
    .get('/livros', LivroController.getAll)
    .get('/livros/:id', LivroController.getById)
    .post('/livros', LivroController.create)
    .put('/livros/:id', LivroController.update)
    .delete('/livros/:id', LivroController.delete)

export default livroRoutes;