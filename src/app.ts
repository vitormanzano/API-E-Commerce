import fastify from  'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { personRoutes, productRoutes } from './routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m',
    }
});

app.register(fastifyCookie);

 app.register(personRoutes);
 app.register(productRoutes);