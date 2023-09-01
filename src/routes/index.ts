import { Application } from "express";
import autorRoutes from "./autorRoutes";
import livroRoutes from "./livroRoutes";

const routes = (app: Application) => {
    app.use(
        livroRoutes,
        autorRoutes
    );
}

export default routes;
