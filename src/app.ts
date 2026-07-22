import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { ROUTES } from "./constants/route.constant";
import authRoutes from "./modules/auth/auth.routes";
import cartRoutes from "./modules/cart/cart.routes";
import userRoutes from "./modules/users/user.routes";
import addressRoutes from "./modules/address/address.routes";
import productRoutes from "./modules/products/product.routes";
import categoryRoutes from "./modules/category/category.routes";
import swaggerUiOptions, { openApiYamlPath } from "./config/swagger";
import { errorHandler } from "./common/middlewares/errorHandler.middleware";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin ?? "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Accept");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

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
app.use(`${ROUTES.API_VERSION}${ROUTES.CART}`, cartRoutes);

app.use(errorHandler);

export default app;
