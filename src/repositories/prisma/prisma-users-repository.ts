import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../users-repository-interface";
import { prisma } from "../../lib/prisma";

export class PrismaPersonRepository implements IUsersRepository {
    async registerUser(userData: Prisma.PersonCreateInput){
        const user = await prisma.person.create({
            data: userData
        });
        
        return user;
    }
    
}