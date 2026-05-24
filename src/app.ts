import express from "express";
import { ROUTES } from "./constants/route.constant";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import productRoutes from "./modules/products/product.routes";
import categoryRoutes from "./modules/category/category.routes";
import { errorHandler } from "./common/middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(`${ROUTES.API_VERSION}${ROUTES.AUTH}`, authRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.USER}`, userRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.PRODUCT}`, productRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.CATEGORY}`, categoryRoutes);

app.use(errorHandler);

export default app;
