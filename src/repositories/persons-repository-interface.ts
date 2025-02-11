import { Prisma, Person } from "@prisma/client";

export interface IPersonsRepository {
    registerPerson(person: Prisma.PersonCreateInput): Promise<Person>
    findPersonByEmail(email: string): Promise<Person | null>
    deletePersonByGuid(guid: string): Promise<Person | undefined>
    findPersonByGuid(guid: string): Promise<Person | null>
}