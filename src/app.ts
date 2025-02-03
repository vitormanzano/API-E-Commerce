import fastify from  'fastify'
import { personRoutes } from './routes';

export const app = fastify();

 app.register(personRoutes);