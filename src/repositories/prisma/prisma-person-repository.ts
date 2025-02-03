import { Person, Prisma } from "@prisma/client";
import { IPersonsRepository } from "../persons-repository-interface";
import { prisma } from "../../lib/prisma";

export class PrismaPersonRepository implements IPersonsRepository {
    findPersonByEmail(email: string): Promise<Person> {
        throw new Error("Method not implemented.");
    }
    async registerPerson(personData: Prisma.PersonCreateInput){
        const person = await prisma.person.create({
            data: personData
        });
        
        return person;
    }
    
}