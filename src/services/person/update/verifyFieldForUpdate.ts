export async function verifyFieldForUpdate(fieldForUpdate: string) {
    switch (fieldForUpdate) {
        case "name": 
            return "name";
        case "email":
            return "email"
        case "password":
            return "password"
        case "latitude":
            return "latitude"
        case "longitude":
            return "longitude"
        default:
            throw new Error() //Changing validation for zod in controller with enum
    }
}