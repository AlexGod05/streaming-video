import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from './routes'
import db from './config/mongo'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './utils/swagger'

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', routes)
db()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.listen(PORT)