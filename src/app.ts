import fastify from  'fastify'
import { personRoutes, productRoutes } from './routes';

export const app = fastify();

 app.register(personRoutes);
 app.register(productRoutes);