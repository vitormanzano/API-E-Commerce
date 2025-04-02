import { IFormattedPerson } from "@/models/formattedPerson";
import { Person } from "@prisma/client";

export async function formatPersonResponse(person: Person): Promise<IFormattedPerson> {
    const refactoredPerson = {
        ...person,
        guid: undefined,
        password: undefined
    }

    return refactoredPerson;
}