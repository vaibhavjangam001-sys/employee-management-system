import swaggerJSDOC from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Employee management system API",
      version: "1.0.0",
      description: "API documentation for employee management system",
    },

    tags: [
      {
        name: "Authentication",
        description: "User authentication APIs",
      },
      {
        name: "Employees",
        description: "Employee management APIs",
      },
      {
        name: "Uploads",
        description: "File upload APIs",
      },
      {
        name: "Admin",
        description: "Administrator APIs",
      },
    ],

    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/v1/*.js"],
};

const specs = swaggerJSDOC(options);
export { swaggerUI, specs };
