import express from "express";
import { ROUTES } from "./constants/route.constant";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import addressRoutes from "./modules/address/address.routes";
import productRoutes from "./modules/products/product.routes";
import categoryRoutes from "./modules/category/category.routes";
import { errorHandler } from "./common/middlewares/errorHandler.middleware";

import swaggerUi from "swagger-ui-express";
import swaggerUiOptions, { openApiYamlPath } from "./config/swagger";

const app = express();

app.use(express.json());

app.get("/swagger.yaml", (_req, res) => {
  res.sendFile(openApiYamlPath);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, swaggerUiOptions),
);

app.use(express.urlencoded({ extended: true }));

app.use(`${ROUTES.API_VERSION}${ROUTES.AUTH}`, authRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.USER}`, userRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.PRODUCT}`, productRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.CATEGORY}`, categoryRoutes);
app.use(`${ROUTES.API_VERSION}${ROUTES.ADDRESS}`, addressRoutes);

app.use(errorHandler);

export default app;
