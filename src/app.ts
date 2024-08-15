import express from 'express';
import routes from './infra/http/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './helpers/docs'
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const corsOrigin ={
    origin:'http://localhost:3000',
    credentials:true,            
    optionSuccessStatus:200
}

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors(corsOrigin));
app.use(routes)

export default app;