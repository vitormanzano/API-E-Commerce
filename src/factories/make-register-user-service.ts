import { PrismaPersonRepository } from "../repositories/prisma/prisma-users-repository";
import { RegisterUserService } from "../services/user/register/register-user-service";

export function makeRegisterService() {
    const usersRepository = new PrismaPersonRepository();
    const registerService = new RegisterUserService(usersRepository);

    return registerService;
}