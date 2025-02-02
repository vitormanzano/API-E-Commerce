import fastify from  'fastify'
import { userRoutes } from './routes';

export const app = fastify();

 app.register(userRoutes);