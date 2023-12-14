// Function to create a custom 'NotFoundError' with a specific item's name
export const createNotFoundError = (itemName: string): Error => {
    const error: any = new Error(`${itemName} not found`);
    error.code = 404;
    return error;
}