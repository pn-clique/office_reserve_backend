import express from 'express';
import routes from './infra/http/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './helpers/docs'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes)

export  default app;