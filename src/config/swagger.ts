import path from "path";

export const openApiYamlPath = path.resolve(process.cwd(), "docs", "openapi.yaml");

const swaggerUiOptions = {
  customSiteTitle: "Product Management API Docs",
  swaggerOptions: {
    url: "/swagger.yaml",
  },
};

export default swaggerUiOptions;
